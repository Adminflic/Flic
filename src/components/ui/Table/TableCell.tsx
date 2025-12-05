import React from 'react';
import './Table.css';
import type { TableCellProps } from '../../../types/types';

const TableCell = <T,>({ 
  value, 
  rowData, 
  rowIndex,
  column,
  format,
  render 
}: TableCellProps<T>) => {
  const getContent = (): React.ReactNode => {
    if (render) {
      return render(value, rowData, rowIndex);
    }
    
    if (format) {
      return format(value, rowData);
    }
    
    return value;
  };

  return (
    <td style={{ textAlign: column.align || 'left' }}>
      <div className="cell-content">
        {getContent()}
      </div>
    </td>
  );
};

export default TableCell;