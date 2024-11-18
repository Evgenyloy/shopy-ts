import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { EmailAuthProvider } from 'firebase/auth';
import {
  setPersistence,
  browserLocalPersistence,
  getAuth,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
  setUser,
  deleteOrders,
  removeFavoriteItem,
} from '../../slices/userSlice';
import { useAuth } from '../../hooks/hooks';
import { setEmailError, setPasswordError } from '../../slices/errorFormSlice';
import {
  authenticationFetched,
  authenticationFetching,
  authenticationFetchingError,
  databaseFetched,
  databaseFetching,
  databaseFetchingError,
} from '../../slices/loginSlice';
import Form from '../form/Form';

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, favorites } = useAuth();

  const errorCheck = (error: Error) => {
    if (error.message == 'Firebase: Error (auth/invalid-email).') {
      dispatch(setEmailError('invalid-email'));
      dispatch(setPasswordError(''));
    }
    if (error.message == 'Firebase: Error (auth/email-already-in-use).') {
      dispatch(setEmailError('email-already-in-use'));
      dispatch(setPasswordError(''));
    }
    if (error.message == 'Firebase: Error (auth/missing-password).') {
      dispatch(setPasswordError('missing-password'));
      dispatch(setEmailError(''));
    }
    if (
      error.message ==
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

  //--Создание пользователя ----------------------------------------------------
  const handleRegister = (email: string, password: string) => {
    dispatch(authenticationFetching());
    dispatch(databaseFetching());
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return createUserWithEmailAndPassword(auth, email, password)
          .then(({ user }) => {
            //----------------------------------------------------------------------------
            dispatch(setUser({ uid: user.uid, email: user.email }));
            dispatch(authenticationFetched());
            //--сохранение пользователя в базе данных--------------------------------------------------
            saveInDataBase(user.email as string, user.uid)
              .then((data) => dispatch(databaseFetched()))
              .catch((error: Error) => dispatch(databaseFetchingError()));
            //----------------------------------------------------------------------------

            dispatch(setEmailError(''));
            dispatch(setPasswordError(''));
            navigate('/');
          })
          .catch((error) => {
            errorCheck(error);
            dispatch(authenticationFetchingError());
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  //-------------------------------------------------------------------------------------

  //--функция сохранения в базе данных--------------------------------------------------

  const saveInDataBase = async (email: string, id: string) => {
    const db = getFirestore();
    try {
      const docRef = await setDoc(doc(db, 'users', `${email}`), {
        id,
        email,
        orders,
        favorites,
      });
      console.log(`Document written with ID: ${email}`);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  //----------------------------------------------------------------------------

  return <Form title="register" handleClick={handleRegister} />;
}

export default SignUp;
