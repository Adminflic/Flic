// import React from 'react';
import './Table.css';
import type { TableHeaderProps } from '../../../types/types';

const TableHeader = <T,>({ 
  columns, 
  sortConfig, 
  onSort,
  selectable = false,
  onSelectAll,
  isAllSelected = false
}: TableHeaderProps<T>) => {
  return (
    <thead>
      <tr>
        {selectable && (
          <th className="selection-header">
            <input 
              type="checkbox" 
              onChange={onSelectAll}
              checked={isAllSelected}
            />
          </th>
        )}
        {columns.map((column) => (
          <th 
            key={column.key}
            onClick={() => column.sortable && onSort(column.key)}
            className={column.sortable ? 'sortable' : ''}
            style={{ 
              width: column.width, 
              textAlign: column.align || 'left' 
            }}
          >
            <div className="header-content">
              {column.header}
              {column.sortable && sortConfig.key === column.key && (
                <span className="sort-indicator">
                  {sortConfig.direction === 'asc' ? '▲' : '▼'}
                </span>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;