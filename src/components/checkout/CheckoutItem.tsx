import { FC } from "react";
import { IOrder } from "../../types/types";
import { useState } from "react";
import { removeOrder } from "../../slices/userSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { HiPlusSmall, HiOutlineMinusSmall } from "react-icons/hi2";
import { handlePlusClick, handleMinusClick } from "../../utils/utils";
import localProducts from "../../api/products.json";

interface ICheckoutItemProps {
  order: IOrder;
}

const CheckoutItem = ({ order }: ICheckoutItemProps) => {
  const dispatch = useAppDispatch();
  let [qty, setQty] = useState(order.quantity);

  return (
    <div className="checkout__order-item" key={order.id}>
      <img
        src={
          order.image
            ? order.image
            : localProducts.filter((i) => i.id === order.id)[0].image
        }
        alt={order.title}
        className="checkout__item-img"
      />
      <Link className="checkout__item" to={`/product/${order.id}`}>
        {order.title}
      </Link>

      <div className="checkout-item__input-arrows ">
        <HiOutlineMinusSmall
          className="checkout-item__input-down"
          onClick={(e) => handleMinusClick(order, qty, setQty, dispatch)}
        />

        <p className="checkout__quantity">{order.quantity}</p>
        <HiPlusSmall
          className="checkout-item__input-up"
          onClick={() => handlePlusClick(order, qty, setQty, dispatch)}
        />
      </div>

      <p className="checkout__price">
        {(order.price * order.quantity).toFixed(2) + "$"}
      </p>
      <p
        className="checkout__bin"
        onClick={() => dispatch(removeOrder(order.id))}
      >
        <RiDeleteBinLine />
      </p>
    </div>
  );
};
export default CheckoutItem;
