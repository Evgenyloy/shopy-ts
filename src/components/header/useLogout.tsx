import { getAuth, signOut } from "firebase/auth";
import { useAppDispatch } from "../../hooks/hooks";
import { setLogoutSpinner } from "../../slices/loginSlice";
import {
  removeUser,
  setFavoriteItems,
  setOrders,
} from "../../slices/userSlice";

export const useLogout = () => {
  const dispatch = useAppDispatch();

  const logOut = async () => {
    dispatch(setLogoutSpinner(true));
    const auth = getAuth();
    try {
      await signOut(auth);
      dispatch(removeUser());
      dispatch(setOrders([]));
      dispatch(setFavoriteItems([]));
      localStorage.removeItem("userData");
      dispatch(setLogoutSpinner(false));
    } catch (error) {
      console.error("Logout error:", error);
      alert(error);
    }
  };

  return { logOut };
};
