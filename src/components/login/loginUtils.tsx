import { setEmailError, setPasswordError } from '../../slices/errorFormSlice';
import { AppDispatch } from '../../types/types';

export const errorsCheck = (error: Error, dispatch: AppDispatch) => {
  if (error.message === 'Firebase: Error (auth/invalid-email).') {
    dispatch(setEmailError('wrong-email'));
    dispatch(setPasswordError(''));
  }
  if (error.message === 'Firebase: Error (auth/user-not-found).') {
    dispatch(setEmailError('user-not-found'));
    dispatch(setPasswordError(''));
  }
  if (error.message === 'Firebase: Error (auth/wrong-password).') {
    dispatch(setPasswordError('wrong-password'));
    dispatch(setEmailError(''));
  }
  if (error.message === 'Firebase: Error (auth/missing-password).') {
    dispatch(setPasswordError('missing-password'));
    dispatch(setEmailError(''));
  }
  if (error.message.includes('(auth/too-many-requests)')) {
    dispatch(setPasswordError('account disabled due to many failed login'));
    dispatch(setEmailError(''));
  }
};
