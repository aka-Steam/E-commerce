import * as React from 'react';
import cn from 'classnames';
import Text from 'components/Text';
import Button from 'components/Button';
import Carousel from '../Carousel';
import * as s from './ProductInformation.module.scss';

export type ProductInfoProps = {
  description?: string;
  images?: string[];
  price?: string;
  title?: string;
  className?: string;
};

const ProductInformation: React.FC<ProductInfoProps> = ({ images, title, description, price, className }) => {
  return (
    <div className={cn(s[`product-info`], className)}>
      <Carousel source={images} />
      <div className={s[`product-info__description`]}>
        <Text className={s[`product-info__title`]} view="title" tag="h1">
          {title}
        </Text>
        <Text className={s[`product-info__subtitle`]} view="p-20" tag="div" color="secondary">
          {description}
        </Text>
        <Text className={s[`product-info__price`]} view="title" tag="div">
          {'$' + price}
        </Text>
        <div>
          <Button>Buy Now</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;
