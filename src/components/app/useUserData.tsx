import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { IOrder, IProduct } from "../../types/types";

export const updateUserInformation = async (
  user: any,
  orders: IOrder[],
  favorites: IProduct[]
) => {
  if (!user) return;
  const db = getFirestore();
  const userRef = doc(db, "users", `${user.email}`);
  await updateDoc(userRef, {
    orders,
    favorites,
  });
};
