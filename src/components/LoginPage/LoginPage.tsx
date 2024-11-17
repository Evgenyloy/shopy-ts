import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Login from '../login/Login';
import { setEmailError, setPasswordError } from '../../slices/errorSlice';

import './loginPage.scss';

function LoginPage() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setPasswordError(''));
    dispatch(setEmailError(''));
  };

  return (
    <div className="login-page">
      <div className="login-page__inner">
        <h1 className="login-page__title">Login</h1>
        <Login />
        <p className="login-page__paragraph">
          Or{' '}
          <Link to="/register" onClick={handleClick}>
            register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
