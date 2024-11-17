import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import { AiFillHeart } from 'react-icons/ai';
import { SlLogin, SlLogout } from 'react-icons/sl';
import { removeUser } from '../../slices/userSlice';
import { useAppSelector, useAuth } from '../../hooks/hooks';
import { changePopUp } from '../../slices/popupSlice';
import { setOrders } from '../../slices/userSlice';
import { setFavoriteItems } from '../../slices/userSlice';
import Spinner from '../spinner/Spinner';

import './headerTools.scss';
import { FC } from 'react';

interface IHeaderToolsProps {
  handleClick: () => void;
}

const HeaderTools: FC<IHeaderToolsProps> = ({ handleClick }) => {
  const dispatch = useDispatch();
  const spinnerLoading = useAppSelector(
    (store) => store.spinners.spinnerVisibility
  );
  const { user, orders, favorites, isAuth } = useAuth();

  const logOut = async () => {
    const auth = getAuth();
    await signOut(auth)
      .then(() => {
        dispatch(removeUser());
        dispatch(setOrders([]));
        dispatch(setFavoriteItems([]));
        localStorage.removeItem('userData');
        //dispatch(changePopUp());
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
          {spinnerLoading && <Spinner isLoading className="spinner-header" />}
          {!spinnerLoading && orders.length > 0 && orders.length}
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
          {spinnerLoading && <Spinner isLoading className="spinner-header" />}
          {!spinnerLoading && favorites?.length > 0 && favorites?.length}
        </span>
      </NavLink>
      {isAuth ? (
        <div className="header-tools__item" onClick={logOut}>
          <SlLogout />
        </div>
      ) : (
        <NavLink to="/login" className="header-tools__item">
          <SlLogin />
        </NavLink>
      )}

      <p className="header-tools__user">{user ? user?.email : null}</p>
    </div>
  );
};

export default HeaderTools;
