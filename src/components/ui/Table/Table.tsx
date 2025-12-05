import React, { useState } from 'react';
import './Table.css';

const Table = ({ 
  columns = [], 
  data = [], 
  onSort, 
  onRowClick,
  selectable = false,
  striped = true,
  hoverable = true 
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    
    if (onSort) {
      onSort(key, direction);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(data.map((_, index) => index));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter(i => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const isRowSelected = (index) => selectedRows.includes(index);

  return (
    <div className="table-container">
      <table className={`custom-table ${striped ? 'striped' : ''} ${hoverable ? 'hoverable' : ''}`}>
        <thead>
          <tr>
            {selectable && (
              <th>
                <input 
                  type="checkbox" 
                  onChange={handleSelectAll}
                  checked={data.length > 0 && selectedRows.length === data.length}
                />
              </th>
            )}
            {columns.map((column) => (
              <th 
                key={column.key}
                onClick={() => column.sortable && handleSort(column.key)}
                className={column.sortable ? 'sortable' : ''}
                style={{ width: column.width }}
              >
                {column.header}
                {column.sortable && sortConfig.key === column.key && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              onClick={() => onRowClick && onRowClick(row)}
              className={`
                ${onRowClick ? 'clickable' : ''}
                ${isRowSelected(rowIndex) ? 'selected' : ''}
              `}
            >
              {selectable && (
                <td>
                  <input 
                    type="checkbox" 
                    checked={isRowSelected(rowIndex)}
                    onChange={() => handleSelectRow(rowIndex)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
              )}
              {columns.map((column) => (
                <td key={`${rowIndex}-${column.key}`}>
                  {column.render 
                    ? column.render(row[column.key], row, rowIndex)
                    : row[column.key]
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;