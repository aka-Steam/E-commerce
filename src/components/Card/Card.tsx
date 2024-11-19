import React from 'react';
import cn from 'classnames';
import Text from 'components/Text';
import * as s from './Card.module.scss';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  return (
    <div className={cn(s.card, className)} onClick={onClick}>
      <div className={s.card__header}>
        <img className={s['card__header-src']} src={image} alt={'card'} />
      </div>
      <div className={s.card__body}>
        {captionSlot && (
          <Text className={s.card__caption} view="p-14" weight="medium" color="secondary">
            {captionSlot}
          </Text>
        )}
        <Text maxLines={2} tag="h4" view="p-20" weight="medium" color="primary">
          {title}
        </Text>
        <Text maxLines={3} className={s.card__subtitle} view="p-16" color="secondary">
          {subtitle}
        </Text>
        <div className={s.card__footer}>
          {contentSlot && (
            <Text view="p-18" weight="bold">
              {contentSlot}
            </Text>
          )}
          <div className={s.card__action}>{actionSlot}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
