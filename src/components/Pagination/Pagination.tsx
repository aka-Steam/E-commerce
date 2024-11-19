import React from 'react';
import cn from 'classnames';

import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import ArrowLeftIcon from 'components/icons/ArrowLeftIcon';

import * as s from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, className }) => {
  if (currentPage > totalPages){
    onPageChange(1);
  }
  // Функция для генерации массива страниц
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      // Если страниц мало, просто отображаем все
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Логика отображения с многоточием
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const handlerPreviousPageClick = React.useCallback(() => onPageChange(currentPage - 1), [currentPage, onPageChange]);
  const handlerNextPageClick = React.useCallback(() => onPageChange(currentPage + 1), [currentPage, onPageChange]);
  const handlePageClick = React.useCallback((page: number) => () => onPageChange(page), [onPageChange]);

  return (
    <div className={cn(s.pagination, className)}>
      {/* Кнопка для перехода на предыдущую страницу */}
      <button
        onClick={handlerPreviousPageClick}
        disabled={currentPage === 1}
        className={cn(s.pagination__button, currentPage === 1 && s.pagination__button_disabled)}
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
              className={cn(s.pagination__page, currentPage === page && s[`pagination__page_active`])}
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
        disabled={currentPage === totalPages}
        className={cn(s.pagination__button, currentPage === totalPages && s.pagination__button_disabled)}
      >
        <ArrowRightIcon width="31" height="31" />
      </button>
    </div>
  );
};

export default Pagination;
