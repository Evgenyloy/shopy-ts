import { useAppDispatch } from '../../../hooks/hooks';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import { RxCross1 } from 'react-icons/rx';
import { BsCurrencyDollar } from 'react-icons/bs';
import { useAuth } from '../../../hooks/hooks';
import { Rating } from 'react-simple-star-rating';
import { FC } from 'react';
import { IProduct } from '../../../types/types';
import { useState } from 'react';
import {
  handleFavoriteClick,
  handleBasketClick,
  handleOrderClick,
} from '../../../utils/utils';
import { classSetting } from '../../../utils/utils';

interface IGoodsItemProps {
  item: IProduct;
  cross?: boolean;
}

const GoodsItem: FC<IGoodsItemProps> = ({ item, cross }) => {
  const { favorites, orders } = useAuth();
  const dispatch = useAppDispatch();
  const goodsItem = orders.filter((order) => item.id === order.id);
  let [qty] = useState(goodsItem[0] ? goodsItem[0].quantity : 1);

  const ClassName = classSetting(favorites, orders, item, 'goods__heart-svg');

  return (
    <div className="goods__item " key={item.id}>
      <div className="goods__img-cont">
        <img className="goods__img" src={item.image} alt="" />
      </div>
      <h2 className="goods__title">{item.title}</h2>
      <div className="goods__item-inner">
        <Rating
          initialValue={item?.rating?.rate}
          readonly
          size={12}
          fillColor={'#ff5912'}
        />
        <span className="goods__prise">{item.price}$</span>
      </div>

      <div className="goods__svg-cont">
        <Link
          className="goods__svg-link"
          to={{}}
          onClick={() => handleFavoriteClick(favorites, item, dispatch)}
        >
          <AiOutlineHeart className={ClassName.favoriteClass} />
        </Link>
        <Link
          className="goods__svg-link"
          to={{}}
          onClick={() => handleBasketClick(orders, item, dispatch)}
        >
          <PiShoppingCartSimpleBold className={ClassName.orderClass} />
        </Link>
        <Link
          className="goods__svg-link"
          to={'/checkout'}
          onClick={() => handleOrderClick(orders, item, dispatch, qty)}
        >
          <BsCurrencyDollar
            className="goods__heart-svg"
            style={{ width: '21px', height: '21px' }}
          />
        </Link>
      </div>

      <Link
        to={`/product/${item.id}`}
        className="goods__link"
        onClick={() => window.scrollTo(0, 0)}
      ></Link>
      {cross && (
        <RxCross1
          className="goods__item-cross"
          onClick={() => handleFavoriteClick(favorites, item, dispatch)}
        />
      )}
    </div>
  );
};

export default GoodsItem;
