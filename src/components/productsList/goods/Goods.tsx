import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import Pagination from './Pagination';
import GoodsItem from './GoodsItem';
import Spinner from '../../spinner/Spinner';
import { useGetProductsQuery } from '../../../api/apiSlice';
import { IProduct } from '../../../types/types';
import { changeCurrentPage } from '../../../slices/paginationSlice';
import './goods.scss';

function productRangeFilter(
  products: IProduct[],
  minPrice: number,
  maxPrice: number
) {
  const newProducts = products.filter((item) => {
    if (item.price < maxPrice && item.price > minPrice) {
      return item;
    }
    return false;
  });
  return newProducts;
}

function productCategoryFilter(
  currentProducts: IProduct[],
  categories: string
) {
  const items = currentProducts.filter((item) => {
    if (categories === 'all') return currentProducts;
    return item.category === categories;
  });

  return items;
}

function productsRadioFilter(products: IProduct[], radioFilter: string) {
  const newArray = [...products];

  if (radioFilter === '' || radioFilter === 'disable filter') return products;
  if (radioFilter === 'high rating') {
    return newArray.sort((a, b) => b.rating.rate - a.rating.rate);
  }
  if (radioFilter === 'popular') {
    return newArray.sort((a, b) => b.rating.count - a.rating.count);
  }
  if (radioFilter === 'expensive first') {
    return newArray.sort((a, b) => b.price - a.price);
  }
  if (radioFilter === 'cheap first') {
    return newArray.sort((a, b) => a.price - b.price);
  }
}

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
        textAlign: 'center',
        color: '#34404b',
        fontSize: '22px',
        margin: '0 auto',
        paddingTop: '220px',
      }}
    >
      oops something went wrong please reload the page
    </div>
  );
}

function renderItems(products: IProduct[]) {
  const item = products.map((item) => {
    return (
      <React.Fragment key={item.id}>
        <GoodsItem item={item} />
      </React.Fragment>
    );
  });
  return item;
}

function Goods() {
  const {
    data: products = [],
    isError,
    isSuccess,
    isFetching,
  } = useGetProductsQuery();

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

  const dispatch = useAppDispatch();
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
