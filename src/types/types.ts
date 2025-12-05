// types.ts
export interface Column<T = any> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: T, index: number) => React.ReactNode;
}

export interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc';
}

export interface PaginationConfig {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface ToolbarAction {
  label: string;
  icon?: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  selectable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  searchable?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  onRowClick?: (row: T, index: number) => void;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  toolbarActions?: ToolbarAction[];
  emptyMessage?: string;
  className?: string;
}

export interface TableHeaderProps<T> {
  columns: Column<T>[];
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  selectable?: boolean;
  onSelectAll?: () => void;
  isAllSelected?: boolean;
}

export interface TableBodyProps<T> {
  columns: Column<T>[];
  data: T[];
  selectedRows: number[];
  selectable?: boolean;
  onRowSelect: (index: number) => void;
  onRowClick?: (row: T, index: number) => void;
  emptyMessage?: string;
}

export interface TableRowProps<T> {
  rowData: T;
  columns: Column<T>[];
  index: number;
  isSelected?: boolean;
  selectable?: boolean;
  onSelect?: (index: number) => void;
  onClick?: (row: T, index: number) => void;
}

export interface TableCellProps<T> {
  value: any;
  rowData: T;
  rowIndex: number;
  column: Column<T>;
  format?: (value: any, row: T) => string;
  render?: (value: any, row: T, index: number) => React.ReactNode;
}

export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
}

export interface TableToolbarProps {
  selectedCount: number;
  onSearch?: (term: string) => void;
  searchPlaceholder?: string;
  actions: ToolbarAction[];
  showSearch?: boolean;
}