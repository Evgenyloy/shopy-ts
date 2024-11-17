import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { changePopUp } from '../../slices/popupSlice';
import { useState } from 'react';
import Logo from '../logo/Logo';

import './popup.scss';

const Popup = () => {
  const popupVisible = useAppSelector((state) => state.popup.popupVisible);
  const dispatch = useAppDispatch();

  const handleLinkClick = () => {
    dispatch(changePopUp());
  };

  const changeBodyScroll = () => {
    if (popupVisible) {
      document.body.classList.add('noscroll');
    }
    if (!popupVisible) {
      document.body.classList.remove('noscroll');
    }
  };

  useEffect(() => {
    changeBodyScroll();
  }, [popupVisible]);

  const [windowIsOpen, setWindowIsOpen] = useState(false);

  const closePopup = () => {
    if (window.innerWidth > 650) {
      setWindowIsOpen(true);
    }
    if (window.innerWidth < 650) {
      setWindowIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', closePopup);
    return () => window.removeEventListener('resize', closePopup);
  }, []);

  useEffect(() => {
    if (!popupVisible) return;
    if (windowIsOpen) {
      dispatch(changePopUp());
    }

    // eslint-disable-next-line
  }, [windowIsOpen, popupVisible]);

  const nodeRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={popupVisible}
      timeout={{
        enter: 400,
        exit: 400,
      }}
      /* mountOnEnter */
      unmountOnExit
      classNames="transition-popup"
    >
      {
        <div className="popup" tabIndex={0} ref={nodeRef}>
          <nav className="popup__nav">
            <Logo />
            <Link to={'/'} className="popup__link" onClick={handleLinkClick}>
              home
            </Link>
            <Link
              to="products"
              className="popup__link"
              onClick={handleLinkClick}
            >
              products
            </Link>
            <Link
              to={'/about'}
              className="popup__link"
              onClick={handleLinkClick}
            >
              about
            </Link>
          </nav>
        </div>
      }
    </CSSTransition>
  );
};

export default Popup;
