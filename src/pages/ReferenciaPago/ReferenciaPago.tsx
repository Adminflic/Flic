import { useEffect } from "react"
import { useDataTableRefPago } from "../../hooks/useDataTableRefPago"
import { exportToCSV, exportToExcel } from "../../utils/exportUtils"
import { Info } from "lucide-react"
import Lottie from "lottie-react"
import { FiltersComponent } from "../../components/ui/Tabla/FiltersComponent"
import PaginationComponent from "../../components/ui/Tabla/PaginationComponent"
import Loading from '../../../src/assets/animations/loading.json'
import DataTableRefBancaria from "../../components/ui/Tabla/DataTableRefBancaria"

export const ReferenciaPago = () => {

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
    loadingRows,
    setLoadingRows,
    loadingRefBanc,
    handleRefBancClick
  } = useDataTableRefPago()

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
    // localStorage.setItem("totaNotificar", JSON.stringify(filteredUsers.length));
  }, [filteredUsers]);


  return (
    <div className=''>
      {/* Visor estático - sin scroll */}
      <div className='infoVisor flex-shrink-0'>
        <div className='flex flex-row gap-1.5 justify-center items-center'>
          <h1 className='tituloVisor'>Referencia de Pago</h1>
          {/* <div className='advertenciaVisor'>
            <Info size={16} color='#F59E0B' />
            <p>{`${filteredUsers.length} recaudos no notificados`}</p>
          </div> */}
        </div>
        <p className='parrafoVisor'>Consulta las referencias de pago asociadas a cada placa</p>
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
              isConfigColumna={false}
              loadingRefBanc={loadingRefBanc}
              handleRefBancClick={handleRefBancClick}
            />

            {/* Tabla */}
            <DataTableRefBancaria
              currentUsers={currentUsers}
              search={search}
              fechaInicial={fechaInicial}
              fechaFinal={fechaFinal}
              loadingAll={loadingAll}
              modalVisible={isDetailsModalVisible}
              onModalVisible={setIsDetailsModalVisible}
              loadAllData={loadAllData}
              loadingRows={loadingRows}
              setLoadingRows={setLoadingRows}
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
}
