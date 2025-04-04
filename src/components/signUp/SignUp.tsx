import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import {
  setPersistence,
  browserLocalPersistence,
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { setUser } from "../../slices/userSlice";
import { useAuth } from "../../hooks/hooks";
import {
  authenticationFetched,
  authenticationFetching,
  authenticationFetchingError,
  databaseFetched,
  databaseFetching,
  databaseFetchingError,
} from "../../slices/loginSlice";
import Form from "../form/Form";
import { errorCheck, saveInDataBase } from "./signupUtils";
import { clearError } from "../../utils/utils";

function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { orders, favorites } = useAuth();
  const { emailError, passError } = useAppSelector((state) => state.error);

  const handleRegister = (email: string, password: string) => {
    clearError(emailError, passError, dispatch);
    dispatch(authenticationFetching());
    dispatch(databaseFetching());
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return createUserWithEmailAndPassword(auth, email, password)
          .then(({ user }) => {
            dispatch(setUser({ uid: user.uid, email: user.email }));
            dispatch(authenticationFetched());

            saveInDataBase(user.email as string, user.uid, orders, favorites)
              .then((data) => dispatch(databaseFetched()))
              .catch((error: Error) => {
                dispatch(databaseFetchingError());
                dispatch(authenticationFetchingError());
              });

            navigate("/");
          })
          .catch((error) => {
            errorCheck(error, dispatch);
            dispatch(authenticationFetchingError());
            dispatch(databaseFetchingError());
          });
      })
      .catch((error) => {});
  };

  return <Form title="register" handleClick={handleRegister} />;
}

export default SignUp;
