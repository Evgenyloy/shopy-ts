import { AppDispatch } from '../../types/types';
import { setEmailError, setPasswordError } from '../../slices/errorFormSlice';

export const errorCheck = (error: Error, dispatch: AppDispatch) => {
  if (error.message === 'Firebase: Error (auth/invalid-email).') {
    dispatch(setEmailError('invalid-email'));
  }
  if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
    dispatch(setEmailError('email-already-in-use'));
  }
  if (error.message === 'Firebase: Error (auth/missing-password).') {
    dispatch(setPasswordError('missing-password'));
  }
  if (
    error.message ===
    'Firebase: Password should be at least 6 characters (auth/weak-password).'
  ) {
    dispatch(setPasswordError('Password should be at least 6 characters'));
  }
};
