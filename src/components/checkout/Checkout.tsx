import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import React, { useState } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { deleteOrders } from '../../slices/userSlice';
import CheckoutPopup from './CheckoutPopup';
import { MdArrowBackIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import CheckoutItem from './CheckoutItem';
import { useAuth } from '../../hooks/hooks';
import { calculationOfTheSum } from '../../utils/utils';
import './checkout.scss';

const Checkout = () => {
  const navigate = useNavigate();
  const { orders } = useAuth();

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

  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    if (orders.length === 0) return;
    setPopup(true);
    dispatch(deleteOrders());
  };

  const renderItem = orders.map((order) => {
    return (
      <React.Fragment key={order.id}>
        <CheckoutItem order={order} />
      </React.Fragment>
    );
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
              <div className="checkout__orders">{renderItem}</div>
              <p className="checkout__total">
                Total Price <span>{calculationOfTheSum(orders) + '$'}</span>
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
