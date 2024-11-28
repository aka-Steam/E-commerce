import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import Text from 'components/Text';
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown from 'components/MultiDropdown';
import Card from 'components/Card';
import Pagination from 'components/Pagination';

import { useLocalStore } from 'utils/useLocalStore';
import productStore from '../../stores/ProductStore';
import ProductsListStore from '../../stores/ProductsListStore';
import s from './ProductsPage.module.scss';
import rootStore from '../../stores/RootStore';
import { useQueryParamsStoreInit } from '../../stores/RootStore/hooks/useQueryParamsStoreInit';

const PoductsPage = () => {
  const navigate = useNavigate();

  const store = useLocalStore(() => new ProductsListStore());

  const [searchParams, setSearchParams] = useSearchParams();

  const filterParam = searchParams.get('filter') ?? '';
  const initialOptions = filterParam!.length === 0 ? [] : filterParam!.split(',').map((key) => ({ key: key, value: '' }));

  const handleSearch = React.useCallback(() => {
    store.fetchProducts();
    rootStore.query.setParam('search', store.searchStore.searchValue)
  }, [store.searchStore]);

  // const handlePageChange = React.useCallback((page: number) => {
  //   store.paginationStore.setCurrentPage(page);
  // }, []);

  const handleCardClick = React.useCallback((productId: number) => () => navigate(`/products/${productId}`), []);

  // Получение данных о товарах
  useEffect(() => {
    store.fetchProducts();

    // TODO У нас наоборот в конструктор стора надо принимать текущие search-параметры и выставлять дефолтные значения в поиск, фильтр и пагинацию, а в useEffect уже делать просто запрос, в котором используются проставленные при создании стора значения
    // setSearchParams({
    //   search: store.searchStore.searchValue,
    //   filter: Array.from(store.filterStore.selectedKeysSet).join(','),
    //   page: String(store.paginationStore.currentPage),
    // });
  }, [store]);

  return (
    <main className={s.main}>
      <div className={s[`main__title-container`]}>
        <Text className={s[`main__title`]} view="title">
          Products
        </Text>
        <Text className={s[`main__subtitle`]} view="p-20" weight="normal" color="secondary">
          We display products based on the latest products we have, if you want to see our old products please enter the
          name of the item
        </Text>
      </div>

      <div className={s[`main__controls-сontainer`]}>
        <div className={s[`main__controls-group`]}>
          <Input
            value={store.searchStore.searchValue}
            onChange={store.searchStore.setSearchValue}
            placeholder="Search product"
          ></Input>
          <Button onClick={handleSearch}>Find now</Button>
        </div>

        <MultiDropdown store={store.filterStore} className={s[`main__filter`]} />
      </div>

      <div className={s[`main__content-title-container`]}>
        <Text className={s[`main__content-title`]} tag="h2" weight="bold">
          Total Product
        </Text>
        <Text tag="div" view="p-20" weight="bold" color="accent" className={s[`main__content-counter`]}>
          {store.totalProducts}
        </Text>
      </div>

      <div className={s[`main__card-container`]}>
        {store.currentProducts?.map(
            ( product ) => {
              return (
                <Card
                  key={product.id}
                  image={product.images[0]}
                  captionSlot={product.category}
                  title={product.title}
                  subtitle={product.description}
                  contentSlot={'$' + product.price}
                  actionSlot={<Button>Add to Cart</Button>}
                  onClick={handleCardClick(product.id)}
                />
              );
            },
          )}
      </div>

      <Pagination
        className={s.main__paggination}
        store={store.paginationStore}
        onPageChange={store.paginationStore.setCurrentPage}
      ></Pagination>
    </main>
  );
};

export default observer(PoductsPage);
