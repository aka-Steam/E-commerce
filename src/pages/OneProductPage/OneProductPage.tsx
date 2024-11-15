import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axiosInstanse from 'utils/axiosInstanse';
import Text from 'components/Text';
import Button from 'components/Button';
import Card from 'components/Card';
import noImage from 'assets/noimage.png';

import { ProductInfo, FetchedProductInfo } from './types';
import BackButton from './components/BackButton';
import ProductInformation from './components/ProductInformation';
import s from './OnePoductPage.module.scss';

const OnePoductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Partial<ProductInfo>>({});
  const [relatedItems, setRelatedItems] = useState<ProductInfo[]>([]);
  const navigate = useNavigate();

  const handlerCardClick = React.useCallback(
    (relatedItemId: number) => () => navigate(`/products/${relatedItemId}`),
    [],
  );

  // Получение данных о товаре
  useEffect(() => {
    const fetch = async () => {
      const result = await axiosInstanse.get(`/products/${id}`);

      setProduct({
        id: result.data.id,
        description: result.data.description,
        images: result.data.images.map((el: string) => el.match(/https?:\/\/[^\s"]+/)),
        price: result.data.price,
        title: result.data.title,
        category: result.data.category.name,
      });
    };

    fetch();
  }, [id]);

  // Получение данных о рекомендуемых товарах
  useEffect(() => {
    const fetch = async () => {
      const result = await axiosInstanse.get('/products', {
        params: {
          limit: 3,
          offset: 12,
        },
      });

      setRelatedItems(
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

export default OnePoductPage;
