import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import {
  setPersistence,
  browserLocalPersistence,
  getAuth,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { setUser } from '../../slices/userSlice';
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
import { errorCheck } from './signupUtils';

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, favorites } = useAuth();

  const handleRegister = (email: string, password: string) => {
    dispatch(authenticationFetching());
    dispatch(databaseFetching());
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return createUserWithEmailAndPassword(auth, email, password)
          .then(({ user }) => {
            dispatch(setUser({ uid: user.uid, email: user.email }));
            dispatch(authenticationFetched());

            saveInDataBase(user.email as string, user.uid)
              .then((data) => dispatch(databaseFetched()))
              .catch((error: Error) => dispatch(databaseFetchingError()));

            dispatch(setEmailError(''));
            dispatch(setPasswordError(''));
            navigate('/');
          })
          .catch((error) => {
            errorCheck(error, dispatch);
            dispatch(authenticationFetchingError());
          });
      })
      .catch((error) => {});
  };

  const saveInDataBase = async (email: string, id: string) => {
    const db = getFirestore();
    try {
      await setDoc(doc(db, 'users', `${email}`), {
        id,
        email,
        orders,
        favorites,
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return <Form title="register" handleClick={handleRegister} />;
}

export default SignUp;
