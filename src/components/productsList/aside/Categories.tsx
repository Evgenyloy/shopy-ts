import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { categoryChange } from '../../../slices/categoriesSlice';
import { changeCurrentPage } from '../../../slices/paginationSlice';

import './categories.scss';

function Categories() {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.category.categories);

  useEffect(() => {
    document.querySelectorAll('.categories__item').forEach((item) => {
      if (item.id == category) {
        item.className = 'categories__item active';
      } else {
        item.className = 'categories__item';
      }
    });
  }, [category]);

  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (!(e.target instanceof HTMLLIElement)) return;
    dispatch(categoryChange(e.target.id));
    dispatch(changeCurrentPage(1));
  };

  return (
    <ul className="categories">
      <h3 className="categories__title">Categories</h3>
      <li className="categories__item" id="all" onClick={(e) => handleClick(e)}>
        All
      </li>
      <li
        className="categories__item"
        id="women's clothing"
        onClick={(e) => handleClick(e)}
      >
        Women
      </li>
      <li
        className="categories__item"
        id="men's clothing"
        onClick={(e) => handleClick(e)}
      >
        Man
      </li>

      <li
        className="categories__item"
        id="jewelery"
        onClick={(e) => handleClick(e)}
      >
        Jewelry
      </li>
      <li
        className="categories__item"
        id="electronics"
        onClick={(e) => handleClick(e)}
      >
        Electronics
      </li>
    </ul>
  );
}

export default Categories;
