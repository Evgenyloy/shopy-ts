import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Logo from '../logo/Logo';
import HeaderNav from './HeaderNav';
import HeaderTools from './HeaderTools';
import { changePopUp } from '../../slices/popupSlice';
import { categoryChange } from '../../slices/categoriesSlice';
import { radioFilterChanged } from '../../slices/priceFilterRadioSlice';
import {
  minPriceFilterChanged,
  maxPriceFilterChanged,
} from '../../slices/PriceFilterRangeSlice';

import './headerMain.scss';

const HeaderMain = () => {
  const { popupVisible } = useAppSelector((state) => state.popup);
  const dispatch = useAppDispatch();

  const category = useAppSelector((state) => state.category.categories);
  const radio = useAppSelector((state) => state.radioFilter.radioFilter);
  const { minPrice, maxPrice } = useAppSelector((state) => state.rangeFilter);

  const handleClick = (
    category: string,
    radio: string,
    minPrice: number,
    maxPrice: number
  ) => {
    if (category !== 'all') {
      dispatch(categoryChange('all'));
    }
    if (radio) {
      if (radio !== '') dispatch(radioFilterChanged(''));
    }
    if (minPrice !== 0 || maxPrice !== 1000) {
      dispatch(minPriceFilterChanged(0));
      dispatch(maxPriceFilterChanged(1000));
    }
  };

  const onButtonClick = () => {
    dispatch(changePopUp());
  };

  const burgerClassName = popupVisible ? 'burger active' : 'burger';

  return (
    <div className="headerMain">
      <div className="container">
        <div className="headerMain__inner">
          <Logo />
          <HeaderNav
            handleClick={() => handleClick(category, radio, minPrice, maxPrice)}
          />
          <HeaderTools
            handleClick={() => handleClick(category, radio, minPrice, maxPrice)}
          />
          <div className={burgerClassName} onClick={onButtonClick}>
            <span className="burger__line"></span>
            <span className="burger__line"></span>
            <span className="burger__line"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
