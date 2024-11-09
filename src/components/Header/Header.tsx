import { Link } from 'react-router-dom';
import cn from 'classnames';
import BagIcon from 'components/icons/BagIcon';
import UserIcon from 'components/icons/UserIcon';
import Logo from './components/Logo';
import s from './Header.module.scss';

const Header = () => (
  <header className={s.header}>
    <Logo />
    <nav className={cn(s[`header__nav-container`], s[`nav`])}>
      <Link className={s.nav__link} to="products">
        Products
      </Link>
      <Link className={s.nav__link} to="/">
        Categories
      </Link>
      <Link className={s.nav__link} to="/">
        About us
      </Link>
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

export default Header;
