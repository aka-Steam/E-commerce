import { NavLink } from 'react-router-dom';
import Text from 'components/Text';
import VkIcon from 'components/icons/VkIcon';
import TgIcon from 'components/icons/TgIcon';
import GitHubIcon from 'components/icons/GitHubIcon';
import Logo from './components/Logo';
import * as s from './Footer.module.scss';

const Footer = () => (
  <footer className={s.footer}>
    <div className={s.footer__container}>
      <NavLink to="/products" className={s.footer__logo} >
        <Logo />
      </NavLink>
      <div className={s.contact}>
        <div className={s[`contact__text-container`]}>
          <Text view={'p-18'} tad={'span'}>
            Contact us:
          </Text>
          <Text view={'p-16'} tad={'span'}>
            lalasia@example.ru
          </Text>
        </div>
        <div className={s.contact__icons}>
          <a href="https://github.com/aka-Steam/E-commerce" className={s[`icon-link`]} target="_blank">
            <GitHubIcon className={s[`svg-icon`]} />
          </a>
          <a href="https://vk.com" className={s[`icon-link`]} target="_blank">
            <VkIcon className={s[`svg-icon`]} />
          </a>
          <a href="https://telegram.org" className={s[`icon-link`]} target="_blank">
            <TgIcon className={s[`svg-icon`]} />
          </a>
        </div>
      </div>
    </div>
    <Text className={s.copyright} view={'p-18'} tag={'div'}>
      © Developed by Andrey&nbsp;Pravosudov
      <br />
      2024-2025
    </Text>
  </footer>
);

export default Footer;
