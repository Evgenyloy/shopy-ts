import { AppDispatch, IOrder, IProduct } from "../../types/types";
import { setEmailError, setPasswordError } from "../../slices/errorFormSlice";
import { doc, getFirestore, setDoc } from "firebase/firestore";

export const errorCheck = (error: Error, dispatch: AppDispatch) => {
  if (error.message === "Firebase: Error (auth/invalid-email).") {
    dispatch(setEmailError("invalid-email"));
  }
  if (error.message === "Firebase: Error (auth/email-already-in-use).") {
    dispatch(setEmailError("email-already-in-use"));
  }
  if (error.message === "Firebase: Error (auth/missing-password).") {
    dispatch(setPasswordError("missing-password"));
  }
  if (
    error.message ===
    "Firebase: Password should be at least 6 characters (auth/weak-password)."
  ) {
    dispatch(setPasswordError("Password should be at least 6 characters"));
  }
};

export async function saveInDataBase(
  email: string,
  id: string,
  orders: IOrder[],
  favorites: IProduct[]
) {
  const db = getFirestore();
  try {
    await setDoc(doc(db, "users", `${email}`), {
      id,
      email,
      orders,
      favorites,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
