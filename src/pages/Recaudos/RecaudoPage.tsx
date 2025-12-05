import DataTable from "../../components/ui/Table/DataTable"
import type { Column, ToolbarAction } from "../../types/types";


interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  status: 'Activo' | 'Inactivo';
  department: string;
  salary: number;
}


export const RecaudoPage = () => {

  // Datos de ejemplo
  const users: User[] = [
    { id: 1, name: 'Juan Pérez', email: 'juan@email.com', age: 28, status: 'Activo', department: 'Ventas', salary: 45000 },
    { id: 2, name: 'María García', email: 'maria@email.com', age: 32, status: 'Inactivo', department: 'Marketing', salary: 52000 },
    { id: 3, name: 'Carlos López', email: 'carlos@email.com', age: 25, status: 'Activo', department: 'IT', salary: 48000 },
    { id: 4, name: 'Ana Martínez', email: 'ana@email.com', age: 30, status: 'Activo', department: 'RH', salary: 42000 },
    { id: 5, name: 'Pedro Sánchez', email: 'pedro@email.com', age: 35, status: 'Inactivo', department: 'Finanzas', salary: 55000 },
  ];

  const columns: Column<User>[] = [
    {
      key: 'id',
      header: 'ID',
      sortable: true,
      width: '80px',
      align: 'center'
    },
    {
      key: 'name',
      header: 'Nombre Completo',
      sortable: true,
      render: (value, row) => (
        <div className="user-info">
          <div className="user-name">{value}</div>
          <div className="user-email">{row.email}</div>
        </div>
      )
    },
    {
      key: 'age',
      header: 'Edad',
      sortable: true,
      align: 'center',
      width: '100px'
    },
    {
      key: 'department',
      header: 'Departamento',
      sortable: true
    },
    {
      key: 'salary',
      header: 'Salario',
      sortable: true,
      align: 'right',
      render: (value) => `$${value.toLocaleString()}`
    },
    {
      key: 'status',
      header: 'Estado',
      sortable: true,
      align: 'center',
      render: (value) => (
        <span className={`status-badge ${value.toLowerCase()}`}>
          {value}
        </span>
      )
    },
  ];

  const toolbarActions: ToolbarAction[] = [
    {
      label: 'Exportar CSV',
      icon: '📥',
      onClick: () => console.log('Exportando CSV...'),
      variant: 'primary'
    },
    {
      label: 'Eliminar',
      icon: '🗑️',
      onClick: () => console.log('Eliminando...'),
      variant: 'danger',
      disabled: false
    }
  ];

  const handleRowClick = (row: User, index: number) => {
    console.log('Fila clickeada:', row);
    alert(`Usuario seleccionado: ${row.name}`);
  };

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    console.log(`Ordenando por ${key} en dirección ${direction}`);
  };

  return (
    <>
      <h1>Sistema de Gestión de Usuarios</h1>
      <DataTable<User>
        columns={columns}
        data={users}
        selectable={true}
        pagination={true}
        searchable={true}
        pageSize={5}
        striped={true}
        hoverable={true}
        onRowClick={handleRowClick}
        onSort={handleSort}
        toolbarActions={toolbarActions}
        emptyMessage="No se encontraron usuarios"
        className="users-table"
      />
    </>
  )
}
