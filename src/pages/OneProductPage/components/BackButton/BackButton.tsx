import cn from 'classnames';
import Text from 'components/Text';
import ArrowLeftIcon from 'components/icons/ArrowLeftIcon';
import * as s from './BackButton.module.scss';

export type BackButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  /** Текст кнопки */
  children: React.ReactNode;
};

const BackButton: React.FC<BackButtonProps> = ({ className, children, ...porps }) => {
  return (
    <button className={cn(s[`back-button`], className)} {...porps}>
      <ArrowLeftIcon width="32" height="32" />
      <Text tag="span" view="p-20">
        {children}
      </Text>
    </button>
  );
};

export default BackButton;
