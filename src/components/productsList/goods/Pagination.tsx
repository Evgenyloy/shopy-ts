import { changeCurrentPage } from '../../../slices/paginationSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { FC } from 'react';
import './pagination.scss';

interface IPaginationProps {
  totalProducts: number;
  items: JSX.Element[];
  productsPerPage: number;
}

const Pagination: FC<IPaginationProps> = ({
  totalProducts,
  items,
  productsPerPage,
}): JSX.Element | null => {
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector((state) => state.pagination.currentPage);

  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumber.push(i);
  }

  if ((items as JSX.Element[]).length === 0) return null;

  return (
    <div className="pagination">
      <ul className="pagination__inner">
        {pageNumber.map((number) => {
          let clazz;
          currentPage === number
            ? (clazz = 'pagination__page-link pagination__page-link_current')
            : (clazz = 'pagination__page-link');
          return (
            <li className="pagination__page-item" key={number}>
              <div
                className={clazz}
                onClick={() => dispatch(changeCurrentPage(number))}
              >
                {number}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
