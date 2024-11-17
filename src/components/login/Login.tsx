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
import { setEmailError, setPasswordError } from '../../slices/errorSlice';
import { spinnerChanged } from '../../slices/spinnersSlice';
import Form from '../form/Form';
import { useAuth } from '../../hooks/hooks';
import { IOrder, IFirebaseUserData, IProduct } from '../../types/types';

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const errorCheck = (error: Error) => {
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

  const { orders, favorites, user: user2, isAuth } = useAuth();

  const handleLogin = (email: string, password: string) => {
    dispatch(spinnerChanged(true));
    const auth = getAuth();
    navigate(-1);
    setPersistence(auth, browserLocalPersistence)
      .then(async () => {
        return await signInWithEmailAndPassword(auth, email, password)
          .then(({ user }) => {
            //--после входа сохраняем пользователя в redux

            dispatch(setUser({ uid: user.uid, email: user.email }));
            //объединяем данные в firebase -----------------------------------------
            updateUserInformation(email);
            //--получение данных из базы при входе ---------------------------------
            const data = getOrders(email);
            //----------------------------------------------------------------------
            data.then((data) => {
              dispatch(spinnerChanged(false));
              const orders = data?.orders;
              const favorites = data?.favorites;
              dispatch(setOrders(data?.orders as IOrder[]));
              dispatch(setFavoriteItems(data?.favorites as IProduct[]));
              console.log('запись в локал сторач', orders, favorites);

              localStorage.setItem(
                'userData',
                JSON.stringify({
                  orders,
                  favorites,
                  email: user.email,
                  uid: user.uid,
                })
              );
              dispatch(setEmailError(''));
              dispatch(setPasswordError(''));
            });
          })
          .catch((error: Error) => {
            errorCheck(error);
          });
      })
      .catch((error) => {});
  };

  //--получение данных из базы при входе ---------------------------------
  const getOrders = async (email: string) => {
    const db = getFirestore();
    const docRef = doc(db, 'users', `${email}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('получение данных', docSnap.data());
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      alert('No such document!');
    }
  };
  //----------------------------------------------------------------------

  const updateUserInformation = async (email: string) => {
    console.log('объединение данных');
    const db = getFirestore();
    const userRef = doc(db, 'users', `${email}`);

    await updateDoc(userRef, {
      orders: arrayUnion(...orders),
      favorites: arrayUnion(...favorites),
    });
  };
  return <Form title="sign in" handleClick={handleLogin} />;
}

export default Login;
