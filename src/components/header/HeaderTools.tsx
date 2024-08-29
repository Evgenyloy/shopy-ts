/* import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import { AiFillHeart } from 'react-icons/ai';
import { SlLogin, SlLogout } from 'react-icons/sl';
import { removeUser } from '../../../../store/slices/userSlice';
import { useAuth } from '../../../../hooks/use-auth';
import { changePopUp } from '../../../../store/slices/popupSlice';

import './headerTools.scss';

function HeaderTools({ handleClick }) {
  const dispatch = useDispatch();
  const { user, orders, favorites, isAuth } = useAuth();

  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        localStorage.removeItem('userData');
        dispatch(changePopUp(false));
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="header-tools">
      <NavLink
        exact
        onClick={handleClick}
        to={'/basket'}
        className={(isActive) =>
          'header-tools__item header-tools__item-basket' +
          (!isActive ? ' unselected' : ' red')
        }
      >
        <PiShoppingCartSimpleBold />
        <span className=" header-tools__item-span">
          {orders.length > 0 && orders.length}
        </span>
      </NavLink>
      <NavLink
        exact
        onClick={handleClick}
        to="/favorites"
        className={(isActive) =>
          'header-tools__item header-tools__item-favorites' +
          (!isActive ? ' unselected' : ' red')
        }
      >
        <AiFillHeart />
        <span className=" header-tools__items">
          {favorites?.length > 0 && favorites?.length}
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
}

export default HeaderTools;
 */

export {};
