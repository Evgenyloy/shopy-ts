import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Login from '../login/Login';
import { setEmailError, setPasswordError } from '../../slices/errorFormSlice';
import Spinner from '../spinner/Spinner';
import { useAppSelector } from '../../hooks/hooks';

import './loginPage.scss';

function LoginPage() {
  const dispatch = useDispatch();
  const loginAuthentication = useAppSelector(
    (state) => state.login.loginAuthenticationStatus
  );
  const handleClick = () => {
    dispatch(setPasswordError(''));
    dispatch(setEmailError(''));
  };

  return (
    <div className="login-page">
      {loginAuthentication === 'loading' && <Spinner />}
      {loginAuthentication === 'error' && (
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
      )}
      {loginAuthentication === 'idle' && (
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
      )}
    </div>
  );
}

export default LoginPage;
