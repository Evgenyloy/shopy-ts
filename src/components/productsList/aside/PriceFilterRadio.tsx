import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { radioFilterChanged } from '../../../slices/priceFilterRadioSlice';
import './priceFilterRadio.scss';

function PriceFilterRadio() {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state?.radioFilter?.radioFilter);

  const handleChange = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLElement)) return;

    if (value === e.target.id) {
      dispatch(radioFilterChanged(''));
    } else {
      dispatch(radioFilterChanged(e.target.id));
    }
  };

  return (
    <div className="filter-radio">
      <input
        className="filter-radio__input"
        type="radio"
        name="filter"
        value="cheap first"
        id="cheap first"
        onClick={(e) => handleChange(e)}
        checked={value === 'cheap first' ? true : false}
        readOnly
      />
      <label className="filter-radio__label" htmlFor="cheap first">
        cheap first
      </label>

      <input
        className="filter-radio__input"
        type="radio"
        name="filter"
        value="expensive first"
        id="expensive first"
        onClick={(e) => handleChange(e)}
        checked={value === 'expensive first' ? true : false}
        readOnly
      />
      <label className="filter-radio__label" htmlFor="expensive first">
        expensive first
      </label>

      <input
        className="filter-radio__input"
        type="radio"
        name="filter"
        value="popular"
        id="popular"
        onClick={(e) => handleChange(e)}
        checked={value === 'popular' ? true : false}
        readOnly
      />
      <label className="filter-radio__label" htmlFor="popular">
        popular
      </label>

      <input
        className="filter-radio__input"
        type="radio"
        name="filter"
        value="high rating"
        id="high rating"
        onClick={(e) => handleChange(e)}
        checked={value === 'high rating' ? true : false}
        readOnly
      />
      <label className="filter-radio__label" htmlFor="high rating">
        high rating
      </label>
    </div>
  );
}

export default PriceFilterRadio;
