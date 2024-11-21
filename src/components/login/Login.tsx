import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
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
import { clearError } from '../../utils/utils';

async function updateUserInformation(
  email: string,
  orders: IOrder[],
  favorites: IProduct[]
) {
  const db = getFirestore();
  const userRef = doc(db, 'users', `${email}`);

  await updateDoc(userRef, {
    orders: arrayUnion(...orders),
    favorites: arrayUnion(...favorites),
  });
}

async function getOrders(email: string) {
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
}

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { emailError, passError } = useAppSelector((state) => state.error);
  const { orders, favorites } = useAuth();

  const handleLogin = (email: string, password: string) => {
    clearError(emailError, passError, dispatch);
    dispatch(authenticationFetching());
    dispatch(databaseFetching());
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence)
      .then(async () => {
        return await signInWithEmailAndPassword(auth, email, password)
          .then(({ user }) => {
            dispatch(setUser({ uid: user.uid, email: user.email }));

            updateUserInformation(email, orders, favorites)
              .then((d) => {
                const data = getOrders(email);
                data
                  .then((data) => {
                    dispatch(setOrders(data?.orders as IOrder[]));
                    dispatch(setFavoriteItems(data?.favorites as IProduct[]));
                    dispatch(authenticationFetched());
                    dispatch(databaseFetched());
                    localStorage.removeItem('userData');
                    navigate('/');
                  })
                  .catch((data: Error) => {
                    dispatch(databaseFetchingError());
                    dispatch(authenticationFetchingError());
                  });
              })
              .catch((error: Error) => {
                dispatch(databaseFetchingError());
                dispatch(authenticationFetchingError());
              });
          })

          .catch((error: Error) => {
            errorsCheck(error, dispatch);
            dispatch(databaseFetchingError());
            dispatch(authenticationFetchingError());
          });
      })
      .catch((error) => {});
  };

  return <Form title="sign in" handleClick={handleLogin} />;
}

export default Login;
