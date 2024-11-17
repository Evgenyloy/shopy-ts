import { FC, useState } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { BsXLg } from 'react-icons/bs';
import { changeQuantity, removeOrder } from '../../slices/userSlice';
import { IOrder } from '../../types/types';

interface IBasketItemProps {
  order: IOrder;
}

const BasketItem: FC<IBasketItemProps> = ({ order }) => {
  const dispatch = useAppDispatch();
  let [qty, setQty] = useState(order.quantity);
  const [price, setPrice] = useState(order.price);
  const formatPrice = price.toFixed(2);

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    order: IOrder
  ) => {
    if ((e.target as HTMLElement).classList.contains('basket-item__input-up')) {
      setQty(++qty);
      setPrice(order.price * qty);
      dispatch(changeQuantity([order.id, qty]));
    }
    if (
      (e.target as HTMLElement).classList.contains('basket-item__input-down') &&
      qty > 1
    ) {
      setQty(--qty);
      setPrice(order.price * qty);
      dispatch(changeQuantity([order.id, qty]));
    }
  };

  const handleDeleteItem = (order: IOrder) => {
    dispatch(removeOrder(order.id));
  };

  return (
    <div className="basket-item">
      <div className="basket-item__inner">
        <div className="basket-item__img-cont">
          <Link
            to={`/product/${order.id}`}
            className="basket-item__img-link"
            onClick={() => window.scrollTo(0, 0)}
          >
            <img src={order.image} alt="" className="basket-item__img" />
          </Link>
        </div>
        <h2 className="basket-item__title">{order.title}</h2>
        <div className="basket-item__input-wrapper">
          <input
            className="basket-item__input"
            type="number"
            value={qty}
            readOnly
          />
          <div
            className="basket-item__input-arrows "
            onClick={(e) => handleClick(e, order)}
          >
            <MdKeyboardArrowUp className="basket-item__input-up" />

            <MdKeyboardArrowDown className="basket-item__input-down" />
          </div>
        </div>
        <p className="basket-item__price">{formatPrice + '$'}</p>
        <div
          className="basket-item__delete-btn"
          onClick={(e) => handleDeleteItem(order)}
        >
          <BsXLg />
        </div>
      </div>
    </div>
  );
};

export default BasketItem;
