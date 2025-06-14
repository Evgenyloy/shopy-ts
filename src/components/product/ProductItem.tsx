import { AiOutlineHeart } from "react-icons/ai";
import { MdArrowBackIos } from "react-icons/md";
import { IoIosBasket } from "react-icons/io";
import { HiPlusSmall, HiOutlineMinusSmall } from "react-icons/hi2";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/hooks";
import { IProduct } from "../../types/types";
import { useAppDispatch } from "../../hooks/hooks";
import { useState } from "react";
import {
  handleFavoriteClick,
  handleBasketClick,
  handleOrderClick,
} from "../../utils/utils";
import { classSetting } from "../../utils/utils";
import { handlePlusClick, handleMinusClick } from "../../utils/utils";

interface IProductItemProps {
  product: IProduct;
}

const ProductItem = ({ product }: IProductItemProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { favorites, orders } = useAuth();

  const orderItem = orders.filter((order) => product.id === order.id);
  let [qty, setQty] = useState(orderItem[0] ? orderItem[0].quantity : 1);
  const price = qty * (product?.price as number);

  const ClassName = classSetting(favorites, orders, product, "product__svg");

  return (
    <>
      <div className="product__img-cont">
        <img
          className="product__img"
          src={product?.image}
          alt={product?.title}
        />
      </div>
      <div className="product__text-block">
        <h2 className="product__title">{product?.title}</h2>
        <p className="product__description">{product?.description}</p>
        <div className="product__quantity">
          <p className="product__quantity-text">Choose Quantity</p>
          <div className="product__quantity-inner">
            <HiOutlineMinusSmall
              className="product__quantity-svg"
              onClick={() => handleMinusClick(product, qty, setQty, dispatch)}
            />
            <input
              name="product-input"
              type="text"
              className="product__input"
              value={+qty}
              readOnly
              style={qty > 9 ? { width: "30px" } : { width: "20px" }}
            />
            <HiPlusSmall
              className="product__quantity-svg"
              onClick={() => handlePlusClick(product, qty, setQty, dispatch)}
            />
          </div>
        </div>
        <div className="product__order-inner">
          <p className="product__price">{price.toFixed(2) + " $"}</p>
          <div className="product__order-wrapper">
            <IoIosBasket
              className={ClassName.orderClass}
              onClick={() => handleBasketClick(orders, product, dispatch, qty)}
            />

            <AiOutlineHeart
              className={ClassName.favoriteClass}
              onClick={() => handleFavoriteClick(favorites, product, dispatch)}
            />
            <Link
              to="/checkout"
              className="product__order-link"
              onClick={() => handleOrderClick(orders, product, dispatch, qty)}
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>
      <div className="product__back" onClick={() => navigate(-1)}>
        <MdArrowBackIos className="product__back-svg" />
        <p className="product__back-text">back</p>
      </div>
    </>
  );
};

export default ProductItem;
