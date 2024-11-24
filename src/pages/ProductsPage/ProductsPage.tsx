import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import Text from 'components/Text';
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import Card from 'components/Card';
import Pagination from 'components/Pagination';

import productStore from '../../stores/ProductStore';
import * as s from './ProductsPage.module.scss';

const PoductsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = React.useState(searchParams.get('search') || '');
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1);

  const filterParam = searchParams.get('filter') ? searchParams.get('filter') : '';

  const [multiDropdownValue, setMultiDropdownValue] = React.useState<Option[]>(
    filterParam!.length === 0 ? [] : filterParam!.split(',').map((key) => ({ key: key, value: '' })),
  );

  const { options, fetchProducts, fetchSearchResult, fetchCategories, filteredProducts, setSelectedOptions } =
    productStore;

  const handleSearch = React.useCallback(() => {
    fetchSearchResult(searchValue);
    setCurrentPage(1);
  }, [searchValue, setSearchValue]);

  const handlePageChange = React.useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleCardClick = React.useCallback((productId: number) => () => navigate(`/products/${productId}`), []);

  // Получение данных о товарах
  useEffect(() => {
    if (searchValue !== '') {
      fetchSearchResult(searchValue);
    } else {
      fetchProducts();
    }

    fetchCategories(setMultiDropdownValue);
    setSearchParams({
      search: searchValue,
      page: String(currentPage),
      filter: String(multiDropdownValue.map(({ key }) => key)),
    });
  }, []);

  //Установка выбранных фильтров в стор
  useEffect(() => {
    setSelectedOptions(multiDropdownValue);
  }, [multiDropdownValue]);

  //Установка значений в Query-параметры
  useEffect(() => {
    setSearchParams({
      search: searchValue,
      page: String(currentPage),
      filter: String(multiDropdownValue.map(({ key }) => key)),
    });
  }, [searchValue, currentPage, multiDropdownValue]);

  // Количество карточек на странице
  const itemsPerPage = 9;

  // Вычисление индексов для отображаемых товаров
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <main className={s.main}>
      <div className={s[`main__title-container`]}>
        <Text className={s[`main__title`]} tag="h1" view="title">
          Products
        </Text>
        <Text className={s[`main__subtitle`]} view="p-20" weight="normal" color="secondary">
          We display products based on the latest products we have, if you want to see our old products please enter the
          name of the item
        </Text>
      </div>

      <div className={s[`main__controls-сontainer`]}>
        <div className={s[`main__controls-group`]}>
          <Input value={searchValue} onChange={setSearchValue} placeholder="Search product"></Input>
          <Button onClick={handleSearch}>Find now</Button>
        </div>

        <MultiDropdown
          className={s[`main__filter`]}
          options={options}
          value={multiDropdownValue}
          onChange={(value: React.SetStateAction<Option[]>) => {
            setMultiDropdownValue(value), setCurrentPage(1);
          }}
          getTitle={(values: Option[]) => {
            return values.length === 0 ? 'Filter' : values.map(({ value }) => value).join(', ');
          }}
        />
      </div>

      <div className={s[`main__content-title-container`]}>
        <Text className={s[`main__content-title`]} tag="h2" weight="bold">
          Total Product
        </Text>
        <Text tag="div" view="p-20" weight="bold" color="accent">
          {filteredProducts.length}
        </Text>
      </div>

      <div className={s[`main__card-container`]}>
        {currentProducts.map((product, index) => {
          return (
            <Card
              key={index}
              image={product.images[0]}
              captionSlot={product.category}
              title={product.title}
              subtitle={product.description}
              contentSlot={'$' + product.price}
              actionSlot={<Button>Add to Cart</Button>}
              onClick={handleCardClick(product.id)}
            />
          );
        })}
      </div>

      <Pagination
        className={s.main__paggination}
        currentPage={currentPage}
        totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
        onPageChange={handlePageChange}
      ></Pagination>
    </main>
  );
};

export default observer(PoductsPage);
