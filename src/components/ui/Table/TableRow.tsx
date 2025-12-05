import React from 'react';
import TableCell from './TableCell';
import './Table.css';
import type { TableRowProps } from '../../../types/types';

const TableRow = <T,>({ 
  rowData, 
  columns, 
  index, 
  isSelected = false,
  selectable = false,
  onSelect,
  onClick 
}: TableRowProps<T>) => {
  const handleClick = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      return;
    }
    if (onClick) {
      onClick(rowData, index);
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect(index);
    }
  };

  return (
    <tr 
      onClick={handleClick}
      className={`
        ${onClick ? 'clickable' : ''}
        ${isSelected ? 'selected' : ''}
      `}
    >
      {selectable && (
        <td className="selection-cell">
          <input 
            type="checkbox" 
            checked={isSelected}
            onChange={handleSelect}
            onClick={(e) => e.stopPropagation()}
          />
        </td>
      )}
      {columns.map((column) => (
        <TableCell<T>
          key={`${index}-${column.key}`}
          value={rowData[column.key as keyof T]}
          rowData={rowData}
          rowIndex={index}
          column={column}
          render={column.render}
        />
      ))}
    </tr>
  );
};

export default TableRow;