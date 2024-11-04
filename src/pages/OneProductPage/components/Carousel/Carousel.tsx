import * as React from 'react';
import s from './Carousel.module.scss';

export type CarouselProps = {
  /** Путь до картинки */
  source?: string;

  alter?: string;
  /** Дополнительный класс */
  className?: string;
};

const Carousel: React.FC = (...props) => {
  return (
    <div className={s.caruoselContainer}>
      <img className={s.caruoselImage} src="src/assets/noimage.png" alt="" />
      <div className={`${s.carouselControl} ${s.left}`}>
        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19.043 25.6126L10.9561 17.5258C10.0011 16.5708 10.0011 15.008 10.9561 14.0529L19.043 5.96613"
            stroke="white"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className={`${s.carouselControl} ${s.right}`}>
        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.957 25.6126L20.0439 17.5258C20.9989 16.5708 20.9989 15.008 20.0439 14.0529L11.957 5.96613"
            stroke="white"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Carousel;