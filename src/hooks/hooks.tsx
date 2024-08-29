import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../types/types';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export function useAuth() {
  const { user } = useAppSelector((state) => state.user);
  const { orders } = useAppSelector((state) => state.orderList);
  const { favorites } = useAppSelector((state) => state.favoriteProducts);

  return {
    isAuth: !!user,
    favorites,
    orders,
    user,
  };
}
