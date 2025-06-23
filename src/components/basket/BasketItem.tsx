import { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { BsXLg } from "react-icons/bs";
import { removeOrder } from "../../slices/userSlice";
import { IOrder } from "../../types/types";
import { handlePlusClick, handleMinusClick } from "../../utils/utils";
import localProducts from "../../api/products.json";

interface IBasketItemProps {
  order: IOrder;
}

const BasketItem = ({ order }: IBasketItemProps) => {
  const dispatch = useAppDispatch();
  let [qty, setQty] = useState(order.quantity);
  const [price, setPrice] = useState(order.price);

  return (
    <div className="basket-item">
      <div className="basket-item__inner">
        <div className="basket-item__img-cont">
          <Link
            to={`/product/${order.id}`}
            className="basket-item__img-link"
            onClick={() => window.scrollTo(0, 0)}
          >
            <img
              src={
                order.image
                  ? order.image
                  : localProducts.filter((i) => i.id === order.id)[0].image
              }
              alt={order.title}
              className="basket-item__img"
            />
          </Link>
        </div>
        <h2 className="basket-item__title">{order.title}</h2>
        <div className="basket-item__input-wrapper">
          <input
            name="basket-name"
            className="basket-item__input"
            type="text"
            value={qty}
            readOnly
          />
          <div className="basket-item__input-arrows ">
            <MdKeyboardArrowUp
              className="basket-item__input-up"
              onClick={() =>
                handlePlusClick(order, qty, setQty, dispatch, setPrice)
              }
            />

            <MdKeyboardArrowDown
              className="basket-item__input-down"
              onClick={() =>
                handleMinusClick(order, qty, setQty, dispatch, setPrice)
              }
            />
          </div>
        </div>
        <p className="basket-item__price">{price.toFixed(2) + "$"}</p>
        <div
          className="basket-item__delete-btn"
          onClick={() => dispatch(removeOrder(order.id))}
        >
          <BsXLg />
        </div>
      </div>
    </div>
  );
};

export default BasketItem;
