import React, { useState } from 'react'
import './DataTableComponent.css'
import RecordDetailsModal from '../Modals/RecordDetailsModal'
import ColumnSelectorModal from '../Modals/ColumnSelectorModal'
import RecaudosNotFound from '../../../assets/icons/RecaudosNoEncontrados.svg'
import { History } from 'lucide-react'

const DataTableComponent = ({
    currentUsers,
    search,
    fechaInicial,
    fechaFinal,
    loadingAll,
    modalVisible,
    onModalVisible
}) => {
    const [selectedRecord, setSelectedRecord] = useState(null)
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false)
    const [isColumnModalVisible, setIsColumnModalVisible] = useState(false)

    const [visibleColumns, setVisibleColumns] = useState([
        'sociNomb', 'trpaIdtr', 'trpaPyto', 'trpaValo', 'trpaNufa',
        'trpaDocu', 'trpaPrre', 'trpaSere', 'trpaTere', 'trpaCure',
        'careNomb', 'mepaDesc', 'trpaEnti', 'convNuco', 'trpaFear',
        'trpaFecr', 'pureDesc'
    ])

    // Todas las columnas disponibles
    const allColumns = [
        // 'id', 'trpaCodi', 'trpaDocu', 'trpaNufa', 'trpaPyto',
        // 'trpaNuau', 'trpaNuuf', 'trpaIdtr', 'trpaDesc', 'trpaCome',
        // 'trpaEsta', 'estaNomb', 'trpaValo', 'trpaPrre', 'trpaSere',
        // 'trpaTere', 'trpaCure', 'trpaPure', 'pureDesc', 'trpaEnti',
        // 'convNuco', 'trpaFeve', 'trpaFear', 'trpaFecr', 'mepaDesc',
        // 'mepaTipo', 'sociNomb', 'trpaBanc', 'careNomb', 'estaNoti'

        'sociNomb', 'trpaIdtr', 'trpaPyto', 'trpaValo', 'trpaNufa',
        'trpaDocu', 'trpaPrre', 'trpaSere', 'trpaTere', 'trpaCure',
        'careNomb', 'mepaDesc', 'trpaEnti', 'convNuco', 'trpaFear',
        'trpaFecr', 'pureDesc'
    ]

    const handleLogClick = (record) => {
        setSelectedRecord(record)
        setIsDetailsModalVisible(true)
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
            'sociNomb': 'Sociedad',
            'trpaIdtr': 'ID de recaudo',
            'trpaPyto': 'No. de autorizacion',
            'trpaValo': 'Valor',
            'trpaNufa': 'No. de factura',
            'trpaDocu': 'Ref. principal',
            'trpaPrre': 'Ref. 1',
            'trpaSere': 'Ref. 2',
            'trpaTere': 'Ref. 3',
            'trpaCure': 'Ref. 4',
            'careNomb': 'Tipo de recaudo',
            'mepaDesc': 'Medio de pago',
            'trpaEnti': 'Entidad',
            'convNuco': 'Convenio',
            // Cuenta destino
            // Ubicación
            'trpaFear': 'Fecha de recaudo',
            'trpaFecr': 'Fecha de creación',
            'pureDesc': 'Canal de recaudo',


            // 'trpaPure': 'Canal ',
            // 'id': 'ID',
            // 'trpaCodi': 'Código',
            // 'trpaNuau': 'Núm. Autorización',
            // 'trpaNuuf': 'Núm. UF',
            // 'trpaDesc': 'Descripción',
            // 'trpaCome': 'Comercio',
            // 'trpaEsta': 'Código Estado',
            // 'estaNomb': 'Estado',
            // 'trpaFeve': 'Fecha Vencimiento',
            // 'mepaTipo': 'Tipo Medio Pago',
            // 'trpaBanc': 'Banco',
            // 'estaNoti': 'Notificación Estado'
        }
        return columnLabels[columnKey] || columnKey
    }

    // const renderCell = (user, columnKey) => {
    //     const value = user[columnKey]

    //     if (value === null || value === undefined || value === '') return 'N/A'

    //     // Formatear fechas  || columnKey.includes('Fear')
    //     if (columnKey.includes('Feve') || columnKey.includes('Fecr')) {
    //         try {
    //             return new Date(value).toLocaleDateString('es-ES')
    //         } catch {
    //             return value
    //         }
    //     }

    //     // Formatear valores monetarios
    //     if (columnKey === 'trpaValo') {
    //         return `$${Number(value).toLocaleString('es-ES')}`
    //     }

    //     return String(value)
    // }

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
        if (columnKey.includes('Feve') || columnKey.includes('Fecr')) {
            try {
                return new Date(value).toLocaleDateString('es-ES')
            } catch {
                return value
            }
        }

        // Valores monetarios
        if (columnKey === "trpaValo") {
            return `$${Number(value).toLocaleString("es-ES")}`;
        }

        return String(value);
    };


    return (
        <>
            <div className='card'>
                {/* <div className='card-header bg-light d-flex justify-content-between align-items-center'>
                    <h6 className='mb-0'>Lista de Transacciones</h6>
                    <button 
                        className='btn btn-outline-primary btn-sm'
                        onClick={() => setIsColumnModalVisible(true)}
                        title="Configurar columnas visibles"
                    >
                        ⚙️ Configurar Columnas
                    </button>
                </div> */}
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
                                    <th className='fixed-header-estado'>Estado</th>
                                    <th className='fixed-header-logs'>Logs</th>
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
                                                title={`${user.estaNomb === 'Aprobada' ? 'Aprobada' : user.estaNomb === 'Rechazada' ? 'Rechazada' : 'No Notificada'}`}
                                                className={`text-xl ${user.estaNomb === 'Aprobada' ? 'text-green-600' : user.estaNomb === 'Rechazada' ? 'text-red-600' : 'text-[--Color-semantico-naranja]'}`}>
                                                ●
                                                {/* {user.estaNomb || 'N/A'} */}
                                            </button>
                                        </td>
                                        <td className='fixed-column-logs'>
                                            <button
                                                className={`text-xl ${user.estaNomb === 'Aprobada' ? 'text-[#5B21B6]' : user.estaNomb === 'Rechazada' ? 'text-[#5B21B6]' : 'text-[--Color-semantico-naranja]'}`}
                                                title="Ver detalles completos"
                                                onClick={() => handleLogClick(user)}
                                            >
                                                <History size={18} />
                                            </button>

                                            {/* <div className="relative group inline-flex">
                                                <button
                                                    className={`text-xl
                                                            ${user.estaNomb === "Aprobada"
                                                            ? "text-green-600"
                                                            : user.estaNomb === "Rechazada"
                                                                ? "text-red-600"
                                                                : "text-orange-600"
                                                        }`}
                                                    onClick={() => handleLogClick(user)}
                                                >
                                                    <History size={18} />
                                                </button>

                                                Tooltip
                                                <div
                                                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                                                                whitespace-nowrap px-3 py-1.5 rounded-md
                                                                bg-gray-900 text-white text-xs
                                                                opacity-0 group-hover:opacity-100
                                                                transition pointer-events-none shadow-lg"
                                                >
                                                    Ver detalles completos
                                                </div>
                                            </div> */}

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

export default DataTableComponent