import { NavLink } from "react-router-dom";
import "./headerNav.scss";

interface IHeaderNavProps {
  handleClick?: () => void;
}

const HeaderNav = ({ handleClick }: IHeaderNavProps) => {
  return (
    <nav className="headerNav">
      <ul className="headerNav__inner">
        <li className="headerNav__item">
          <NavLink
            end
            to="/"
            className={({ isActive }) =>
              isActive ? "headerNav__link red" : " headerNav__link"
            }
            onClick={handleClick}
          >
            Home
          </NavLink>
        </li>

        <li className="headerNav__item">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "headerNav__link red" : " headerNav__link"
            }
            onClick={handleClick}
          >
            Products
          </NavLink>
        </li>
        <li className="headerNav__item">
          <NavLink
            to="/about"
            onClick={handleClick}
            className={({ isActive }) =>
              isActive ? "headerNav__link red" : " headerNav__link"
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
