import { useParams } from "react-router-dom";
import { useGetASingleProductQuery } from "../../api/apiSlice";
import Spinner from "../spinner/Spinner";
import NewsLetter from "../newsLetter/NewsLetter";
import ProductItem from "./ProductItem";
import "./product.scss";
import { useEffect } from "react";

const Product = () => {
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    isError,
    isSuccess,
  } = useGetASingleProductQuery(id as string);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <div className="product">
        <div className="container">
          <div className="product__inner">
            {isLoading && <Spinner isLoading={isLoading} />}
            {isError ||
              (product === null && (
                <div
                  style={{
                    textAlign: "center",
                    color: "#34404b",
                    fontSize: "22px",
                    margin: "0 auto",
                    paddingTop: "150px",
                  }}
                >
                  Something went wrong please reload the page
                </div>
              ))}
            {isSuccess && product !== null && <ProductItem product={product} />}
          </div>
          <NewsLetter />
        </div>
      </div>
    </>
  );
};

export default Product;
