import Spinner from "../spinner/Spinner";
import { useGetProductsQuery } from "../../api/apiSlice";
import BestSalesView from "./BestSalesView";
import "./bestSales.scss";

function BestSales() {
  const {
    data: products = [],
    isFetching,
    isError,
    isSuccess,
  } = useGetProductsQuery();

  const renderItems = BestSalesView(products);

  return (
    <div className="best-sales">
      <div className="best-sales__text-block">
        <h2 className="best-sales__title">
          {" "}
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
            Oops something went wrong please reload the page
          </div>
        )}
        {isSuccess && renderItems.slice(0, 3)}
      </div>
    </div>
  );
}

export default BestSales;
