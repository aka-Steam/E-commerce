import * as React from 'react';
import cn from 'classnames';

import ArrowLeftIcon from 'components/icons/ArrowLeftIcon';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import noImage from 'assets/noimage.png';

import * as s from './Carousel.module.scss';

export type CarouselProps = {
  /** Массив путей до картинок */
  source?: string[];
  /** Альтернативный текст для изображения */
  alter?: string;
  /** Дополнительный класс */
  className?: string;
};

const Carousel: React.FC<CarouselProps> = ({ source = [], alter, className }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const images = source.length > 0 ? source : [noImage];

  const handlePrevClick = React.useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  }, [images.length]);

  const handleNextClick = React.useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  }, [images.length]);

  return (
    <div className={cn(s.carousel, className)}>
      <img
        className={s.carousel__image}
        src={images[currentIndex]}
        alt={alter || 'Product image ' + currentIndex}
      />
      <button
        className={cn(s.carousel__control, s.carousel__control_left)}
        onClick={handlePrevClick}
        type="button"
        aria-label="Previous image"
      >
        <ArrowLeftIcon width="31" height="31" strokeWidth="3" />
      </button>
      <button
        className={cn(s.carousel__control, s.carousel__control_right)}
        onClick={handleNextClick}
        type="button"
        aria-label="Next image"
      >
        <ArrowRightIcon width="31" height="31" strokeWidth="3" />
      </button>
    </div>
  );
};

export default Carousel;
