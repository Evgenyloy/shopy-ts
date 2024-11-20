import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct, IOrder } from '../types/types';

const firebaseUserData = JSON.parse(
  localStorage.getItem(
    'firebase:authUser:AIzaSyAWEVRT308MOF8Lo9_aRbLEdHbgLHcf65E:[DEFAULT]'
  ) as string
);
const userData = JSON.parse(localStorage.getItem('userData') as string);

interface IInitialState {
  user: { email: string; uid: string } | { email: ''; uid: '' } | null;
  favorites: IProduct[];
  orders: IOrder[];
}

const initialState: IInitialState = {
  user: firebaseUserData
    ? { email: firebaseUserData.email, uid: firebaseUserData.uid }
    : { email: '', uid: '' },
  favorites: userData ? userData.favorites : [],
  orders: userData ? userData.orders : [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    removeUser(state) {
      state.user = { email: '', uid: '' };
    },
    addOrder: (state, action: PayloadAction<IProduct>) => {
      state.orders.push({
        quantity: 1,
        id: action.payload.id,
        price: action.payload.price,
        image: action.payload.image,
        title: action.payload.title,
        description: action.payload.description,
      });
    },
    setOrders: (state, action: PayloadAction<IOrder[]>) => {
      state.orders = action.payload;
    },
    deleteOrders: (state) => {
      state.orders = [];
    },
    removeOrder: (state, action: PayloadAction<number>) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
    },
    changeQuantity: (state, action: PayloadAction<number[]>) => {
      state.orders.map((order: any) => {
        if (order.id === action.payload[0]) {
          return (order.quantity = action.payload[1]);
        }
        return false;
      });
    },
    setFavoriteItems: (state, action: PayloadAction<IProduct[]>) => {
      state.favorites = action.payload;
    },
    addFavoriteItem: (state, action: PayloadAction<IProduct>) => {
      state.favorites.push(action.payload);
    },
    removeFavoriteItem: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(
        (favorite: any) => favorite.id !== action.payload
      );
    },
  },
});

export const {
  setUser,
  removeUser,
  addFavoriteItem,
  removeFavoriteItem,
  setFavoriteItems,
  addOrder,
  changeQuantity,
  deleteOrders,
  removeOrder,
  setOrders,
} = userSlice.actions;
export default userSlice.reducer;
