import store from '../store/store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface IProduct {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: IRating;
  title: string;
}

export interface IRating {
  count: number;
  rate: number;
}

export interface IOrder {
  quantity: number;
  id: number;
  price: number;
  image: string;
  title: string;
  description: string;
}
