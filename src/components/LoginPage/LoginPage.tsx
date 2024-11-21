import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Login from '../login/Login';
import Spinner from '../spinner/Spinner';
import { useAppSelector } from '../../hooks/hooks';
import { clearError } from '../../utils/utils';
import './loginPage.scss';

function LoginPage() {
  const dispatch = useDispatch();
  const loginAuthentication = useAppSelector(
    (state) => state.login.loginAuthenticationStatus
  );
  const { emailError, passError } = useAppSelector((state) => state.error);
  return (
    <div className="login-page">
      {loginAuthentication === 'loading' && <Spinner />}
      {(loginAuthentication === 'error' || loginAuthentication === 'idle') && (
        <div className="login-page__inner">
          <h1 className="login-page__title">Login</h1>
          <Login />
          <p className="login-page__paragraph">
            You don't have an account? <br />
            <Link
              to="/register"
              onClick={() => clearError(emailError, passError, dispatch)}
            >
              register
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
