// hooks/useTable.ts
import { useState, useMemo, useCallback } from 'react';
import type { Column, SortConfig } from '../types/types';

export const useTable = <T extends Record<string, any>>(
  initialData: T[],
  initialColumns: Column<T>[],
  options?: {
    initialPageSize?: number;
    initialSort?: SortConfig;
  }
) => {
  const [data, setData] = useState<T[]>(initialData);
  const [columns, setColumns] = useState<Column<T>[]>(initialColumns);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>(
    options?.initialSort || { key: null, direction: 'asc' }
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(options?.initialPageSize || 10);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrado
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    
    return data.filter(row => 
      columns.some(column => {
        const value = row[column.key];
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, columns]);

  // Ordenamiento
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

  // Paginación
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const totalItems = sortedData.length;

  // Actions
  const handleSort = useCallback((key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
    setCurrentPage(1);
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map((_, index) => index));
    }
  }, [selectedRows.length, paginatedData]);

  const handleSelectRow = useCallback((index: number) => {
    setSelectedRows(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  }, []);

  const updateData = useCallback((newData: T[]) => {
    setData(newData);
    setSelectedRows([]);
    setCurrentPage(1);
  }, []);

  const updateColumns = useCallback((newColumns: Column<T>[]) => {
    setColumns(newColumns);
  }, []);

  return {
    // State
    data,
    columns,
    selectedRows,
    sortConfig,
    currentPage,
    pageSize,
    searchTerm,
    
    // Computed
    filteredData,
    sortedData,
    paginatedData,
    totalPages,
    totalItems,
    
    // Actions
    setData: updateData,
    setColumns: updateColumns,
    setSearchTerm,
    handleSort,
    handleSelectAll,
    handleSelectRow,
    setCurrentPage,
    setPageSize,
    setSelectedRows,
    
    // Utils
    resetSelection: () => setSelectedRows([]),
    resetFilters: () => {
      setSearchTerm('');
      setSortConfig({ key: null, direction: 'asc' });
      setCurrentPage(1);
      setSelectedRows([]);
    }
  };
};