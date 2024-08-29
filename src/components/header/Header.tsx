import HeaderContacts from './HeaderContacts';
import HeaderMain from './HeaderMain';

import './header.scss';

const Header = () => {
  return (
    <header className="header">
      <HeaderContacts />
      <HeaderMain />
    </header>
  );
};

export default Header;
