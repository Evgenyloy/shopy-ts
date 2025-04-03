import { useAppDispatch } from "../../hooks/hooks";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { deleteOrders } from "../../slices/userSlice";
import CheckoutPopup from "./CheckoutPopup";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CheckoutItem from "./CheckoutItem";
import { useAuth } from "../../hooks/hooks";
import { calculationOfTheSum } from "../../utils/utils";
import CustomInput from "./CustomCheckoutInput";
import "./checkout.scss";

const Checkout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { orders } = useAuth();
  const [popup, setPopup] = useState(false);

  const handleButtonClick = () => {
    if (orders.length === 0) return;
    setPopup(true);
    dispatch(deleteOrders());
  };

  const renderItems = orders.map((order) => {
    return <CheckoutItem order={order} key={order.id} />;
  });

  return (
    <div className="checkout">
      <div className="container">
        <div className="checkout__inner">
          <div className="checkout__title-wrapper">
            <h2 className="checkout__title">Buyer details</h2>
            <div className="checkout__back" onClick={() => navigate(-1)}>
              <MdArrowBackIos className="product__back-svg" />
              <p className="product__back-text">back</p>
            </div>
          </div>
          <Formik
            initialValues={{ name: "", email: "", phone: "" }}
            onSubmit={() => handleButtonClick()}
            validationSchema={Yup.object({
              name: Yup.string().required("This field is required"),
              phone: Yup.number().required("This field is required"),
              email: Yup.string().email(),
            })}
          >
            <Form className="checkout__input-wrapper">
              <div className="checkout__input-inner">
                <div className="checkout__input-cont">
                  <CustomInput type="text" name="name" label="name" />
                </div>
                <div className="checkout__input-cont">
                  <CustomInput type="number" name="phone" label="phone" />
                </div>
                <div className="checkout__input-cont">
                  <CustomInput
                    type="text"
                    name="email"
                    label="email (not necessary)"
                  />
                </div>
              </div>

              <h3 className="checkout__details">purchase details</h3>
              <div className="checkout__orders">{renderItems}</div>
              <p className="checkout__total">
                Total Price <span>{calculationOfTheSum(orders) + "$"}</span>
              </p>
              <button className="checkout__button" type="submit">
                Valid purchase
              </button>
            </Form>
          </Formik>

          <p className="checkout__description">
            After confirming the order, our manager will contact you within five
            minutes.
          </p>
        </div>
      </div>
      <CheckoutPopup popup={popup} closePopup={() => setPopup(false)} />
    </div>
  );
};

export default Checkout;
