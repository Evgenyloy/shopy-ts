import PriceFilterRadio from './PriceFilterRadio';
import PriceFilterRange from './PriceFilterRange';
import './priceFilter.scss';

function PriceFilter() {
  return (
    <form className="price-filter">
      <PriceFilterRange />
      <PriceFilterRadio />
    </form>
  );
}

export default PriceFilter;
