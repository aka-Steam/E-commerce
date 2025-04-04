import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { toggleTheme } from 'utils/theme';
import BagIcon from 'components/icons/BagIcon';
import UserIcon from 'components/icons/UserIcon';
import SunMoonIcon from 'components/icons/SunMoonIcon';
import { LINKS } from './config';
import Logo from './components/Logo';
import Burger from './components/Burger';
import * as s from './Header.module.scss';

const Header = () => {
  const [menuState, setMenuState] = useState(false);

  return (
    <header className={s['header']}>
      <div className={s.header__curtain}></div>
      <Logo  className={s.header__logo}/>
      <div className={cn(s.header__menu, menuState && s.header__menu_visible )}>
        <nav className={cn(s['header__nav-container'])}>
          {LINKS.map((link, index) => (
            <NavLink
              key={index}
              className={({ isActive }) => cn(s['nav__link'], isActive && s['nav__link_active'])}
              to={link.url}
            >
              {link.title}
            </NavLink>
          ))}
        </nav>
        <div className={s[`header__other-actions-container`]}>
          <button onClick={toggleTheme} className={s[`header__other-actions-button`]}>
            <SunMoonIcon width={30} height={30} />
          </button>
          <button className={s[`header__other-actions-button`]}>
            <BagIcon width={30} height={30} />
          </button>
          <button className={s[`header__other-actions-button`]}>
            <UserIcon width={30} height={30} />
          </button>
        </div>
      </div>
      <Burger state={menuState} setState={setMenuState} className={s.header__burger}/>
    </header>
  );
};

export default Header;
