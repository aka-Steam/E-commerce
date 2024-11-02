import React from 'react';
import styles from './Card.module.css';

import Text from '../Text';

export type CardProps = {
    /** Дополнительный classname */
    className?: string,
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

const Card: React.FC<CardProps> = (
    {
        className,
        image,
        captionSlot,
        title,
        subtitle,
        contentSlot,
        onClick,
        actionSlot,
        ...otherProps }
) => {

    return (
        <div
            className={`${styles.card} ${className}`}
            onClick={onClick}
            {...otherProps}
        >
            <div className={styles.card__header}>
                <img className={styles.card__img} src={image} alt={'->' + image} />
            </div>
            <div className={styles.card__body}>
                {captionSlot && <div className={styles.card__captionSlot}>
                    <Text view={'p-14'} color={'secondary'} weight={'medium'}>{captionSlot}</Text>
                </div>}
                <div className={styles.card__titleSlot}>
                    <Text tag={'h4'} view={'p-20'} weight={'medium'} maxLines={2}>{title}</Text>
                </div>
                <div className={styles.card__subtitleSlot}>
                    <Text view={'p-16'} color={'secondary'} maxLines={3}>{subtitle}</Text>
                </div>
                <div className={styles.card__footer}>
                    {contentSlot && <Text tag={'div'} view={'p-18'} weight={'bold'}>{contentSlot}</Text>}
                    {actionSlot}
                </div>
            </div>
        </div>
    )
};

export default Card;
