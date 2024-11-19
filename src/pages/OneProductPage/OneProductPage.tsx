import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { observer } from 'mobx-react-lite';

import Text from 'components/Text';
import Button from 'components/Button';
import Card from 'components/Card';

import BackButton from './components/BackButton';
import ProductInformation from './components/ProductInformation';

import productStore from '../../stores/ProductStore';

import * as s from './OnePoductPage.module.scss';

const OnePoductPage = () => {
  const { id } = useParams();
  const { product, relatedItems, fetchProductById, fetchRelatedItems } = productStore;
  const navigate = useNavigate();

  const handlerCardClick = React.useCallback(
    (relatedItemId: number) => () => navigate(`/products/${relatedItemId}`),
    [],
  );

  // Получение данных о товаре
  useEffect(() => {
    fetchProductById(id);
  }, [id]);

  // Получение данных о рекомендуемых товарах
  useEffect(() => {
    fetchRelatedItems();
  }, []);

  return (
    <main className={s.main}>
      <BackButton className={s[`main__back`]} onClick={() => navigate('/products')}>
        Назад
      </BackButton>

      <ProductInformation
        images={product.images}
        title={product.title}
        description={product.description}
        price={product.price}
        className={s[`main__product-info`]}
      />

      <Text className={s[`main__reletad-items-title`]} tag="h2" weight="bold">
        Related Items
      </Text>

      <div className={s[`main__related-items-container`]}>
        {relatedItems &&
          relatedItems.map((product, index) => {
            return (
              <Card
                key={index}
                image={product.images[0]}
                captionSlot={product.category}
                title={product.title}
                subtitle={product.description}
                contentSlot={'$' + product.price}
                actionSlot={<Button>Add to Cart</Button>}
                onClick={handlerCardClick(product.id)}
              />
            );
          })}
      </div>
    </main>
  );
};

export default observer(OnePoductPage);
