import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import SignUp from '../signUp/SignUp';
import { setEmailError, setPasswordError } from '../../slices/errorSlice';

import './registerPage.scss';

function RegisterPage() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setPasswordError(''));
    dispatch(setEmailError(''));
  };
  return (
    <div className="register-page">
      <div className="register-page__inner">
        <h2 className="register-page__title">Register</h2>
        <SignUp />
        <p className="register-page__paragraph">
          <span>Already have an account?</span>{' '}
          <Link to="/login" onClick={handleClick}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
