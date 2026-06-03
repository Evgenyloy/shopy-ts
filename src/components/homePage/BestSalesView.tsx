import { Rating } from "react-simple-star-rating";
import type { IProduct } from "../../types";
import { Link } from "react-router-dom";
import localProducts from "../../api/products.json";

interface BestSalesViewProps {
  products: IProduct[];
}

function BestSalesView({ products }: BestSalesViewProps) {
  return (
    <>
      {products.map((item) => (
        <div className={"best-sales__item"} key={item.id}>
          <div className="best-sales__img-cont">
            <img
              className="best-sales__img"
              src={
                item.image
                  ? item.image
                  : localProducts.filter((i) => i.id === item.id)[0].image
              }
              alt={item?.title}
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
          <Link className="best-sales__link" to={`/product/${item.id}`}></Link>
        </div>
      ))}
    </>
  );
}

export default BestSalesView;
