import React from 'react';
import s from './Pagination.module.scss';
import cn from 'classnames';

import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import ArrowLeftIcon from 'components/icons/ArrowLeftIcon';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, className }) => {
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

  return (
    <div className={cn(s.pagination, className)}>
      {/* Кнопка для перехода на предыдущую страницу */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={s.pagination__button}
        style={{
          cursor: currentPage === 1 ? 'default' : 'pointer',
          opacity: currentPage === 1 ? 0.5 : 1,
        }}
      >
        <ArrowLeftIcon width="31" height="31" />
      </button>

      {/* Кнопки для страниц */}
      <span className={s.pagination__pages}>
        {getPageNumbers().map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={cn(s.pagination__page, currentPage === page && s[`pagination__page--active`])}
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
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={s.pagination__button}
        style={{
          cursor: currentPage === totalPages ? 'default' : 'pointer',
          opacity: currentPage === totalPages ? 0.5 : 1,
        }}
      >
        <ArrowRightIcon width="31" height="31" />
      </button>
    </div>
  );
};

export default Pagination;
