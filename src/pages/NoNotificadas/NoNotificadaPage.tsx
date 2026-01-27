import React, { useEffect } from 'react'
import { exportToCSV, exportToExcel } from '../../utils/exportUtils';
import PaginationComponent from '../../components/ui/Tabla/PaginationComponent';
import { FiltersComponent } from '../../components/ui/Tabla/FiltersComponent';
import Loading from '../../../src/assets/animations/loading.json'

import Lottie from 'lottie-react';
import { useDataTableNotificador } from '../../hooks/useDataTableNotificador';
import DataTableNotificador from '../../components/ui/Tabla/DataTableNotificador';
import { Info } from 'lucide-react';

export const NoNotificadaPage = () => {


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
    loadAllData,
  } = useDataTableNotificador()

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
    // setTotalRegistro(localStorage.getItem("totaNotificar")!)
  }, []);
  

  useEffect(() => {
    localStorage.setItem("totaNotificar",JSON.stringify(filteredUsers.length));
  }, [filteredUsers]);




  return (
    <div className=''>
      {/* Visor estático - sin scroll */}
      <div className='infoVisor flex-shrink-0'>
        <div className='flex flex-row gap-1.5 justify-center items-center'>
          <h1 className='tituloVisor'>No Notificadas</h1>
          <div className='advertenciaVisor'>
            <Info size={16} color='#F59E0B' />
            <p>{`${filteredUsers.length} recaudos no notificados`}</p>
          </div>
        </div>
        <p className='parrafoVisor'>Gestiona los recaudos pendientes de notificación al sistema</p>
      </div>

      {/* Loading inicial */}
      {loadingAll && (
        <div className='flex justify-center'>
          <Lottie animationData={Loading} className='w-fit h-fit' />
        </div>
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

            {/* Tabla */}
            <DataTableNotificador
              currentUsers={currentUsers}
              search={search}
              fechaInicial={fechaInicial}
              fechaFinal={fechaFinal}
              loadingAll={loadingAll}
              modalVisible={isDetailsModalVisible}
              onModalVisible={setIsDetailsModalVisible}
              loadAllData={loadAllData}
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
  );
};