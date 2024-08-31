import Goods from '../goods/Goods';
import Aside from '../aside/Aside';
import NewsLetter from '../../newsLetter/NewsLetter';
import './productsList.scss';

function ProductsList() {
  return (
    <div className="products">
      <div className="container">
        <div className="products__inner">
          <Aside />
          <Goods />
          <NewsLetter />
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
