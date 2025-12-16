import React, { useState, useEffect } from 'react'
import './ColumnSelectorModal.css'

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
            'id': 'ID',
            'trpaCodi': 'Código',
            'trpaDocu': 'Documento',
            'trpaNufa': 'Núm. Factura',
            'trpaPyto': 'Proyecto',
            'trpaNuau': 'Núm. Autorización',
            'trpaNuuf': 'Núm. UF',
            'trpaIdtr': 'ID Transacción',
            'trpaDesc': 'Descripción',
            'trpaCome': 'Comercio',
            'trpaEsta': 'Código Estado',
            'estaNomb': 'Estado',
            'trpaValo': 'Valor',
            'trpaPrre': 'Referencia Pago',
            'trpaSere': 'Serial Recaudo',
            'trpaTere': 'Tipo Recaudo',
            'trpaCure': 'Cuenta Recaudo',
            'trpaPure': 'Punto Recaudo',
            'pureDesc': 'Desc. Punto Recaudo',
            'trpaEnti': 'Entidad',
            'convNuco': 'Convenio',
            'trpaFeve': 'Fecha Vencimiento',
            'trpaFear': 'Fecha Aprobación',
            'trpaFecr': 'Fecha Creación',
            'mepaDesc': 'Desc. Medio Pago',
            'mepaTipo': 'Tipo Medio Pago',
            'sociNomb': 'Nombre Socio',
            'trpaBanc': 'Banco',
            'careNomb': 'Nombre Caja',
            'estaNoti': 'Notificación Estado'
        }
        return columnLabels[columnKey] || columnKey
    }

    if (!isVisible) return null

    return (
        <>
            <div className="modal-backdrop column-selector-backdrop" onClick={onClose} />
            
            <div className="column-selector-modal">
                <div className="modal-header">
                    <h5 className="modal-title">
                        ⚙️ Configurar Columnas Visibles
                    </h5>
                    <button 
                        type="button" 
                        className="btn-close" 
                        onClick={onClose}
                        aria-label="Cerrar"
                    />
                </div>
                
                <div className="modal-body">
                    <div className="selection-actions">
                        <button 
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
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-outline-warning btn-sm"
                            onClick={handleReset}
                        >
                            Restablecer
                        </button>
                    </div>

                    <div className="columns-counter">
                        <small className="text-muted">
                            {selectedColumns.length} de {availableColumns.length} columnas seleccionadas
                        </small>
                    </div>

                    <div className="columns-grid">
                        {availableColumns.map(columnKey => (
                            <div key={columnKey} className="column-item">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`column-${columnKey}`}
                                        checked={selectedColumns.includes(columnKey)}
                                        onChange={() => handleColumnToggle(columnKey)}
                                    />
                                    <label 
                                        className="form-check-label"
                                        htmlFor={`column-${columnKey}`}
                                    >
                                        {getColumnLabel(columnKey)}
                                    </label>
                                </div>
                                <span className="column-key">{columnKey}</span>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="modal-footer">
                    <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={handleSave}
                        disabled={selectedColumns.length === 0}
                    >
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </>
    )
}

export default ColumnSelectorModal