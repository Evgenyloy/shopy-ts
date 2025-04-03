import { NavLink } from "react-router-dom";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { AiFillHeart } from "react-icons/ai";
import { SlLogin, SlLogout } from "react-icons/sl";
import { useAppSelector, useAuth, useAppDispatch } from "../../hooks/hooks";
import { clearError } from "../../utils/utils";
import { spinnerVisibility } from "./utils";
import { useLogout } from "./useLogout";
import "./headerTools.scss";

interface IHeaderToolsProps {
  handleClick: () => void;
}

const HeaderTools = ({ handleClick }: IHeaderToolsProps) => {
  const { user, orders, favorites, isAuth } = useAuth();
  const dispatch = useAppDispatch();
  const databaseLoading = useAppSelector(
    (store) => store.login.loadingDatabaseStatus
  );
  const authentication = useAppSelector(
    (state) => state.login.loginAuthenticationStatus
  );
  const logoutSpinner = useAppSelector((state) => state.login.logout);
  const { emailError, passError } = useAppSelector((state) => state.error);
  const { logOut } = useLogout();

  return (
    <div className="header-tools">
      <NavLink
        onClick={handleClick}
        to={"/basket"}
        className={({ isActive }) =>
          "header-tools__item header-tools__item-basket" +
          (!isActive ? " unselected" : " red")
        }
      >
        <PiShoppingCartSimpleBold />
        <span className=" header-tools__item-span">
          {spinnerVisibility(databaseLoading, authentication, orders)}
        </span>
      </NavLink>
      <NavLink
        onClick={handleClick}
        to="/favorites"
        className={({ isActive }) =>
          "header-tools__item header-tools__item-favorites" +
          (!isActive ? " unselected" : " red")
        }
      >
        <AiFillHeart />
        <span className=" header-tools__items">
          {spinnerVisibility(databaseLoading, authentication, favorites)}
        </span>
      </NavLink>
      {isAuth ? (
        <div className="header-tools__item" onClick={logOut}>
          <SlLogout />
        </div>
      ) : (
        <NavLink
          to="/login"
          className="header-tools__item"
          onClick={() => clearError(emailError, passError, dispatch)}
        >
          <SlLogin />
        </NavLink>
      )}

      <p className="header-tools__user">
        {logoutSpinner ? "logout..." : null}
        {user && !logoutSpinner ? user?.email : null}
      </p>
    </div>
  );
};

export default HeaderTools;
