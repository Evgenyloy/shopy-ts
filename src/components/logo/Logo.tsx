import logo from '../../image/layers.png';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import './logo.scss';

/* interface ILogeProps {
  (): void;
} */

const Logo: FC = (props) => {
  return (
    <div className="logo" /* onClick={props.onClick} */>
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
