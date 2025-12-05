// import React from 'react';
import TableRow from './TableRow';
import './Table.css';
import type { TableBodyProps } from '../../../types/types';

const TableBody = <T,>({ 
  columns, 
  data, 
  selectedRows,
  selectable = false,
  onRowSelect,
  onRowClick,
  emptyMessage = "No hay datos disponibles"
}: TableBodyProps<T>) => {
  if (data.length === 0) {
    return (
      <tbody>
        <tr className="empty-row">
          <td colSpan={columns.length + (selectable ? 1 : 0)}>
            <div className="empty-state">
              <span>📊</span>
              <p>{emptyMessage}</p>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((row, index) => (
        <TableRow<T>
          key={index}
          rowData={row}
          columns={columns}
          index={index}
          isSelected={selectedRows.includes(index)}
          selectable={selectable}
          onSelect={onRowSelect}
          onClick={onRowClick}
        />
      ))}
    </tbody>
  );
};

export default TableBody;