import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { FC, useRef } from 'react';

import './checkoutPopup.scss';

interface ICheckoutPopupProps {
  popup: boolean;
  closePopup: () => void;
}

const CheckoutPopup: FC<ICheckoutPopupProps> = ({ popup, closePopup }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    closePopup();
    navigate('/');
    window.scrollTo(0, 0);
  };

  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={popup}
      timeout={{
        enter: 200,
        exit: 200,
      }}
      mountOnEnter={true}
      unmountOnExit={true}
      nodeRef={nodeRef}
      classNames="my-node"
    >
      {
        <div className="checkout-popup" ref={nodeRef}>
          <div className="checkout-popup__text-block">
            <p className="checkout-popup__text">
              {' '}
              After confirming the order, our manager will contact you within
              five minutes.
            </p>
            <div className="checkout-popup__button" onClick={handleClick}>
              ok
            </div>
          </div>
        </div>
      }
    </CSSTransition>
  );
};

export default CheckoutPopup;
