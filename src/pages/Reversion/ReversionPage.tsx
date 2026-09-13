import { useEffect } from "react"
import { exportToCSV, exportToExcel } from "../../utils/exportUtils"
import Lottie from "lottie-react"
import { FiltersComponent } from "../../components/ui/Tabla/FiltersComponent"
import PaginationComponent from "../../components/ui/Tabla/PaginationComponent"
import Loading from '../../../src/assets/animations/loading.json'
import DataTableComponentCheque from "../../components/ui/Tabla/DataTableComponentCheque"
import { useDataTableReversion } from "../../hooks/useDataTableReversion"
import DataTableComponentReversion from "../../components/ui/Tabla/DataTableComponentReversion"


export const ReversionPage = () => {

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
  } = useDataTableReversion()

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
        <h1 className='tituloVisor'>Reversiones</h1>
        <p className='parrafoVisor'>Revisa las transacciones reversadas del sistema</p>
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
            <DataTableComponentReversion
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
