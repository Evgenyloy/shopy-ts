import { AppDispatch } from '../../types/types';
import { setEmailError, setPasswordError } from '../../slices/errorFormSlice';
export const errorCheck = (error: Error, dispatch: AppDispatch) => {
  if (error.message === 'Firebase: Error (auth/invalid-email).') {
    dispatch(setEmailError('invalid-email'));
    dispatch(setPasswordError(''));
  }
  if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
    dispatch(setEmailError('email-already-in-use'));
    dispatch(setPasswordError(''));
  }
  if (error.message === 'Firebase: Error (auth/missing-password).') {
    dispatch(setPasswordError('missing-password'));
    dispatch(setEmailError(''));
  }
  if (
    error.message ===
    'Firebase: Password should be at least 6 characters (auth/weak-password).'
  ) {
    dispatch(setPasswordError('Password should be at least 6 characters'));
    dispatch(setEmailError(''));
  }
  if (!error) {
    dispatch(setEmailError(''));
    dispatch(setPasswordError(''));
  }
};
