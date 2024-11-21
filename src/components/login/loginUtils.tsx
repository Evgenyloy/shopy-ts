import { setEmailError, setPasswordError } from '../../slices/errorFormSlice';
import { AppDispatch } from '../../types/types';

export const errorsCheck = (error: Error, dispatch: AppDispatch) => {
  if (error.message === 'Firebase: Error (auth/invalid-email).') {
    dispatch(setEmailError('wrong-email'));
  }
  if (error.message === 'Firebase: Error (auth/user-not-found).') {
    dispatch(setEmailError('user-not-found'));
  }
  if (error.message === 'Firebase: Error (auth/wrong-password).') {
    dispatch(setPasswordError('wrong-password'));
  }
  if (error.message === 'Firebase: Error (auth/missing-password).') {
    dispatch(setPasswordError('missing-password'));
  }
  if (error.message.includes('(auth/too-many-requests)')) {
    dispatch(setPasswordError('account disabled due to many failed login'));
  }
};
