import { Link } from "react-router-dom";
import { IProduct } from "../../types/types";
import localProducts from "../../api/products.json";
function ArrivalsItemsView(item: IProduct[]) {
  const renderItem = item.map((item) => {
    return (
      <div className="arrivals__item" key={item.id}>
        <div className="arrivals__img-cont">
          <img
            className="arrivals__img"
            src={
              item.image
                ? item.image
                : localProducts.filter((i) => i.id === item.id)[0].image
            }
            alt={item.title}
            loading="lazy"
          />
        </div>
        <h2 className="arrivals__item-title">{item.title}</h2>
        <p className="arrivals__item-price">{item.price + " $"}</p>
        <Link
          to={`/product/${item.id}`}
          className="arrivals__link"
          onClick={() => window.scrollTo(0, 0)}
        ></Link>
      </div>
    );
  });
  return renderItem;
}

export default ArrivalsItemsView;
