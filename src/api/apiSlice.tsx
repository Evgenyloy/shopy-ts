import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct } from '../types/types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => ({
        url: `/products`,
        params: {
          apikey: '',
          plot: 'full',
        },
        method: 'GET',
      }),
    }),
    getASingleProduct: builder.query<IProduct, string>({
      query: (arg) => ({
        url: `/products/${arg}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetASingleProductQuery } = apiSlice;
