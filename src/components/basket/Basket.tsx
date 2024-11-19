import { Fragment } from 'react';
import { useAuth } from '../../hooks/hooks';
import { Link, useNavigate } from 'react-router-dom';
import BasketItem from './BasketItem';
import { calculationOfTheSum } from '../../utils/utils';
import './basket.scss';

function Basket() {
  const { orders } = useAuth();
  const navigate = useNavigate();

  const renderItems = orders.map((order) => {
    return (
      <Fragment key={order.id}>
        <BasketItem order={order} />
      </Fragment>
    );
  });

  return (
    <div className="basket">
      <div className="container">
        <div className="basket__header">
          <div className="basket__header-inner">
            <p className="basket__header-text p1">name</p>
            <p className="basket__header-text p2">quantity</p>
            <p className="basket__header-text p3">price</p>
          </div>
        </div>
        <div className="basket__inner">
          {renderItems.length === 0 ? (
            <div className="basket__header-stub">
              There's nothing here yet, but you might find something{' '}
              <Link to="/products" className="basket-stubLink">
                here
              </Link>
            </div>
          ) : (
            renderItems
          )}
        </div>
        <div
          className="basket__footer"
          style={orders.length === 0 ? { padding: '30px 10px' } : undefined}
        >
          <div className="basket__footer-inner">
            <p className="basket__footer-total">Total</p>
            <p className="basket__footer-price">
              {calculationOfTheSum(orders) + '$'}
            </p>
            {orders.length === 0 ? null : (
              <button
                className="basket__footer-button"
                onClick={() => navigate('/checkout')}
              >
                order now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Basket;
