import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import { RxCross1 } from 'react-icons/rx';
import { useAuth } from '../../../hooks/hooks';
import { addFavoriteItem, removeFavoriteItem } from '../../../slices/userSlice';
import { removeOrder, addOrder } from '../../../slices/userSlice';
import { Rating } from 'react-simple-star-rating';
import { checkAvailability } from '../../../utils/utils';
import { FC } from 'react';
import { IOrder, IProduct } from '../../../types/types';

interface IGoodsItemProps {
  item: IProduct;
  cross?: boolean;
}

const GoodsItem: FC<IGoodsItemProps> = ({ item, cross }) => {
  const dispatch = useDispatch();
  const { favorites, orders } = useAuth();

  const handleFavoriteClick = (favorites: IProduct[], item: IProduct) => {
    return checkAvailability(favorites, item)
      ? dispatch(removeFavoriteItem(item.id))
      : dispatch(addFavoriteItem(item));
  };

  const handleBasketClick = (orders: IOrder[], item: IProduct) => {
    return checkAvailability(orders, item)
      ? dispatch(removeOrder(item.id))
      : dispatch(addOrder(item));
  };

  const clazz = favorites.some((i) => {
    return i.id == item.id;
  })
    ? 'goods__heart-svg goods__heart-svg--red'
    : 'goods__heart-svg';

  const clazz2 = orders.some((i) => {
    return i.id == item.id;
  })
    ? 'goods__heart-svg goods__heart-svg--red'
    : 'goods__heart-svg';

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
          onClick={() => handleFavoriteClick(favorites, item)}
        >
          <AiOutlineHeart className={clazz} />
        </Link>
        <Link
          className="goods__svg-link"
          to={{}}
          onClick={() => handleBasketClick(orders, item)}
        >
          <PiShoppingCartSimpleBold className={clazz2} />
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
          onClick={() => handleFavoriteClick(favorites, item)}
        />
      )}
    </div>
  );
};

export default GoodsItem;
