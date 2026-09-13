import { useEffect } from "react"
import { useDataTableCheque } from "../../hooks/useDataTableCheque"
import { exportToCSV, exportToExcel } from "../../utils/exportUtils"
import Lottie from "lottie-react"
import { FiltersComponent } from "../../components/ui/Tabla/FiltersComponent"
import PaginationComponent from "../../components/ui/Tabla/PaginationComponent"
import Loading from '../../../src/assets/animations/loading.json'
import DataTableComponentCheque from "../../components/ui/Tabla/DataTableComponentCheque"

export const ChequePage = () => {

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
    onfilter,
    setOnfilter,
  } = useDataTableCheque()

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

      <div className='infoVisor  flex-shrink-0'>
        <h1 className='tituloVisor'>Cheques</h1>
        <p className='parrafoVisor'>Administra los pagos realizados mediante cheques</p>
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
              onfilter={onfilter}
              setOnfilter={setOnfilter}
            />

            {/* Tabla */}
            <DataTableComponentCheque
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
}
