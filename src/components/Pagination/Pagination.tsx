import React from 'react';
import cn from 'classnames';

import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import ArrowLeftIcon from 'components/icons/ArrowLeftIcon';

import * as s from './Pagination.module.scss';
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores/local/ProductsListStore';

type PaginationProps = {
  className?: string;
};

const Pagination: React.FC<PaginationProps> = ({ className }) => {
  const productsListStore = useStore();
  const store = productsListStore.paginationStore;

  const handlePageClick = React.useCallback((page: number) => () => store.setCurrentPage(page), [store.setCurrentPage]);

  return (
    <>
      {store.getPageNumbers.length >= 1 && (
        <div className={cn(s.pagination, className)}>
          {/* Кнопка для перехода на предыдущую страницу */}
          <button
            onClick={store.prev}
            disabled={store.currentPage === 1}
            className={cn(s.pagination__button, store.currentPage === 1 && s.pagination__button_disabled)}
          >
            <ArrowLeftIcon width="31" height="31" />
          </button>

          {/* Кнопки для страниц */}
          <span className={cn(s.pagination__pages, s.pagination__pages_xl)}>
            {store.getPageNumbers.map((page, index) =>
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

          <span className={cn(s.pagination__pages, s.pagination__pages_xs)}>
            <button className={cn(s.pagination__page)}>{store.currentPage}</button>
          </span>

          {/* Кнопка для перехода на следующую страницу */}
          <button
            onClick={store.next}
            disabled={store.currentPage === store.totalPages}
            className={cn(
              s.pagination__button,
              store.currentPage === store.totalPages && s.pagination__button_disabled,
            )}
          >
            <ArrowRightIcon width="31" height="31" />
          </button>
        </div>
      )}
    </>
  );
};

export default observer(Pagination);
