import * as React from 'react';
import cn from 'classnames';

import ArrowLeftIcon from 'components/icons/ArrowLeftIcon';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import noImage from 'assets/noimage.png';

import * as s from './Carousel.module.scss';

export type CarouselProps = {
  /** Путь до картинки */
  source?: string[];

  alter?: string;
  /** Дополнительный класс */
  className?: string;
};

const Carousel: React.FC<CarouselProps> = ({ source, alter, className, ...props }) => {
  return (
    <div className={s.carousel}>
      <img className={s.carousel__image} src={source ? source[0] : noImage} alt={alter} />
      <div className={cn(s.carousel__control, s.carousel__control_left)}>
        <ArrowLeftIcon width="31" height="31" strokeWidth="3" />
      </div>
      <div className={cn(s.carousel__control, s.carousel__control_right)}>
        <ArrowRightIcon width="31" height="31" strokeWidth="3" />
      </div>
    </div>
  );
};

export default Carousel;
