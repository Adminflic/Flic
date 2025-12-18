// import DataTable from "../../components/ui/Table/DataTable"
// import type { Column, ToolbarAction } from "../../types/types";


// interface User {
//   id: number;
//   name: string;
//   email: string;
//   age: number;
//   status: 'Activo' | 'Inactivo';
//   department: string;
//   salary: number;
// }


// export const RecaudoPage = () => {

//   // Datos de ejemplo
//   const users: User[] = [
//     { id: 1, name: 'Juan Pérez', email: 'juan@email.com', age: 28, status: 'Activo', department: 'Ventas', salary: 45000 },
//     { id: 2, name: 'María García', email: 'maria@email.com', age: 32, status: 'Inactivo', department: 'Marketing', salary: 52000 },
//     { id: 3, name: 'Carlos López', email: 'carlos@email.com', age: 25, status: 'Activo', department: 'IT', salary: 48000 },
//     { id: 4, name: 'Ana Martínez', email: 'ana@email.com', age: 30, status: 'Activo', department: 'RH', salary: 42000 },
//     { id: 5, name: 'Pedro Sánchez', email: 'pedro@email.com', age: 35, status: 'Inactivo', department: 'Finanzas', salary: 55000 },
//   ];

//   const columns: Column<User>[] = [
//     {
//       key: 'id',
//       header: 'ID',
//       sortable: true,
//       width: '80px',
//       align: 'center'
//     },
//     {
//       key: 'name',
//       header: 'Nombre Completo',
//       sortable: true,
//       render: (value, row) => (
//         <div className="user-info">
//           <div className="user-name">{value}</div>
//           <div className="user-email">{row.email}</div>
//         </div>
//       )
//     },
//     {
//       key: 'age',
//       header: 'Edad',
//       sortable: true,
//       align: 'center',
//       width: '100px'
//     },
//     {
//       key: 'department',
//       header: 'Departamento',
//       sortable: true
//     },
//     {
//       key: 'salary',
//       header: 'Salario',
//       sortable: true,
//       align: 'right',
//       render: (value) => `$${value.toLocaleString()}`
//     },
//     {
//       key: 'status',
//       header: 'Estado',
//       sortable: true,
//       align: 'center',
//       render: (value) => (
//         <span className={`status-badge ${value.toLowerCase()}`}>
//           {value}
//         </span>
//       )
//     },
//   ];

//   const toolbarActions: ToolbarAction[] = [
//     {
//       label: 'Exportar CSV',
//       icon: '📥',
//       onClick: () => console.log('Exportando CSV...'),
//       variant: 'primary'
//     },
//     {
//       label: 'Eliminar',
//       icon: '🗑️',
//       onClick: () => console.log('Eliminando...'),
//       variant: 'danger',
//       disabled: false
//     }
//   ];

//   const handleRowClick = (row: User, index: number) => {
//     console.log('Fila clickeada:', row);
//     alert(`Usuario seleccionado: ${row.name}`);
//   };

//   const handleSort = (key: string, direction: 'asc' | 'desc') => {
//     console.log(`Ordenando por ${key} en dirección ${direction}`);
//   };

//   return (
//     <>
//       <h1>Sistema de Gestión de Usuarios</h1>
//       <DataTable<User>
//         columns={columns}
//         data={users}
//         selectable={true}
//         pagination={true}
//         searchable={true}
//         pageSize={5}
//         striped={true}
//         hoverable={true}
//         onRowClick={handleRowClick}
//         onSort={handleSort}
//         toolbarActions={toolbarActions}
//         emptyMessage="No se encontraron usuarios"
//         className="users-table"
//       />
//     </>
//   )
// }


//NUEVO

import React, { useEffect } from 'react';
import { useDataTable } from '../../hooks/useDataTable';
import { exportToCSV, exportToExcel } from '../../utils/exportUtils';
import { FiltersComponent } from '../../components/ui/Tabla/FiltersComponent';
import DataTableComponent from '../../components/ui/Tabla/DataTableComponent';
import PaginationComponent from '../../components/ui/Tabla/PaginationComponent';
import Loading from '../../../src/assets/animations/loading.json'

import './RecaudosPage.css';
import Lottie from 'lottie-react';

