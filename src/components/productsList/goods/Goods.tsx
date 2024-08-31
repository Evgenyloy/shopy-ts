import React, { useState } from 'react';
import { useAppSelector } from '../../../hooks/hooks';
import Pagination from './Pagination';
import GoodsItem from './GoodsItem';
import Spinner from '../../spinner/Spinner';

import { useGetProductsQuery } from '../../../api/apiSlice';
import { IProduct } from '../../../types/types';
import './goods.scss';

function Goods() {
  const {
    data: products = [],
    isError,
    isLoading,
    isSuccess,
  } = useGetProductsQuery();

  const { categories } = useAppSelector((state) => state.category);
  const { radioFilter } = useAppSelector((state) => state.radioFilter);
  const { minPrice, maxPrice } = useAppSelector((state) => state.rangeFilter);

  const productRangeFilter = (
    products: IProduct[],
    minPrice: number,
    maxPrice: number
  ) => {
    const newProducts = products.filter((item) => {
      if (item.price < maxPrice && item.price > minPrice) {
        return item;
      }
    });
    return newProducts;
  };

  const productCategoryFilter = (
    currentProducts: IProduct[],
    categories: string
  ) => {
    const items = currentProducts.filter((item) => {
      if (categories === 'all') return currentProducts;
      return item.category == categories;
    });

    return items;
  };

  const productsRadioFilter = (products: IProduct[]) => {
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
  };

  const currentPage = useAppSelector((state) => state.pagination.currentPage);

  const [productsPerPage] = useState(9);
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;

  const renderItems = (products: IProduct[]) => {
    const item = products.map((item) => {
      return (
        <React.Fragment key={item.id}>
          <GoodsItem item={item} />
        </React.Fragment>
      );
    });
    return item;
  };

  const filteredItems = productsRadioFilter(
    productCategoryFilter(
      productRangeFilter(products as IProduct[], minPrice, maxPrice),
      categories
    )
  );

  const items = renderItems(
    (filteredItems as IProduct[]).slice(firstProductIndex, lastProductIndex)
  );

  return (
    <div className="goods">
      {isLoading && <Spinner isLoading={isLoading} />}
      {isError && (
        <div
          style={{
            textAlign: 'center',
            color: '#34404b',
            fontSize: '22px',
            margin: '0 auto',
            paddingTop: '150px',
          }}
        >
          oops something went wrong please reload the page
        </div>
      )}
      {items.length === 0 && isSuccess ? <Stub /> : items}

      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={(filteredItems as IProduct[]).length}
        items={items}
      />
    </div>
  );
}

const Stub = () => {
  return (
    <div className="goods__stub">
      There are no matches in this product category
    </div>
  );
};

export default Goods;
