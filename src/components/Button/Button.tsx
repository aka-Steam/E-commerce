import React from 'react';
import cn from 'classnames';
import Loader from 'components/Loader';
import Text from 'components/Text';
import s from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
  /** Дополнительный класс */
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ loading, children, onClick, className, ...rest }) => {
  const handleClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!loading && onClick) {
      onClick(event);
    }
  }, [loading, onClick]);

  return (
    <button
      className={cn(s.button, loading && s.button_loading, className)}
      disabled={loading}
      onClick={handleClick}
      {...rest}
    >
      {loading && <Loader size="s" />}
      <Text tag={'div'} view={'button'}>
        {children}
      </Text>
    </button>
  );
};

export default Button;
