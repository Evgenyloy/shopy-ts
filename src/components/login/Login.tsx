import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import {
  doc,
  getDoc,
  getFirestore,
  arrayUnion,
  updateDoc,
} from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { setUser, setOrders, setFavoriteItems } from '../../slices/userSlice';
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
import { useAuth } from '../../hooks/hooks';
import { IOrder, IProduct } from '../../types/types';
import { errorsCheck } from './loginUtils';

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { orders, favorites } = useAuth();

  const handleLogin = (email: string, password: string) => {
    dispatch(authenticationFetching());
    dispatch(databaseFetching());
    const auth = getAuth();

    setPersistence(auth, browserLocalPersistence)
      .then(async () => {
        return await signInWithEmailAndPassword(auth, email, password)
          .then(({ user }) => {
            dispatch(setUser({ uid: user.uid, email: user.email }));

            updateUserInformation(email)
              .then((data) => dispatch(databaseFetched()))
              .catch((error: Error) => dispatch(databaseFetchingError()));

            const data = getOrders(email);
            data.then((data) => {
              dispatch(authenticationFetched());

              dispatch(setOrders(data?.orders as IOrder[]));
              dispatch(setFavoriteItems(data?.favorites as IProduct[]));
              localStorage.removeItem('userData');
              navigate(-1);
            });
          })
          .catch((error: Error) => {
            errorsCheck(error, dispatch);
            dispatch(authenticationFetchingError());
            dispatch(databaseFetchingError());
          });
      })
      .catch((error) => {});
    dispatch(setEmailError(''));
    dispatch(setPasswordError(''));
  };

  const updateUserInformation = async (email: string) => {
    const db = getFirestore();
    const userRef = doc(db, 'users', `${email}`);

    await updateDoc(userRef, {
      orders: arrayUnion(...orders),
      favorites: arrayUnion(...favorites),
    });
  };

  const getOrders = async (email: string) => {
    const db = getFirestore();
    const docRef = doc(db, 'users', `${email}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //console.log('получение данных', docSnap.data());
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      alert('No such document!');
    }
  };

  return <Form title="sign in" handleClick={handleLogin} />;
}

export default Login;
