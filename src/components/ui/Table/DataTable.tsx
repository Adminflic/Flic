import React, { useState, useMemo, useCallback } from 'react';
// import TableHeader from './TableHeader';
import './Table.css';
import type { SortConfig, TableProps } from '../../../types/types';
import TableHeader from './TableHeader';
import TableToolbar from './TableToolbar';
import TableBody from './TableBody';
import TablePagination from './TablePagination';

const DataTable = <T extends Record<string, any>>({
  columns,
  data,
  selectable = false,
  pagination = false,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  searchable = true,
  striped = true,
  hoverable = true,
  onRowClick,
  onSort,
  toolbarActions = [],
  emptyMessage = "No hay datos disponibles",
  className = ''
}: TableProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ 
    key: null, 
    direction: 'asc' 
  });

  // Filtrado de datos
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    
    return data.filter(row => 
      Object.values(row).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  // Ordenamiento de datos
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginación de datos
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const startIndex = (currentPage - 1) * currentPageSize;
    const endIndex = startIndex + currentPageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, currentPageSize, pagination]);

  // Configuración de paginación
  const totalPages = Math.ceil(sortedData.length / currentPageSize);
  const totalItems = sortedData.length;

  // Handlers
  const handleSort = useCallback((key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    const newSortConfig = { key, direction };
    setSortConfig(newSortConfig);
    
    if (onSort) {
      onSort(key, direction);
    }
  }, [sortConfig, onSort]);

  const handleSelectAll = useCallback(() => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map((_, index) => index));
    }
  }, [selectedRows.length, paginatedData]);

  const handleSelectRow = useCallback((index: number) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter(i => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  }, [selectedRows]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    setSelectedRows([]);
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setCurrentPageSize(size);
    setCurrentPage(1);
    setSelectedRows([]);
  }, []);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
    setSelectedRows([]);
  }, []);

  const handleRowClick = useCallback((row: T, index: number) => {
    if (onRowClick) {
      onRowClick(row, index);
    }
  }, [onRowClick]);

  return (
    <div className={`data-table-container ${className}`}>
      {/* <TableToolbar
        selectedCount={selectedRows.length}
        onSearch={handleSearch}
        actions={toolbarActions}
        showSearch={searchable}
      /> */}
      
      <div className="table-container">
        <table className={`custom-table ${striped ? 'striped' : ''} ${hoverable ? 'hoverable' : ''}`}>
          <TableHeader<T>
            columns={columns}
            sortConfig={sortConfig}
            onSort={handleSort}
            selectable={selectable}
            onSelectAll={handleSelectAll}
            isAllSelected={selectedRows.length === paginatedData.length && paginatedData.length > 0}
          />
          <TableBody<T>
            columns={columns}
            data={paginatedData}
            selectedRows={selectedRows}
            selectable={selectable}
            onRowSelect={handleSelectRow}
            onRowClick={handleRowClick}
            emptyMessage={emptyMessage}
          />
        </table>
      </div>
      
      {pagination && totalItems > 0 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={currentPageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOptions={pageSizeOptions}
        />
      )}
    </div>
  );
};

export default DataTable;