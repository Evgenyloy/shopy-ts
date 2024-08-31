import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { radioFilterChanged } from '../../../slices/priceFilterRadioSlice';
import './priceFilterRadio.scss';

function PriceFilterRadio() {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state?.radioFilter?.radioFilter);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(radioFilterChanged(e.target.id));
  };

  return (
    <div className="filter-radio">
      <input
        className="filter-radio__input"
        type="radio"
        name="filter"
        value="cheap first"
        id="cheap first"
        onChange={handleChange}
        checked={value == 'cheap first' ? true : false}
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
        onChange={handleChange}
        checked={value == 'expensive first' ? true : false}
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
        onChange={handleChange}
        checked={value == 'popular' ? true : false}
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
        onChange={handleChange}
        checked={value == 'high rating' ? true : false}
      />
      <label className="filter-radio__label" htmlFor="high rating">
        high rating
      </label>
    </div>
  );
}

export default PriceFilterRadio;
