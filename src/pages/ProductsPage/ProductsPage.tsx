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
import s from './ProductsPage.module.scss';

const PoductsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = React.useState(searchParams.get('search') || '');
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1);
  const [multiDropdownValue, setMultiDropdownValue] = React.useState<Option[]>([]);

  const { options, fetchProducts, fetchSearchResult, fetchCategories, getProducts } = productStore;

  const handleSearch = React.useCallback(() => {
    setSearchParams({ search: searchValue, page: '1' });
    fetchSearchResult(searchValue); // Отправляем запрос поиска с текущим значением searchTerm
  }, [searchValue, setSearchValue]);

  const handlePageChange = React.useCallback((page: number) => {
    setSearchParams({ search: searchValue, page: String(page) });
    setCurrentPage(page);
  }, []);

  const handleCardClick = React.useCallback((productId: number) => () => navigate(`/products/${productId}`), []);

  useEffect(() => {
    setSearchParams({
      search: searchValue,
      page: '1',
      filter: String(multiDropdownValue.map(({ key }) => key)),
    });
  }, [multiDropdownValue]);

  // Получение данных о товарах
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Количество карточек на странице
  const itemsPerPage = 9;

  // Вычисление индексов для отображаемых товаров
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = getProducts(multiDropdownValue).slice(indexOfFirstItem, indexOfLastItem);

  return (
    <main className={s.main}>
      <div className={s[`title-container`]}>
        <Text className={s.title} view="title">
          Products
        </Text>
        <Text className={s.subtitle} view="p-20" weight="normal" color="secondary">
          We display products based on the latest products we have, if you want to see our old products please enter the
          name of the item
        </Text>
      </div>

      <div className={s[`controls-сontainer`]}>
        <div className={s[`controls-сontainer__group`]}>
          <Input value={searchValue} onChange={setSearchValue} placeholder="Search product"></Input>
          <Button onClick={handleSearch}>Find now</Button>
        </div>

        <MultiDropdown
          className={s.filter}
          options={options}
          value={multiDropdownValue}
          onChange={setMultiDropdownValue}
          getTitle={(values: Option[]) => {
            return values.length === 0 ? 'Filter' : values.map(({ value }) => value).join(', ');
          }}
        />
      </div>

      <div className={s.content}>
        <div className={s[`content__title-container`]}>
          <Text className={s[`content__title`]} tag="h2" weight="bold">
            Total Product
          </Text>
          <Text tag="div" view="p-20" weight="bold" color="accent" className={s[`content-counter`]}>
            {getProducts(multiDropdownValue).length}
          </Text>
        </div>

        <div className={s[`content__container`]}>
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
          className={s.content__paggination}
          currentPage={currentPage}
          totalPages={Math.ceil(getProducts(multiDropdownValue).length / itemsPerPage)}
          onPageChange={handlePageChange}
        ></Pagination>
      </div>
    </main>
  );
};

export default observer(PoductsPage);
