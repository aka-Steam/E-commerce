import React from 'react';
import cn from 'classnames';
import LoaderIcon from 'components/icons/LoaderIcon';
import * as s from './Loader.module.scss';

export type LoaderProps = {
  /** Размер */
  size?: 's' | 'm' | 'l';
  /** Дополнительный класс */
  className?: string;
  /** Цвет лоадера */
  color?: 'primary' | 'secondary' | 'accent';
};

const Loader: React.FC<LoaderProps> = ({ size = 'l', className, color }) => {
  return (
    <LoaderIcon className={cn(s.loader, s[`loader_size-${size}`], color && s[`loader_color-${color}`], className)} />
  );
};

export default Loader;
