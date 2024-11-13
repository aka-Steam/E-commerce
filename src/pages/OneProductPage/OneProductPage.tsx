import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { observer } from 'mobx-react-lite';

import Text from 'components/Text';
import Button from 'components/Button';
import Card from 'components/Card';

import BackButton from './components/BackButton';
import Carousel from './components/Carousel';
import productStore from '../../stores/ProductStore';
import s from './OnePoductPage.module.scss';

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
      <BackButton className={s[`back-button`]} onClick={() => navigate('/products')}>
        Назад
      </BackButton>

      <div className={s[`product-info`]}>
        <Carousel className={s[`product-info__carousel`]} source={product.images} />
        <div className={s[`product-info__description`]}>
          <Text className={s[`product-info__title`]} view="title" tag="h1">
            {product.title}
          </Text>
          <Text className={s[`product-info__subtitle`]} view="p-20" tag="div" color="secondary">
            {product.description}
          </Text>
          <Text className={s[`product-info__price`]} view="title" tag="div">
            {'$' + product.price}
          </Text>
          <div className={s[`product-info__action-group`]}>
            <Button>Buy Now</Button>
          </div>
        </div>
      </div>

      <Text className={s[`reletad-items-title`]} tag="h2" weight="bold">
        Related Items
      </Text>

      <div className={s[`related-items-container`]}>
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
