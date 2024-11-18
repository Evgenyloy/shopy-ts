import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import user from '../slices/userSlice';
import category from '../slices/categoriesSlice';
import rangeFilter from '../slices/PriceFilterRangeSlice';
import radioFilter from '../slices/priceFilterRadioSlice';
import pagination from '../slices/paginationSlice';
import popup from '../slices/popupSlice';
import error from '../slices/errorFormSlice';
import login from '../slices/loginSlice';

const store = configureStore({
  reducer: {
    user,
    category,
    rangeFilter,
    radioFilter,
    pagination,
    popup,
    error,
    login,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
