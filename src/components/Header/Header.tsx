import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import BagIcon from 'components/icons/BagIcon';
import UserIcon from 'components/icons/UserIcon';
import { LINKS } from './config';
import Logo from './components/Logo';
import s from './Header.module.scss';

const Header = () => {
  return (
    <header className={s.header}>
      <Logo />
      <nav className={cn(s[`header__nav-container`], s[`nav`])}>
        {LINKS.map((link, index) => (
          <NavLink
            key={index}
            className={({ isActive }) => cn(s.nav__link, isActive && s.nav__link_active)}
            to={link.url}
          >
            {link.title}
          </NavLink>
        ))}
      </nav>
      <div className={s[`header__other-actions-container`]}>
        <button className={s[`header__other-actions-button`]}>
          <BagIcon className={s[`header__other-actions-icon`]} width={30} height={30} />
        </button>
        <button className={s[`header__other-actions-button`]}>
          <UserIcon className={s[`header__other-actions-icon`]} width={30} height={30} />
        </button>
      </div>
    </header>
  );
};

export default Header;
