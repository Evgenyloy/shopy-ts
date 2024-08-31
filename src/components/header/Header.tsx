import HeaderContacts from './HeaderContacts';
import HeaderMain from './HeaderMain';
import Popup from './Popup';
import './header.scss';

const Header = () => {
  return (
    <header className="header">
      <HeaderContacts />
      <HeaderMain />
      <Popup />
    </header>
  );
};

export default Header;
