import React from 'react';
import { useNavigate } from 'react-router-dom';
import Text from 'components/Text'
import * as s from './CategoryCard.module.scss';

export type CategoryCardProps = {
  id: number;
  name: string;
  image: string;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products?filter=${id}`);
  };

  return (
    <div className={s.card} onClick={handleClick}>
      <div className={s[`card__image-container`]}>
        <img src={image} alt={name} className={s.card__image} />
      </div>
      <Text maxLines={2} tag="h4" view="p-20" weight="medium" color="primary" className={s.card__title}>{name}</Text>
    </div>
  );
};

export default CategoryCard;
