import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "../types/types";
import localProducts from "./products.json";

const API = "https://fakestoreapi.com";
const API_PROXY_1 = "https://cors-anywhere.com/";
const API_PROXY_2 = "https://proxy.me.workers.dev";
const API_PROXY_3 = "https://api.cors.lol/?url=";
const API_PROXY_4 = "https://api.codetabs.com/v1/proxy?quest=";
const API_PROXY_5 = "https://crossorigin.me/";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API,
    headers: { "Content-Type": "application/json" },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      async queryFn(_arg, _api, _extraOptions, fetchWithBQ) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        try {
          const result = await fetchWithBQ({
            url: "/products",
            signal: controller.signal,
          });
          clearTimeout(timeoutId);

          if (result.error) throw result.error;
          return { data: result.data as IProduct[] };
        } catch (error) {
          console.log("Using local backup");
          return { data: localProducts };
        }
      },
    }),
    getASingleProduct: builder.query<IProduct, string>({
      async queryFn(id, _api, _extraOptions, fetchWithBQ) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        try {
          const result = await fetchWithBQ({
            url: `/products/${id}`,
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (result.error) {
            throw result.error;
          }

          return { data: result.data as IProduct };
        } catch (error) {
          const localProduct = localProducts.find((p) => p.id === Number(id));

          if (localProduct) {
            console.log("Using local backup");
            return { data: localProduct };
          }

          return {
            error: {
              status: 404,
              data: "Product not found in both API and local backup",
            },
          };
        }
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetASingleProductQuery } = apiSlice;
