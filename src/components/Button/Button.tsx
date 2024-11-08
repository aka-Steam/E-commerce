import React from 'react';
import styles from './Button.module.scss';
import Loader from 'components/Loader';
import Text from 'components/Text';

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
  },[])

  return (
    <button
      className={`${styles.button} ${loading && styles.button_loading} ${className}`}
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
