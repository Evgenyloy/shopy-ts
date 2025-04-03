import { IProduct } from "../../../types/types";

export function productRangeFilter(
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

export function productCategoryFilter(
  currentProducts: IProduct[],
  categories: string
) {
  const items = currentProducts.filter((item) => {
    if (categories === "all") return currentProducts;
    return item.category === categories;
  });

  return items;
}

export function productsRadioFilter(products: IProduct[], radioFilter: string) {
  const newArray = [...products];

  if (radioFilter === "" || radioFilter === "disable filter") return products;
  if (radioFilter === "high rating") {
    return newArray.sort((a, b) => b.rating.rate - a.rating.rate);
  }
  if (radioFilter === "popular") {
    return newArray.sort((a, b) => b.rating.count - a.rating.count);
  }
  if (radioFilter === "expensive first") {
    return newArray.sort((a, b) => b.price - a.price);
  }
  if (radioFilter === "cheap first") {
    return newArray.sort((a, b) => a.price - b.price);
  }
}
