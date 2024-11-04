import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import s from './OnePoductPaje.module.scss';
import BackButton from './components/BackButton';
import Carousel from './components/Carousel';
import Text from 'components/Text';
import Button from 'components/Button';
import Card from 'components/Card';

type ProductInfo = {
  id: number;
  description: string;
  images: string[];
  price: string;
  title: string;
  category: string;
};

const OnePoductPaje = () => {
  const { id } = useParams();
  const apiUrl: string = import.meta.env.VITE_API_URL + '/products/' + id;
  const [PRODUCT, setProduct] = useState<ProductInfo>({});
  const [RELATED_ITEMS, setRelatedItems] = useState<ProductInfo[]>([]);
  const navigate = useNavigate();

  // Получение данных о товаре
  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: 'get',
        url: apiUrl,
      });

      setProduct({
        id: result.data.id,
        description: result.data.description,
        images: result.data.images,
        price: result.data.price,
        title: result.data.title,
        category: result.data.category.name,
      });
    };

    fetch();
  }, []);

  // Получение данных о рекомендуемых товарах
  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: 'get',
        url: import.meta.env.VITE_API_URL + '/products/?limit=3&offset=12',
      });

      setRelatedItems(
        result.data.map((p: { id: any; description: any; images: any; price: any; title: any; category: { name: any; }; }) => ({
          id: p.id,
          description: p.description,
          images: p.images,
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
      <BackButton className={s.backButton} onClick={() => navigate('/products')}>
        Назад
      </BackButton>

      <div className={s.productInfoContainer}>
        <Carousel source={PRODUCT.images} />
        <div className={s.productDescription}>
          <Text className={s.title} view="title" tag="h1">
            {PRODUCT.title}
          </Text>
          <Text className={s.subtitle} view="p-20" tag="div" color="secondary">
            {PRODUCT.description}
          </Text>
          <Text className={s.price} view="title" tag="div">
            {'$' + PRODUCT.price}
          </Text>
          <div className={s.actionGroup}>
            <Button>Buy Now</Button>
          </div>
        </div>
      </div>

      <Text className={s.reletadItemsTitle} tag="h2" weight="bold">
        Related Items
      </Text>
      <div className={s.relatedItemsContainer}>
        {RELATED_ITEMS &&
          RELATED_ITEMS.map((product, index) => {
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
    </main>
  );
};

export default OnePoductPaje;
