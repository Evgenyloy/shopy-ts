import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { useState } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { deleteOrders } from '../../slices/orderListSlice';
import { Link } from 'react-router-dom';
import CheckoutPopup from './CheckoutPopup';

import './checkout.scss';

const Checkout = () => {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (e.target.parentNode === null) return;
    (e.target.parentNode as Element).classList.add('active');
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (e.target.value) return;
    if (e.target.parentNode === null) return;
    (e.target.parentNode as Element).classList.remove('active');
  };

  const CustomInput = ({
    label,
    ...props
  }: {
    name: string;
    label: string;
    type: string;
  }) => {
    const [field, meta] = useField(props);

    return (
      <>
        <input
          {...props}
          {...field}
          className={
            meta.touched && meta.error
              ? 'checkout__input input-error'
              : 'checkout__input'
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {meta.touched && meta.error ? (
          <div
            data-name="name"
            data-component="div"
            className="checkout__input-error"
          >
            {meta.error}
          </div>
        ) : null}

        <label className="checkout__name-label" htmlFor={label}>
          {label}
        </label>
      </>
    );
  };

  const [popup, setPopup] = useState(false);
  const orders = useAppSelector((state) => state.orderList.orders);
  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    if (orders.length === 0) return;
    setPopup(true);
    dispatch(deleteOrders());
  };

  const totalPrice = orders
    .map((order) => {
      return order.price * order.quantity;
    })
    .reduce((a, b) => a + b, 0)
    .toFixed(2);

  const renderItems = orders.map((order) => {
    return (
      <div className="checkout__order-item" key={order.id}>
        <Link className="checkout__item" to={`/product/${order.id}`}>
          {order.title}
        </Link>
        <p className="checkout__quantity">{order.quantity}</p>
        <p className="checkout__price">
          {(order.price * order.quantity).toFixed(2) + '$'}
        </p>
      </div>
    );
  });

  return (
    <div className="checkout">
      <div className="container">
        <div className="checkout__inner">
          <h2 className="checkout__title">Buyer details</h2>
          <Formik
            initialValues={{ name: '', email: '', phone: '' }}
            onSubmit={(values) => handleButtonClick()}
            validationSchema={Yup.object({
              name: Yup.string().required('This field is required'),
              phone: Yup.number().required('This field is required'),
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
                Total Price <span>{totalPrice + '$'}</span>
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
