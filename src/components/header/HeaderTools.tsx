import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import { AiFillHeart } from 'react-icons/ai';
import { SlLogin, SlLogout } from 'react-icons/sl';
import { removeUser } from '../../slices/userSlice';
import { useAppSelector, useAuth } from '../../hooks/hooks';
import { setOrders } from '../../slices/userSlice';
import { setFavoriteItems } from '../../slices/userSlice';
import Spinner from '../spinner/Spinner';
import { clearError } from '../../utils/utils';
import { setLogoutSpinner } from '../../slices/loginSlice';
import './headerTools.scss';
import { FC } from 'react';
import { IOrder, IProduct } from '../../types/types';

function spinnerVisibility(
  databaseLoading: string,
  authentication: string,
  item: IOrder[] | IProduct[]
) {
  if (
    (databaseLoading === 'loading' || authentication === 'loading') &&
    item.length !== 0
  ) {
    return <Spinner className={'spinner-header'} />;
  }

  if (
    databaseLoading === 'idle' &&
    authentication === 'idle' &&
    item.length > 0
  ) {
    return item.length;
  }

  if (
    databaseLoading === 'error' &&
    authentication === 'error' &&
    item.length > 0
  ) {
    return item.length;
  }
}

interface IHeaderToolsProps {
  handleClick: () => void;
}

const HeaderTools: FC<IHeaderToolsProps> = ({ handleClick }) => {
  const { user, orders, favorites, isAuth } = useAuth();
  const dispatch = useDispatch();
  const databaseLoading = useAppSelector(
    (store) => store.login.loadingDatabaseStatus
  );
  const authentication = useAppSelector(
    (state) => state.login.loginAuthenticationStatus
  );
  const logoutSpinner = useAppSelector((state) => state.login.logout);
  const { emailError, passError } = useAppSelector((state) => state.error);

  const logOut = async () => {
    dispatch(setLogoutSpinner(true));
    const auth = getAuth();
    await signOut(auth)
      .then(() => {
        dispatch(removeUser());
        dispatch(setOrders([]));
        dispatch(setFavoriteItems([]));
        localStorage.removeItem('userData');
        dispatch(setLogoutSpinner(false));
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="header-tools">
      <NavLink
        onClick={handleClick}
        to={'/basket'}
        className={({ isActive }) =>
          'header-tools__item header-tools__item-basket' +
          (!isActive ? ' unselected' : ' red')
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
          'header-tools__item header-tools__item-favorites' +
          (!isActive ? ' unselected' : ' red')
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
        {logoutSpinner ? 'logout...' : null}
        {user && !logoutSpinner ? user?.email : null}
      </p>
    </div>
  );
};

export default HeaderTools;
