import React, { useState } from 'react'
import './DataTableComponent.css'
import RecordDetailsModal from '../Modals/RecordDetailsModal'
import ColumnSelectorModal from '../Modals/ColumnSelectorModal'
import RecaudosNotFound from '../../../assets/icons/RecaudosNoEncontrados.svg'
import { Info, Send } from 'lucide-react'
import { toast, Toaster } from 'sonner';
import { notificarRecaudo } from '../../../services/torreNotificacion'
import { CirculeDotLoader } from '../Loaders/ComponentLoader'

const DataTableNotificador = ({
    currentUsers,
    search,
    fechaInicial,
    fechaFinal,
    loadingAll,
    modalVisible,
    onModalVisible,
    loadAllData
}) => {
    const [selectedRecord, setSelectedRecord] = useState(null)
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false)
    const [isColumnModalVisible, setIsColumnModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const [loadingRows, setLoadingRows] = useState({});


    // Todas las columnas disponibles  de Columnas tabla
    const [visibleColumns, setVisibleColumns] = useState([
        'trpaDocu', 'trpaPyto', 'trpaNufa', 'trpaIdtr', 'trpaValo',
        'trpaPrre', 'trpaSere', 'trpaEnti', 'trpaFear'
    ])

    // Todas las columnas disponibles Configurador de Columnas
    const allColumns = [
        'trpaDocu', 'trpaPyto', 'trpaNufa', 'trpaIdtr', 'trpaValo',
        'trpaPrre', 'trpaSere', 'trpaEnti', 'trpaFear'
    ]

    //  const checkEmailInSystem = async (emailToCheck: string): Promise<boolean> => {
    const handleLogClick = async (record) => {
        // Usar el ID único del registro como clave
        const rowId = record.trnoCodi || record.trpaIdtr; // Ajusta según tu estructura
        setLoadingRows(prev => ({ ...prev, [rowId]: true }));
        try {
            console.log(record);
            // Tu lógica async aquí
            const notificador = await notificarRecaudo(record.trnoCome, record.trpaCodi);
            if (notificador.ok) {
                toast.success('Recaudo reenviado exitosamente');
                await loadAllData();
            } else {
                toast.error('Reenvio fallido');
            }

            // Simulación de delay
            // await new Promise(resolve => setTimeout(resolve, 1000));

        } catch (error) {
            toast.error('Reenvio fallido');
        } finally {
            setLoadingRows(prev => ({ ...prev, [rowId]: false }));
        }

    }

    const closeDetailsModal = () => {
        setIsDetailsModalVisible(false)
        setSelectedRecord(null)
    }

    const handleColumnsChange = (newVisibleColumns) => {
        setVisibleColumns(newVisibleColumns)
    }

    const getColumnLabel = (columnKey) => {
        const columnLabels = {
            'trpaDocu': 'Ref. principal',
            'trpaPyto': 'Numero Autorizacion',
            'trpaNufa': 'No. de factura',
            'trpaIdtr': 'ID de recaudo',
            'trpaValo': 'Valor',
            'trpaPrre': 'Ref. 1',
            'trpaSere': 'Ref. 2',
            'trpaEnti': 'Entidad',
            'trpaFear': 'Fecha de recaudo'
        }
        return columnLabels[columnKey] || columnKey
    }


    const renderCell = (user: any, columnKey: string) => {
        const value = user[columnKey];

        if (value === null || value === undefined || value === "") return "N/A";

        // FEAR → fecha + hora (24h)
        if (columnKey.includes("Fear")) {
            const fecha = new Date(value);

            if (isNaN(fecha.getTime())) return value;

            const dia = fecha.getDate().toString().padStart(2, "0");
            const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
            const anio = fecha.getFullYear();

            const horas = fecha.getHours().toString().padStart(2, "0");
            const minutos = fecha.getMinutes().toString().padStart(2, "0");

            return `${dia}/${mes}/${anio}, ${horas}:${minutos}`;
        }

        // Otras fechas (solo fecha)
        // if (columnKey.includes('Feve') || columnKey.includes('Fecr')) {
        //     try {
        //         return new Date(value).toLocaleDateString('es-ES')
        //     } catch {
        //         return value
        //     }
        // }

        // Valores monetarios
        if (columnKey === "trpaValo") {
            return `$${Number(value).toLocaleString("es-ES")}`;
        }

        return String(value);
    };


    return (
        <>
            {/*  */}
            <div className='card'>
                <div className=''>
                    <div className='data-table-container'>
                        <table className='data-table'>

                            <thead className=''>
                                <tr className='rowHead'>
                                    {/* Columnas dinámicas */}
                                    {visibleColumns.map(columnKey => (
                                        <th key={columnKey} >
                                            {getColumnLabel(columnKey)}
                                        </th>
                                    ))}
                                    {/* Columnas fijas */}
                                    <th className='fixed-header-estado'>Intentos</th>
                                    <th className='fixed-header-logs'>Notificar</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentUsers.map((user, index) => (
                                    <tr key={user.id || index}>
                                        {/* Columnas dinámicas */}
                                        {visibleColumns.map(columnKey => (
                                            <td key={columnKey}>
                                                {renderCell(user, columnKey)}
                                            </td>
                                        ))}
                                        {/* Columnas fijas */}
                                        <td className='fixed-column-estado'>
                                            <button
                                                title={`${user.trnoInte} intento fallido`}
                                                className="intentosNotificador">
                                                <div className='flex flex-row gap-1.5 items-center justify-center'>
                                                    <Info size={18} />
                                                    {user.trnoInte}
                                                </div>
                                            </button>
                                        </td>
                                        <td className='fixed-column-logs'>
                                            <button
                                                className="cursor-pointer"
                                                title="Reenviar al ERP"
                                                onClick={() => handleLogClick(user)}
                                                disabled={loadingRows[user.trnoCodi] || false}
                                            >
                                                {
                                                    loadingRows[user.trnoCodi] ? <CirculeDotLoader /> : <Send size={18} />
                                                }
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {currentUsers.length === 0 && !loadingAll && (
                        <div className='text-center py-4'>
                            <p className='text-muted'>
                                {search || fechaInicial || fechaFinal ?
                                    (
                                        <div className='flex flex-col justify-center items-center'>
                                            <div>
                                                <img src={RecaudosNotFound} alt="" />
                                            </div>

                                            <h2 className='tituloState'>No se encontraron recaudos</h2>
                                            <h6 className='detalleState'>No hay registros que coincidan con los filtros aplicados.  Ajusta los criterios de búsqueda o  rango de fechas e inténtalo nuevamente.</h6>
                                        </div>
                                    ) :
                                    // 'No se encontraron resultados para los filtros aplicados' :
                                    'No hay datos disponibles'
                                }
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de detalles */}
            <RecordDetailsModal
                record={selectedRecord}
                isVisible={isDetailsModalVisible}
                onClose={closeDetailsModal}
            />

            {/* Modal de configuración de columnas */}
            <ColumnSelectorModal
                // isVisible={isColumnModalVisible}
                isVisible={modalVisible}
                // onClose={() => setIsColumnModalVisible(false)} 
                onClose={() => onModalVisible(false)}
                availableColumns={allColumns}
                visibleColumns={visibleColumns}
                onColumnsChange={handleColumnsChange}
            />
        </>
    )
}

export default DataTableNotificador