import { useAppDispatch } from '../../hooks/hooks';
import { Link } from 'react-router-dom';
import SignUp from '../signUp/SignUp';
import { useAppSelector } from '../../hooks/hooks';
import Spinner from '../spinner/Spinner';
import { clearError } from '../../utils/utils';
import './registerPage.scss';

function RegisterPage() {
  const dispatch = useAppDispatch();
  const loginAuthentication = useAppSelector(
    (state) => state.login.loginAuthenticationStatus
  );
  const { emailError, passError } = useAppSelector((state) => state.error);
  return (
    <div className="register-page">
      {loginAuthentication === 'loading' && <Spinner />}
      {(loginAuthentication === 'error' || loginAuthentication === 'idle') && (
        <div className="register-page__inner">
          <h2 className="register-page__title">Register</h2>
          <SignUp />
          <p className="register-page__paragraph">
            <span>Already have an account?</span>{' '}
            <Link
              to="/login"
              onClick={() => clearError(emailError, passError, dispatch)}
            >
              Login
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default RegisterPage;
