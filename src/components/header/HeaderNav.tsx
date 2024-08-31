import { NavLink } from 'react-router-dom';
import './headerNav.scss';
import { FC } from 'react';

interface IHeaderNavProps {
  handleClick?: () => void;
}

const HeaderNav: FC<IHeaderNavProps> = ({ handleClick }) => {
  return (
    <nav className="headerNav">
      <ul className="headerNav__inner">
        <li className="headerNav__item">
          <NavLink
            end
            to="/"
            className={(isActive) =>
              'headerNav__link' + (isActive ? ' red' : ' unselected')
            }
            onClick={handleClick}
          >
            Home
          </NavLink>
        </li>

        <li className="headerNav__item">
          <NavLink
            end
            to="/products"
            className={(isActive) =>
              'headerNav__link' + (isActive ? ' red' : ' unselected')
            }
            onClick={handleClick}
          >
            Products
          </NavLink>
        </li>
        <li className="headerNav__item">
          <NavLink
            end
            to="/about"
            onClick={handleClick}
            className={(isActive) =>
              'headerNav__link' + (isActive ? ' red' : ' unselected')
            }
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNav;
