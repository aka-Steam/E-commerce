import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { observer } from 'mobx-react-lite';

import Text from 'components/Text';
import Button from 'components/Button';
import Card from 'components/Card';

import BackButton from './components/BackButton';
import ProductInformation from './components/ProductInformation';

import { useLocalStore } from 'utils/useLocalStore';
import ProductItemStore, { StoreProvider } from 'stores/local/ProductItemStore';

import * as s from './OnePoductPage.module.scss';

const OnePoductPage = () => {
  const { id } = useParams();
  const store = useLocalStore(() => new ProductItemStore(Number(id)));

  const navigate = useNavigate();

  const handlerCardClick = React.useCallback(
    (relatedItemId: number) => () => navigate(`/products/${relatedItemId}`),
    [],
  );

  // Получение данных о товаре
  useEffect(() => {
    store.fetchProductById();
    store.fetchRelatedItems();
  }, [id]);

  return (
    <StoreProvider store={store}>
      {store.product && (
        <main className={s.main}>
          <BackButton className={s[`main__back`]} onClick={() => navigate(-1)}>
            Назад
          </BackButton>

          <ProductInformation
            images={store.product.images}
            title={store.product.title}
            description={store.product.description}
            price={store.product.price}
            className={s[`main__product-info`]}
          />

          <Text className={s[`main__reletad-items-title`]} tag="h2" weight="bold">
            Related Items
          </Text>

          <div className={s[`main__related-items-container`]}>
            {store.relatedItems &&
              store.relatedItems?.map((product) => {
                return (
                  <Card
                    key={product.id}
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
      )}
    </StoreProvider>
  );
};

export default observer(OnePoductPage);
