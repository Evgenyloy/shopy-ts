import Categories from './Categories';
import PriceFilter from './PriceFilter';
import './aside.scss';

function Aside() {
  return (
    <aside className="aside">
      <Categories />
      <PriceFilter />
    </aside>
  );
}

export default Aside;
