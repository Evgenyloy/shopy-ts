import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrder, IProduct } from '../types/types';
import { removeUser } from './userSlice';

const userData = JSON.parse(
  localStorage.getItem(
    'firebase:authUser:AIzaSyAWEVRT308MOF8Lo9_aRbLEdHbgLHcf65E:[DEFAULT]'
  ) || ''
);

const localUserData = JSON.parse(localStorage.getItem('userData') as string);
const localGuestData = JSON.parse(localStorage.getItem('guestData') as string);

interface IInitialOrdersState {
  orders: IOrder[];
}

const initialState: IInitialOrdersState = {
  orders: userData
    ? localUserData.orders
    : localGuestData
    ? localGuestData.orders
    : [],
};

const orderList = createSlice({
  name: 'orderList',
  initialState,
  reducers: {
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
        if (order.id == action.payload[0]) {
          return (order.quantity = action.payload[1]);
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeUser, (state) => {
      state.orders = localStorage.getItem('guestData')
        ? JSON.parse(localStorage.getItem('guestData') as string).orders
        : [];
    });
  },
});

const { actions, reducer } = orderList;
export default reducer;
export const {
  addOrder,
  changeQuantity,
  deleteOrders,
  removeOrder,
  setOrders,
} = actions;
