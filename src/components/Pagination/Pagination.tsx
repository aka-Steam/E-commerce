import React from 'react';
import cn from 'classnames';

import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import ArrowLeftIcon from 'components/icons/ArrowLeftIcon';

import s from './Pagination.module.scss';
import { observer } from 'mobx-react-lite';
import { PaginationModel } from '../../stores/models/PaginationModel';

type PaginationProps = {
  store: PaginationModel,
  className?: string;
};

const Pagination: React.FC<PaginationProps> = ({ store, className }) => {
  // Функция для генерации массива страниц
  const getPageNumbers = () => {
    const pages = [];
    if (store.totalPages <= 5) {
      // Если страниц мало, просто отображаем все
      for (let i = 1; i <= store.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Логика отображения с многоточием
      if (store.currentPage <= 3) {
        pages.push(1, 2, 3, '...', store.totalPages);
      } else if (store.currentPage >= store.totalPages - 2) {
        pages.push(1, '...', store.totalPages - 2, store.totalPages - 1, store.totalPages);
      } else {
        pages.push(1, '...', store.currentPage - 1, store.currentPage, store.currentPage + 1, '...', store.totalPages);
      }
    }
    return pages;
  };

  const handlerPreviousPageClick = React.useCallback(() => store.setCurrentPage(store.currentPage - 1), [store.setCurrentPage]);
  const handlerNextPageClick = React.useCallback(() => store.setCurrentPage(store.currentPage + 1), [store.setCurrentPage]);
  const handlePageClick = React.useCallback((page: number) => () => store.setCurrentPage(page), [store.setCurrentPage]);

  return (
    <div className={cn(s.pagination, className)}>
      {/* Кнопка для перехода на предыдущую страницу */}
      <button
        onClick={handlerPreviousPageClick}
        disabled={store.currentPage === 1}
        className={cn(s.pagination__button, store.currentPage === 1 && s.pagination__button_disabled)}
      >
        <ArrowLeftIcon width="31" height="31" />
      </button>

      {/* Кнопки для страниц */}
      <span className={s.pagination__pages}>
        {getPageNumbers().map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={handlePageClick(page)}
              className={cn(s.pagination__page, store.currentPage === page && s[`pagination__page_active`])}
            >
              {page}
            </button>
          ) : (
            // Отображаем многоточие
            <span className={s.pagination__ellipsis} key={index}>
              {page}
            </span>
          ),
        )}
      </span>

      {/* Кнопка для перехода на следующую страницу */}
      <button
        onClick={handlerNextPageClick}
        disabled={store.currentPage === store.totalPages}
        className={cn(s.pagination__button, store.currentPage === store.totalPages && s.pagination__button_disabled)}
      >
        <ArrowRightIcon width="31" height="31" />
      </button>
    </div>
  );
};

export default observer(Pagination);
