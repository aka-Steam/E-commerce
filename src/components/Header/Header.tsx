import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { toggleTheme } from 'utils/theme';
import BagIcon from 'components/icons/BagIcon';
// import UserIcon from 'components/icons/UserIcon';
import SunMoonIcon from 'components/icons/SunMoonIcon';
import { LINKS } from './config';
import Logo from './components/Logo';
import Burger from './components/Burger';
import CartCounter from './components/CartCounter';
import * as s from './Header.module.scss';

const Header = () => {
  const [menuState, setMenuState] = useState(false);

  return (
    <header className={s['header']}>
      <div className={s.header__curtain}></div>
      <NavLink to="/products" className={s.header__logo} onClick={() => setMenuState(false)}>
        <Logo />
      </NavLink>
      <div className={cn(s.header__menu, menuState && s.header__menu_visible)}>
        <nav className={cn(s['header__nav-container'])}>
          {LINKS.map((link, index) => (
            <NavLink
              key={index}
              className={({ isActive }) => cn(s['nav__link'], isActive && s['nav__link_active'])}
              to={link.url}
              onClick={() => setMenuState(false)}
            >
              {link.title}
            </NavLink>
          ))}
        </nav>
        <div className={s[`header__other-actions-container`]}>
          <button onClick={() => {setMenuState(false); toggleTheme()}} className={s[`header__other-actions-button`]}>
            <SunMoonIcon width={30} height={30} />
          </button>
          <NavLink to="/cart" className={s[`header__other-actions-button`]} onClick={() => setMenuState(false)}>
            <div className={s.cartButton}>
              <BagIcon width={30} height={30} />
              <CartCounter />
            </div>
          </NavLink>
          {/* Страница профиля пока не реализована */}
          {/* <button className={s[`header__other-actions-button`]}>
            <UserIcon width={30} height={30} />
          </button> */}
        </div>
      </div>
      <Burger state={menuState} setState={setMenuState} className={s.header__burger} />
    </header>
  );
};

export default Header;
