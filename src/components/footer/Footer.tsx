import React from 'react';
import Logo from '../logo/Logo';
import HeaderNav from '../header/HeaderNav';
import paymentImg from '../../image/payment_images.png';
import './footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <Logo />
          <HeaderNav />
          <div className="footer__payment">
            <h2 className="footer__payment-title">Payment Methods</h2>
            <img src={paymentImg} alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
