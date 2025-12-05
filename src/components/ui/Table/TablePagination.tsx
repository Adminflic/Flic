import React from 'react';
import './Table.css';
import type { TablePaginationProps } from '../../../types/types';

const TablePagination: React.FC<TablePaginationProps> = ({ 
  currentPage = 1,
  totalPages = 1,
  pageSize = 10,
  totalItems = 0,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50]
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value);
    if (onPageSizeChange) {
      onPageSizeChange(newSize);
    }
  };

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="table-pagination">
      <div className="pagination-info">
        Mostrando {startItem}-{endItem} de {totalItems} registros
      </div>
      
      <div className="pagination-controls">
        <select 
          value={pageSize} 
          onChange={handlePageSizeChange}
          className="page-size-select"
          aria-label="Elementos por página"
        >
          {pageSizeOptions.map(option => (
            <option key={option} value={option}>
              {option} por página
            </option>
          ))}
        </select>
        
        <button 
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="pagination-btn"
          aria-label="Página anterior"
        >
          Anterior
        </button>
        
        <div className="page-numbers">
          <span className="current-page">{currentPage}</span>
          <span className="separator">de</span>
          <span className="total-pages">{totalPages}</span>
        </div>
        
        <button 
          onClick={handleNext}
          disabled={currentPage === totalPages || totalPages === 0}
          className="pagination-btn"
          aria-label="Página siguiente"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default TablePagination;