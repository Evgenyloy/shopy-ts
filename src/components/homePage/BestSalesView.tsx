import { Rating } from "react-simple-star-rating";
import { IProduct } from "../../types/types";
import { Link } from "react-router-dom";

function BestSalesView(products: IProduct[]) {
  const renderItems = products.map((item) => {
    return (
      <div className={"best-sales__item"} key={item.id}>
        <div className="best-sales__img-cont">
          <img
            className="best-sales__img"
            src={item?.image}
            alt="product"
            loading="lazy"
          />
        </div>

        <div className="best-sales__item-wrapper">
          <p className="best-sales__description">{item?.title}</p>
          <div className="best-sales__item-inner">
            <p className="best-sales__price">{item?.price + " $"}</p>
            <Rating
              initialValue={item?.rating?.rate}
              readonly
              size={15}
              fillColor={"#ff5912"}
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

export default BestSalesView;