const RecaudoPage = () => {
    const {
        allUsers,
        allExport,
        filteredUsers,
        filteredExport,
        currentUsers,
        search,
        setSearch,
        searchOptions,
        selectedField,
        setSelectedField,
        currentPage,
        totalPages,
        loadingAll,
        fechaInicial,
        setFechaInicial,
        fechaFinal,
        setFechaFinal,
        loadPage,
        limpiarFiltrosFecha,
        isDetailsModalVisible,
        setIsDetailsModalVisible,
    } = useDataTable()

    // Handlers de exportación
    const handleExportCSV = () => {
        // const dataToExport = search || fechaInicial || fechaFinal ? filteredUsers : allUsers
        const dataToExport = search || fechaInicial || fechaFinal ? filteredExport : allExport

        exportToCSV(dataToExport)
    }

    const handleExportExcel = () => {
        // const dataToExport = search || fechaInicial || fechaFinal ? filteredUsers : allUsers
        const dataToExport = search || fechaInicial || fechaFinal ? filteredExport : allExport
        exportToExcel(dataToExport)
    }

    useEffect(() => {
        const hoy = new Date();
        const yyyy = hoy.getFullYear();
        const mm = String(hoy.getMonth() + 1).padStart(2, "0");
        const dd = String(hoy.getDate()).padStart(2, "0");

        setFechaInicial(`${yyyy}-${mm}-${dd}`);
    }, []);

    return (
        <div className=''>

            <div className='infoRecaudos'>
                <h1 className='tituloRecaudo'>Recaudos</h1>
                <p className='parrafoRecaudo'>Visualiza y gestiona el registro completo de tus recaudos financieros</p>
            </div>
            {/* Loading inicial */}
            {loadingAll && (
                <div className='text-center py-5'>
                    <div className='spinner-border text-primary' role='status'>
                        <span className='visually-hidden'>Cargando datos...</span>
                    </div>
                    <p className='mt-2 text-muted'>Cargando datos... Esto puede tomar unos segundos</p>
                </div>

                //     <div className='flex justify-center'>
                //     <Lottie animationData={Loading} className='w-fit h-fit' />
                // </div>
            )}

            {/* Contenido principal */}
            {!loadingAll && (
                <>
                    <div>
                        {/* Filtros */}
                        <FiltersComponent
                            fechaInicial={fechaInicial}
                            setFechaInicial={setFechaInicial}
                            fechaFinal={fechaFinal}
                            setFechaFinal={setFechaFinal}
                            search={search}
                            setSearch={setSearch}
                            selectedField={selectedField}
                            setSelectedField={setSelectedField}
                            searchOptions={searchOptions}
                            loadingAll={loadingAll}
                            onClearFilters={limpiarFiltrosFecha}
                            onExportCSV={handleExportCSV}
                            onExportExcel={handleExportExcel}   
                            allUsers={allUsers}
                            setIsDetailsModalVisible={setIsDetailsModalVisible}
                        />

                        {/* Información de resultados */}
                        {/* <div className='mb-3'>
                        <small className='text-muted'>
                            {fechaInicial || fechaFinal ? (
                                <span>
                                    Filtrado por:
                                    {fechaInicial && ` Desde: ${fechaInicial}`}
                                    {fechaFinal && ` Hasta: ${fechaFinal}`}
                                    {search && ` | Búsqueda: "${search}" en ${selectedField === 'todas' ? 'todas las columnas' : selectedField}`}
                                    {` - ${filteredUsers.length} resultados (Página ${currentPage} de ${totalPages})`}
                                </span>
                            ) : (
                                search ?
                                    `Búsqueda: "${search}" en ${selectedField === 'todas' ? 'todas las columnas' : selectedField} - ${filteredUsers.length} resultados (Página ${currentPage} de ${totalPages})` :
                                    `Mostrando ${allUsers.length} registros (Página ${currentPage} de ${totalPages})`
                            )}
                        </small>
                    </div> */}

                        {/* Tabla */}
                        <DataTableComponent
                            currentUsers={currentUsers}
                            search={search}
                            fechaInicial={fechaInicial}
                            fechaFinal={fechaFinal}
                            loadingAll={loadingAll}
                            modalVisible={isDetailsModalVisible}
                            onModalVisible={setIsDetailsModalVisible}
                        />

                        {/* Paginación */}
                        {totalPages > 1 && (
                            <PaginationComponent
                                currentPage={currentPage}
                                totalPages={totalPages}
                                filteredUsers={filteredUsers}
                                onPageChange={loadPage}
                                loadingAll={loadingAll}
                            />
                        )}
                    </div>

                </>
            )}


        </div>
    )
};

export default RecaudoPage;