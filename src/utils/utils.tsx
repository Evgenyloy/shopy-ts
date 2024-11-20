import { IOrder, IProduct } from '../types/types';
import {
  removeFavoriteItem,
  addFavoriteItem,
  changeQuantity,
  removeOrder,
  addOrder,
} from '../slices/userSlice';
import { AppDispatch } from '../types/types';

export const checkAvailability = (
  item1: IOrder[] | IProduct[],
  item2: IProduct
) => {
  return item1.some((elem) => {
    return elem.id === item2?.id;
  });
};

export const handleFavoriteClick = (
  favorites: IProduct[],
  item: IProduct,
  dispatch: AppDispatch
) => {
  return checkAvailability(favorites, item)
    ? dispatch(removeFavoriteItem(item.id))
    : dispatch(addFavoriteItem(item));
};

export const handleBasketClick = (
  orders: IOrder[],
  product: IProduct,
  dispatch: AppDispatch,
  value?: number
) => {
  if (checkAvailability(orders, product)) {
    dispatch(changeQuantity([product.id, 0]));
    dispatch(removeOrder(product.id));
  } else {
    dispatch(addOrder(product));
    if (value === undefined) return;
    return value === 1 ? null : dispatch(changeQuantity([product.id, value]));
  }
};

export const handleOrderClick = (
  orders: IOrder[],
  product: IProduct,
  dispatch?: AppDispatch,
  value?: number
) => {
  if (dispatch === undefined) return;
  return (
    checkAvailability(orders, product) ? null : dispatch(addOrder(product)),
    dispatch(changeQuantity([product.id, value as number]))
  );
};

export const handlePlusClick = (
  order: IOrder | IProduct,
  qty: number,
  setQty: (value: React.SetStateAction<number>) => void,
  dispatch: AppDispatch,
  setPrice?: (value: React.SetStateAction<number>) => void
) => {
  setQty(++qty);
  dispatch(changeQuantity([order.id, qty]));
  if (setPrice === undefined) return;
  setPrice(order.price * qty);
};

export const handleMinusClick = (
  order: IOrder | IProduct,
  qty: number,
  setQty: (value: React.SetStateAction<number>) => void,
  dispatch: AppDispatch,
  setPrice?: (value: React.SetStateAction<number>) => void
) => {
  if (qty > 1) {
    setQty(--qty);
    dispatch(changeQuantity([order.id, qty]));
    if (setPrice === undefined) return;
    setPrice(order.price * qty);
  }
};

export function calculationOfTheSum(orders: any) {
  return orders
    .map((order: any) => {
      return order.price * order.quantity;
    })
    .reduce((a: any, b: any) => a + b, 0)
    .toFixed(2);
}

export function classSetting(
  favorites: IProduct[],
  orders: IOrder[],
  item: IProduct,
  className: string
) {
  let favoriteClass;
  favorites.some((favorite) => favorite.id === item?.id)
    ? (favoriteClass = className + ' svg--red')
    : (favoriteClass = className);

  let orderClass;
  orders.some((order) => order.id === item?.id)
    ? (orderClass = className + ' svg--red')
    : (orderClass = className);

  return { favoriteClass, orderClass };
}
