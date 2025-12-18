import React, { useState, useEffect } from 'react'
import './ColumnSelectorModal.css'
import { Check, Eye, EyeOff, RotateCcw, X } from 'lucide-react';

const ColumnSelectorModal = ({ isVisible, onClose, availableColumns, visibleColumns, onColumnsChange }) => {
    const [selectedColumns, setSelectedColumns] = useState([])

    useEffect(() => {
        if (isVisible) {
            setSelectedColumns([...visibleColumns])
        }
    }, [isVisible, visibleColumns])

    const handleColumnToggle = (columnKey) => {
        setSelectedColumns(prev => {
            if (prev.includes(columnKey)) {
                return prev.filter(col => col !== columnKey)
            } else {
                return [...prev, columnKey]
            }
        })
    }

    const handleSelectAll = () => {
        setSelectedColumns([...availableColumns])
    }

    const handleSelectNone = () => {
        setSelectedColumns([])
    }

    const handleSave = () => {
        onColumnsChange(selectedColumns)
        onClose()
    }

    const handleReset = () => {
        setSelectedColumns([...availableColumns])
    }

    const getColumnLabel = (columnKey) => {
        const columnLabels = {
            // 'id': 'ID',
            // 'trpaCodi': 'Código',
            // 'trpaDocu': 'Documento',
            // 'trpaNufa': 'Núm. Factura',
            // 'trpaPyto': 'Proyecto',
            // 'trpaNuau': 'Núm. Autorización',
            // 'trpaNuuf': 'Núm. UF',
            // 'trpaIdtr': 'ID Transacción',
            // 'trpaDesc': 'Descripción',
            // 'trpaCome': 'Comercio',
            // 'trpaEsta': 'Código Estado',
            // 'estaNomb': 'Estado',
            // 'trpaValo': 'Valor',
            // 'trpaPrre': 'Referencia Pago',
            // 'trpaSere': 'Serial Recaudo',
            // 'trpaTere': 'Tipo Recaudo',
            // 'trpaCure': 'Cuenta Recaudo',
            // 'trpaPure': 'Punto Recaudo',
            // 'pureDesc': 'Desc. Punto Recaudo',
            // 'trpaEnti': 'Entidad',
            // 'convNuco': 'Convenio',
            // 'trpaFeve': 'Fecha Vencimiento',
            // 'trpaFear': 'Fecha Aprobación',
            // 'trpaFecr': 'Fecha Creación',
            // 'mepaDesc': 'Desc. Medio Pago',
            // 'mepaTipo': 'Tipo Medio Pago',
            // 'sociNomb': 'Nombre Socio',
            // 'trpaBanc': 'Banco',
            // 'careNomb': 'Nombre Caja',
            // 'estaNoti': 'Notificación Estado'
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
        }
        return columnLabels[columnKey] || columnKey
    }

    if (!isVisible) return null

    return (
        <>
            <div className="modal-backdrop column-selector-backdrop" onClick={onClose} />

            <div className="column-selector-modal">
                <div className="modal-header">
                    <div className='flex flex-col gap-2.5'>
                        <h5 className="tituloOrden">Configurar Columnas</h5>
                        <p className='textoSecundario'>Personaliza qué columnas ver y en que orden. Arrastra para reordenar.</p>
                    </div>

                    <button
                        type="button"
                        className="btn-close"
                        onClick={onClose}
                        aria-label="Cerrar"
                    >
                        <X className='text-gray-400' size={16} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="flex flex-row justify-between mb-4">
                        {/* <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={handleSelectAll}
                        >
                            Seleccionar Todas
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={handleSelectNone}
                        >
                            Deseleccionar Todas
                        </button> */}
                        <span className='text-gray-400 font-semibold text-sm'>{selectedColumns.length} de {availableColumns.length} columnas seleccionadas</span>
                        <button
                            type="button"
                            className="flex flex-row justify-center items-center gap-2
                             text-gray-400 font-semibold text-sm"
                            onClick={handleReset}
                        >
                            <RotateCcw size={17} />
                            <span>Restablecer</span>
                        </button>
                    </div>

                    {/* <div className="columns-counter">
                        <small className="text-muted">
                            {selectedColumns.length} de {availableColumns.length} columnas seleccionadas
                        </small>
                    </div> */}

                    <div className="columns-grid">
                        {availableColumns.map(columnKey => (
                            <div key={columnKey} className="column-item" onClick={() => handleColumnToggle(columnKey)}>
                                <div className="form-check ">

                                    {/* Checkbox */}
                                    <label className="flex items-center gap-2 cursor-pointer select-none mr-2.5">
                                        <div
                                            id={`column-${columnKey}`}
                                            className={`
                                                w-5 h-5 rounded-md flex items-center justify-center border
                                                transition-all duration-200
                                                ${selectedColumns.includes(columnKey) ? "bg-purple-800 border-purple-800" : "bg-white border-gray-300"}
                                            `}
                                        >
                                            {selectedColumns.includes(columnKey) && <Check className="w-4 h-4 text-white" />}
                                        </div>
                                    </label>


                                    {/* <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`column-${columnKey}`}
                                        checked={selectedColumns.includes(columnKey)}
                                        onChange={() => handleColumnToggle(columnKey)}
                                    /> */}
                                    <label
                                        className="form-check-label"
                                        htmlFor={`column-${columnKey}`}
                                    >
                                        {getColumnLabel(columnKey)}
                                    </label>

                                    <div>
                                        {
                                            selectedColumns.includes(columnKey) ?
                                                (
                                                    <Eye size={18} className='text-purple-800' />
                                                )
                                                :
                                                (

                                                    <EyeOff size={18} className='text-gray-600' />
                                                )
                                        }
                                    </div>
                                </div>
                                {/* <span className="column-key">{columnKey}</span> */}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="modal-footer">
                    <button
                        type="button"
                        className="btnCancelar cursor-pointer"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        className="btnAplicar cursor-pointer"
                        onClick={handleSave}
                        disabled={selectedColumns.length === 0}
                    >
                        Aplicar cambios
                    </button>
                </div>
            </div>
        </>
    )
}

export default ColumnSelectorModal