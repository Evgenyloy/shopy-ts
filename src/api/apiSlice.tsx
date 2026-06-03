import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IProduct } from "../types";
import localProducts from "./products.json";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      queryFn: () => {
        return { data: localProducts };
      },
    }),
    getASingleProduct: builder.query<IProduct, string>({
      queryFn: (id) => {
        const product = localProducts.find((p) => p.id === Number(id));

        if (product) {
          return { data: product };
        }

        return {
          error: {
            status: 404,
            data: "Product not found",
          },
        };
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetASingleProductQuery } = apiSlice;
