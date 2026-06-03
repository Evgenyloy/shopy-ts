import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../api/apiSlice";
import Spinner from "../spinner/Spinner";
import ArrivalsItemsView from "./ArrivalsItemsView";
import "./arrivals.scss";

function Arrivals() {
  const {
    data: products = [],
    isFetching,
    isError,
    isSuccess,
  } = useGetProductsQuery();
  const items = products.slice(15, 19);

  return (
    <div className="arrivals">
      <div className="arrivals__text-block">
        <h2 className="arrivals__title">
          <span>new</span>arrivals
        </h2>
        <h3 className="arrivals__sub-title">
          Shop the freshest fashion for the new season.
        </h3>
      </div>
      <div className="arrivals__card-inner">
        {isFetching && <Spinner />}
        {isError && (
          <div className="arrivals__card-error">
            Oops something went wrong please reload the page
          </div>
        )}
        {isSuccess && <ArrivalsItemsView items={items} />}
      </div>
      <div className="arrivals__btn-cont">
        <Link to="/products" className="arrivals__btn-link">
          see all
        </Link>
      </div>
    </div>
  );
}

export default Arrivals;
