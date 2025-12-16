import React from 'react'
import './RecordDetailsModal.css'

const RecordDetailsModal = ({ record, isVisible, onClose }) => {
    if (!isVisible || !record) return null

    const formatValue = (key, value) => {
        if (value === null || value === undefined || value === '') return 'N/A'
        
        // Formatear fechas
        if (key.includes('Fecha') || key.includes('fec') || key.includes('Fe')) {
            try {
                return new Date(value).toLocaleString('es-ES')
            } catch {
                return value
            }
        }
        
        // Formatear valores monetarios
        if (key.includes('Valor') || key.includes('valo') || key.includes('Monto')) {
            return `$${Number(value).toLocaleString('es-ES')}`
        }
        
        return String(value)
    }

    const getFieldLabel = (key) => {
        const fieldLabels = {
            'id': 'ID',
            'trpaCodi': 'Código Transacción',
            'trpaDocu': 'Documento',
            'trpaNufa': 'Número Factura',
            'trpaPyto': 'Proyecto',
            'trpaNuau': 'Número Autorización',
            'trpaNuuf': 'Número UF',
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
            'pureDesc': 'Descripción Punto Recaudo',
            'trpaEnti': 'Entidad',
            'convNuco': 'Convenio',
            'trpaFeve': 'Fecha Vencimiento',
            'trpaFear': 'Fecha Aprobación',
            'trpaFecr': 'Fecha Creación',
            'mepaDesc': 'Descripción Medio Pago',
            'mepaTipo': 'Tipo Medio Pago',
            'sociNomb': 'Nombre Socio',
            'trpaBanc': 'Banco',
            'careNomb': 'Nombre Caja',
            'estaNoti': 'Notificación Estado'
        }
        
        return fieldLabels[key] || key
    }

    return (
        <>
            {/* Fondo con blur */}
            <div className="modal-backdrop" onClick={onClose} />
            
            {/* Modal */}
            <div className="record-modal">
                <div className="modal-header">
                    <h5 className="modal-title">
                        📋 Detalles del Registro - ID: {record.id || 'N/A'}
                    </h5>
                    <button 
                        type="button" 
                        className="btn-close" 
                        onClick={onClose}
                        aria-label="Cerrar"
                    />
                </div>
                
                <div className="modal-body">
                    <div className="record-details-grid">
                        {Object.entries(record).map(([key, value]) => (
                            <div key={key} className="detail-item">
                                <label className="detail-label">
                                    {getFieldLabel(key)}:
                                </label>
                                <span className="detail-value">
                                    {formatValue(key, value)}
                                </span>
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
                        Cerrar
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={() => {
                            console.log('Registro completo:', record)
                            alert('Datos enviados a consola')
                        }}
                    >
                        Exportar Datos
                    </button>
                </div>
            </div>
        </>
    )
}

export default RecordDetailsModal