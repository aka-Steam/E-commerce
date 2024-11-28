import * as React from 'react';
import cn from 'classnames';
import * as s from './Burger.module.scss';

type BurgerProps = {
  state: boolean;
  setState: (value: boolean) => void;
  className?: string;
};

const Burger: React.FC<BurgerProps> = ({state, setState, className}) => {

  const handlBurgerClick = React.useCallback(() => setState(!state), [state, setState])
  
  return (
    <div onClick={handlBurgerClick} className={cn(s.burger, state && s.active, className)}>
      <span className={s['burger__middle-line']}></span>
    </div>
  );
};

export default Burger;
