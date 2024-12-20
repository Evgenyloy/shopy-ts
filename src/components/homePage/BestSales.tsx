import { Rating } from 'react-simple-star-rating';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

import './bestSales.scss';
import { useGetProductsQuery } from '../../api/apiSlice';
import { IProduct } from '../../types/types';

function renderItemView(products: IProduct[]) {
  const renderItems = products.map((item) => {
    return (
      <div className={'best-sales__item'} key={item.id}>
        <div className="best-sales__img-cont">
          <img className="best-sales__img" src={item?.image} alt="product" />
        </div>

        <div className="best-sales__item-wrapper">
          <p className="best-sales__description">{item?.title}</p>
          <div className="best-sales__item-inner">
            <p className="best-sales__price">{item?.price + ' $'}</p>
            <Rating
              initialValue={item?.rating?.rate}
              readonly
              size={15}
              fillColor={'#ff5912'}
            />
          </div>
        </div>
        <Link
          className="best-sales__link"
          to={`/product/${item.id}`}
          onClick={() => window.scrollTo(0, 0)}
        ></Link>
      </div>
    );
  });

  return renderItems;
}

function BestSales() {
  const {
    data: products = [],
    isFetching,
    isError,
    isSuccess,
  } = useGetProductsQuery();

  const renderItems = renderItemView(products);
  return (
    <div className="best-sales">
      <div className="best-sales__text-block">
        <h2 className="best-sales__title">
          {' '}
          <span>best</span>sales
        </h2>
        <h3 className="best-sales__sub-title">
          From everyday essentials to on-trend looks, we’ve got it.
        </h3>
      </div>
      <div className="best-sales__items-inner">
        {isFetching && <Spinner />}
        {isError && (
          <div className="best-sales__card-error">
            oops something went wrong please reload the page
          </div>
        )}
        {isSuccess && renderItems.slice(0, 3)}
      </div>
    </div>
  );
}

export default BestSales;
