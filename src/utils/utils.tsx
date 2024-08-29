import { IOrder, IProduct } from '../types/types';

export const checkAvailability = (
  item1: IOrder[] | IProduct[],
  item2: IProduct
) => {
  return item1.some((elem) => {
    return elem.id === item2?.id;
  });
};
