import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import Pagination from "./Pagination";
import GoodsItem from "./GoodsItem";
import Spinner from "../../spinner/Spinner";
import { useGetProductsQuery } from "../../../api/apiSlice";
import { IProduct } from "../../../types/types";
import { changeCurrentPage } from "../../../slices/paginationSlice";
import "./goods.scss";
import {
  productCategoryFilter,
  productRangeFilter,
  productsRadioFilter,
} from "./utils";

function Stub() {
  return (
    <div className="goods__stub">
      There are no matches in this product category
    </div>
  );
}

function ErrorMessage() {
  return (
    <div
      style={{
        textAlign: "center",
        color: "#34404b",
        fontSize: "22px",
        margin: "0 auto",
        paddingTop: "220px",
      }}
    >
      oops something went wrong please reload the page
    </div>
  );
}

function renderItems(products: IProduct[]) {
  return products.map((item) => {
    return <GoodsItem item={item} key={item.id} />;
  });
}

function Goods() {
  const {
    data: products = [],
    isError,
    isSuccess,
    isFetching,
  } = useGetProductsQuery();

  const dispatch = useAppDispatch();

  const { categories } = useAppSelector((state) => state.category);
  const { radioFilter } = useAppSelector((state) => state.radioFilter);
  const { minPrice, maxPrice } = useAppSelector((state) => state.rangeFilter);

  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const [productsPerPage] = useState(9);
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;

  const filteredItems = productsRadioFilter(
    productCategoryFilter(
      productRangeFilter(products as IProduct[], minPrice, maxPrice),
      categories
    ),
    radioFilter
  );
  const itemsView = renderItems(
    (filteredItems as IProduct[]).slice(firstProductIndex, lastProductIndex)
  );

  if (itemsView.length === 0 && isSuccess) {
    dispatch(changeCurrentPage(1));
  }

  return (
    <div className="goods">
      {isFetching && <Spinner />}
      {isError && <ErrorMessage />}
      {itemsView.length === 0 && isSuccess ? <Stub /> : itemsView}

      <Pagination
        totalProducts={(filteredItems as IProduct[]).length}
        items={itemsView}
        productsPerPage={productsPerPage}
      />
    </div>
  );
}

export default Goods;
