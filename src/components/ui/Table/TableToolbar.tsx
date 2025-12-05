import React from 'react';
import './Table.css';
import type { TableToolbarProps } from '../../../types/types';

const TableToolbar: React.FC<TableToolbarProps> = ({ 
  selectedCount = 0,
  onSearch,
  searchPlaceholder = "Buscar...",
  actions = [],
  showSearch = true
}) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="table-toolbar">
      {selectedCount > 0 && (
        <div className="selection-info">
          {selectedCount} elemento(s) seleccionado(s)
        </div>
      )}
      
      <div className="toolbar-actions">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`toolbar-btn ${action.variant || 'secondary'}`}
            disabled={action.disabled}
            aria-label={action.label}
          >
            {action.icon && <span className="btn-icon">{action.icon}</span>}
            {action.label}
          </button>
        ))}
      </div>
      
      {showSearch && (
        <div className="search-container">
          <input
            type="text"
            placeholder={searchPlaceholder}
            onChange={handleSearch}
            className="search-input"
            aria-label="Buscar en la tabla"
          />
        </div>
      )}
    </div>
  );
};

export default TableToolbar;