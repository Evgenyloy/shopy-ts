import logo from '../../image/layers.png';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { changePopUp } from '../../slices/popupSlice';
import './logo.scss';

const Logo = () => {
  const dispatch = useAppDispatch();
  const handLogoClick = () => {
    dispatch(changePopUp());
  };
  return (
    <div className="logo" onClick={handLogoClick}>
      <div className="logo__inner">
        <span className="logo__text">SH</span>
        <img src={logo} alt="logo" className="logo__img" />
        <span className="logo__text">PY</span>
      </div>
      <h3 className="logo__title">shope anywhere</h3>
      <Link className="logo__link" to="/"></Link>
    </div>
  );
};

export default Logo;
