import React from 'react';
import { useAuth } from '../../hooks/hooks';
import { Link } from 'react-router-dom';
import GoodsItem from '../productsList/goods/GoodsItem';

import './favorites.scss';

function Favorites() {
  const { favorites } = useAuth();

  const renderItem = favorites.map((item) => {
    return (
      <React.Fragment key={item.id}>
        <GoodsItem item={item} cross />
      </React.Fragment>
    );
  });

  return (
    <div className="favorites">
      <div className="container">
        <div className="favorites__inner">
          {renderItem.length === 0 ? (
            <div className="favorites-stub">
              There's nothing here yet, but you might find something{' '}
              <Link to="/products" className="favorite-stubLink">
                here
              </Link>
            </div>
          ) : (
            renderItem
          )}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
