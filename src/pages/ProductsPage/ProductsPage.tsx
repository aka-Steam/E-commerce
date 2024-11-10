import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Text from 'components/Text';
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import Card from 'components/Card';
import Pagination from 'components/Pagination';

import { ProductInfo } from './types';
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
        result.data.map(
          (p: { id: any; description: any; images: any; price: any; title: any; category: { name: any } }) => ({
            id: p.id,
            description: p.description,
            images: p.images,
            price: p.price,
            title: p.title,
            category: p.category.name,
          }),
        ),
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className={s.main}>
      <div className={s.titleContainer}>
        <Text className={s.title} view="title">
          Products
        </Text>
        <Text className={s.subtitle} view="p-20" weight="normal" color="secondary">
          We display products based on the latest products we have, if you want to see our old products please enter the
          name of the item
        </Text>
      </div>

      <div className={s.controlsContainer}>
        <div className={s.controlsContainerGroup}>
          <Input placeholder="Search product"></Input>
          <Button>Find now</Button>
        </div>

        <MultiDropdown
          className={s.filter}
          options={OPTIONS}
          value={value}
          onChange={setValue}
          getTitle={(values: Option[]) =>
            values.length === 0 ? 'Filter' : values.map(({ value }) => value).join(', ')
          }
        />
      </div>

      <div className={s.contentTitleContainer}>
        <Text className={s.contentTitle} tag="h2" weight="bold">
          Total Product
        </Text>
        <Text tag="div" view="p-20" weight="bold" color="accent" className={s.contentCounter}>
          {products.length}
        </Text>
      </div>

      <div className={s.contentContainer}>
        {currentProducts.map((product, index) => {
          const imageSrc = product.images ? product.images[0].match(/https?:\/\/[^\s"]+/) : 'src/assets/noimage.png';

          return (
            <Card
              key={index}
              image={imageSrc}
              captionSlot={product.category}
              title={product.title}
              subtitle={product.description}
              contentSlot={'$' + product.price}
              actionSlot={<Button>Add to Cart</Button>}
              onClick={() => navigate(`/products/${product.id}`)}
            />
          );
        })}
      </div>

      <Pagination
        className={s.paggination}
        currentPage={currentPage}
        totalPages={Math.ceil(products.length / itemsPerPage)}
        onPageChange={handlePageChange}
      ></Pagination>
    </main>
  );
};

export default PoductsPage;
