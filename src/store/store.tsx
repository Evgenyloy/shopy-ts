import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import user from '../slices/userSlice';
import favoriteProducts from '../slices/favoriteProductsSlice';
import orderList from '../slices/orderListSlice';

const store = configureStore({
  reducer: {
    user,
    orderList,
    favoriteProducts,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
