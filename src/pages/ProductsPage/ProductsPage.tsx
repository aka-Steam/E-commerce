import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import axios from 'axios';

import Text from 'components/Text';
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import Card from 'components/Card';
import Pagination from 'components/Pagination';
import noImage from 'assets/noimage.png';

import { ProductInfo, FetchedProductInfo } from './types';
import s from './ProductsPage.module.scss';

const OPTIONS = [
  { key: 'o1', value: 'Option1' },
  { key: 'o2', value: 'Option2' },
  { key: 'o3', value: 'Option3' },
];

const PoductsPage = () => {
  const productsApiUrl: string = import.meta.env.VITE_API_URL + '/products';
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [value, setValue] = React.useState<Option[]>([]);
  const navigate = useNavigate();

  // Получение данных о продуктах
  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: 'get',
        url: productsApiUrl,
      });

      setProducts(
        result.data.map((p: FetchedProductInfo) => ({
          id: p.id,
          description: p.description,
          images: p.images ? p.images.map((el) => el.match(/https?:\/\/[^\s"]+/)) : [noImage],
          price: p.price,
          title: p.title,
          category: p.category.name,
        })),
      );
    };

    fetch();
  }, []);

  // Количество карточек на странице
  const itemsPerPage = 9;

  // Вычисление индексов для отображаемых товаров
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = React.useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlerCardClick = React.useCallback((productId: number) => () => navigate(`/products/${productId}`), []);
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
          <Input placeholder="Search product"></Input>
          <Button>Find now</Button>
        </div>

        <MultiDropdown
          className={s[`main__filter`]}
          options={OPTIONS}
          value={value}
          onChange={setValue}
          getTitle={(values: Option[]) =>
            values.length === 0 ? 'Filter' : values.map(({ value }) => value).join(', ')
          }
        />
      </div>
      <div className={s[`main__content-title-container`]}>
        <Text className={s[`main__content-title`]} tag="h2" weight="bold">
          Total Product
        </Text>
        <Text tag="div" view="p-20" weight="bold" color="accent" className={s[`main__content-counter`]}>
          {products.length}
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
              onClick={handlerCardClick(product.id)}
            />
          );
        })}
      </div>

      <Pagination
        className={s.main__paggination}
        currentPage={currentPage}
        totalPages={Math.ceil(products.length / itemsPerPage)}
        onPageChange={handlePageChange}
      ></Pagination>
    </main>
  );
};

export default PoductsPage;
