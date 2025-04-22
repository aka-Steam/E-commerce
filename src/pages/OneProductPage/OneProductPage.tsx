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
import { ProductInfoModel } from 'stores/local/models/products/productInfo';
import { useLocalStorage } from 'hooks/useLocalStorage';

import * as s from './OnePoductPage.module.scss';

const OnePoductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useLocalStorage('cart', []);

  // Создаем store только один раз при монтировании компонента
  const store = useLocalStore(() => new ProductItemStore());

  const handlerCardClick = React.useCallback(
    (relatedItemId: number) => () => navigate(`/products/${relatedItemId}`),
    [],
  );

  // Получение данных о товаре при изменении id
  useEffect(() => {
    if (id) {
      store.setProductId(Number(id));
      store.fetchProductById();
      store.fetchRelatedItems();
    }
  }, [id, store]);

  const addItemToCart = (item: ProductInfoModel) => {
    const existingItemIndex = cartItems.findIndex((cartItem: ProductInfoModel) => cartItem.id === item.id);
    let newCartItems = [...cartItems];

    if (existingItemIndex !== -1) {
      // Если товар уже есть, увеличиваем его количество
      newCartItems[existingItemIndex].quantity += 1;
    } else {
      // Если товара нет, добавляем его с количеством 1
      newCartItems.push({ ...item, quantity: 1 });
    }
    setCartItems(newCartItems);
  };

  return (
    <StoreProvider store={store}>
      <main className={s.main}>
        <BackButton className={s[`main__back`]} onClick={() => navigate(-1)}>
          Back
        </BackButton>
        {store.product && (
          <>
            <ProductInformation product={store.product} className={s[`main__product-info`]} />
            {store.relatedItems.length > 0 && (
              <>
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
                          actionSlot={<Button onClick={() => addItemToCart(product)}>Add to Cart</Button>}
                          onClick={handlerCardClick(product.id)}
                        />
                      );
                    })}
                </div>{' '}
              </>
            )}
          </>
        )}
      </main>
    </StoreProvider>
  );
};

export default observer(OnePoductPage);
