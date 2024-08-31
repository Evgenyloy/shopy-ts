import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import user from '../slices/userSlice';
import favoriteProducts from '../slices/favoriteProductsSlice';
import orderList from '../slices/orderListSlice';
import category from '../slices/categoriesSlice';
import rangeFilter from '../slices/PriceFilterRangeSlice';
import radioFilter from '../slices/priceFilterRadioSlice';
import pagination from '../slices/paginationSlice';
import popup from '../slices/popupSlice';

const store = configureStore({
  reducer: {
    user,
    orderList,
    favoriteProducts,
    category,
    rangeFilter,
    radioFilter,
    pagination,
    popup,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
