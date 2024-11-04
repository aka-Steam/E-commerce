import React from 'react';
import s from './Pagination.module.scss';



type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
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
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* Кнопка для перехода на предыдущую страницу */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          border: 'none',
          background: 'none',
          cursor: currentPage === 1 ? 'default' : 'pointer',
          opacity: currentPage === 1 ? 0.5 : 1,
        }}
      >
        &#8592;
      </button>

      {/* Кнопки для страниц */}
      {getPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            style={{
              margin: '0 4px',
              padding: '4px 8px',
              backgroundColor: currentPage === page ? '#4CAF50' : 'transparent',
              color: currentPage === page ? '#fff' : '#000',
              border: currentPage === page ? '1px solid #4CAF50' : '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {page}
          </button>
        ) : (
          <span key={index} style={{ margin: '0 4px' }}>
            {page}
          </span>
        )
      )}

      {/* Кнопка для перехода на следующую страницу */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          border: 'none',
          background: 'none',
          cursor: currentPage === totalPages ? 'default' : 'pointer',
          opacity: currentPage === totalPages ? 0.5 : 1,
        }}
      >
        &#8594;
      </button>
    </div>
  );
};

export default Pagination;