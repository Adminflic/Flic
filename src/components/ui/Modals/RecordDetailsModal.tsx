import React, { useCallback, useEffect, useState } from 'react'
import './RecordDetailsModal.css'
import { CodeViewer } from '../../CodeViewer'
import ComponentLoader, { TriangleDotLoader } from '../Loaders/ComponentLoader'
import Lottie from 'lottie-react'
import Loading from '../../../assets/animations/loading.json'
import { extraerLog, type LogsParam } from '../../../services/logsService'
import { ChevronDown, ChevronUp, CircleCheck } from 'lucide-react'


interface PagoLogData {
    TramaRequest?: string;
    TramaResponse?: string;
}

interface PagoLog {
    Properties?: {
        Data?: PagoLogData;
    };
}

interface LogsResponse {
    Pago?: PagoLog[];
}



const RecordDetailsModal = ({ record, isVisible, onClose }) => {

    const [logsPagoTramaRequest, setLogsPagoTramaRequest] = useState("");
    const [logsPagoTramaResponse, setLogsPagoTramaResponse] = useState("");
    const [logsPagoFechaInicial, setLogsPagoFechaInicial] = useState("");

    const [isLoading, setIsLodings] = useState(false);
    const [openData, setOpenData] = useState(false);



    //  const getLogs = useCallback(async () => {
    //     if (!record) return;

    //     setIsLodings(true);

    //     try {
    //         const params: LogsParam = {
    //             autorizacion: record.trpaIdtr,
    //             banco: record.trpaBanc,
    //             comercio: record.trpaCome,
    //             ref1: record.trpaDocu,
    //         };

    //         const response: LogsResponse = await extraerLog(params);

    //         const pago = response?.Pago?.[0];
    //         const data = pago?.Properties?.Data;

    //         if (!data) {
    //             console.warn('No se encontraron logs para el registro:', params);
    //             setLogsPagoTramaRequest('');
    //             setLogsPagoTramaResponse('');
    //             return;
    //         }

    //         setLogsPagoTramaRequest(data.TramaRequest ?? '');
    //         setLogsPagoTramaResponse(data.TramaResponse ?? '');

    //     } catch (error) {
    //         console.error('ERROR Generando logs:', error);
    //         setLogsPagoTramaRequest('');
    //         setLogsPagoTramaResponse('');
    //     } finally {
    //         setIsLodings(false);
    //     }
    // }, [record]);

    useEffect(() => {
        if (!isVisible || !record) return;

        getLogs();
        console.log(record);
    }, [isVisible, record,onClose]);



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

    const getLogs = async () => {
        if (!record) return;
        setLogsPagoTramaRequest("");
        setLogsPagoTramaResponse("");
        setLogsPagoFechaInicial("");
        try {
            setIsLodings(true);

            const datos: LogsParam = {
                autorizacion: record.trpaIdtr,
                banco: record.trpaBanc,
                comercio: record.trpaCome,
                ref1: record.trpaDocu,
            };

            const response = await extraerLog(datos);
            setLogsPagoTramaRequest(response.data.Pago[0].Properties.Data.TramaRequest);
            setLogsPagoTramaResponse(response.data.Pago[0].Properties.Data.TramaResponse);
            setLogsPagoFechaInicial(response.data.Pago[0].Properties.Data.FechaFinal);
            // console.log(`Data logs : ${JSON.stringify(response.data.Pago)}`);

        } catch (error) {
            console.error('ERROR Generando logs:', error);
        } finally {
            setIsLodings(false);
        }
    };

    const formatFecha = (fechaIso: string) => {
        console.log(fechaIso);
        const fecha = new Date(fechaIso);

        if (isNaN(fecha.getTime())) return "--";

        return new Intl.DateTimeFormat("es-ES", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        })
            .format(fecha)
            .replace(".", "")
            .toUpperCase();
    };




    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                onClick={onClose}
            />

            {/* Drawer sm:w-[420px] */}
            <div className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 flex flex-col shadow-xl">
                {/* Header  border-b*/}
                <div className="flex items-center justify-between px-5 py-4 ">
                    <div className='w-full'>
                        <div className='flex justify-between'>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Visor de Logs
                            </h2>

                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 text-xs cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <p className="text-sm text-gray-500">
                            Registro detallado de acciones
                        </p>
                    </div>


                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 mt-1">
                    {/* {Object.entries(record).map(([key, value]) => (
                        <div
                            key={key}
                            className="flex flex-col border rounded-lg px-3 py-2"
                        >
                            <span className="text-xs text-gray-500 font-medium">
                                {getFieldLabel(key)}
                            </span>
                            <span className="text-sm text-gray-800 break-words">
                                {formatValue(key, value)}
                            </span>
                        </div>
                    ))} */}

                    <div className='flex flex-col gap-2'>
                        <span className='textoTypePago'>Notificación de pago:</span>

                        <div className='flex flex-row gap-2.5'>

                            {/* items-center justify-center */}
                            <div className='flex w-fit  text-green-500'>
                                <span className='text-2xl'>●</span>
                            </div>

                            <div className='w-full'>
                                <p className='textBanco'>Del banco a Flic</p>
                                <p className='subTextoBanco'>{`Exitoso - Valor: $${Number(record.trpaValo).toLocaleString('es-ES')}`}</p>
                            </div>

                            <div className='w-40 subFechaBanco'>
                                {formatFecha(record.trpaFear)}
                            </div>
                        </div>
                    </div>

                    <div className='ContenedorFlicToErp'>

                        <div
                            onClick={() => { setOpenData(!openData) }}
                            className='flex flex-row w-full gap-1.5 cursor-pointer'
                        >
                            <div className='w-fit flex justify-center items-center'>
                                <CircleCheck size={16} className='text-green-600' />
                            </div>

                            <div className='flex flex-col w-full'>
                                <div className='flex detalleFlicErp'>
                                    <p className='textBanco'>De Flic al ERP</p>
                                    <span className='subFechaBanco'> {formatFecha(logsPagoFechaInicial ?? record.trpaFear)}</span>
                                </div>
                                <span className='subTextoBanco'>Notificada con éxito</span>
                            </div>

                            <button
                                className='flex justify-center items-center'
                            >
                                {
                                    openData ? (
                                        <ChevronUp size={16} />
                                    ) : (
                                        <ChevronDown size={16} />
                                    )
                                }
                            </button>
                        </div>

                        {
                            !logsPagoTramaRequest && (
                                <>
                                    <div className='errorMensaje'>
                                        <div className='w-full flex flex-row justify-between'>
                                            <span className='errorTitulo'>Error:</span>
                                            <span className='subFechaBanco'>{formatFecha(logsPagoFechaInicial ?? record.trpaFear)}</span>
                                        </div>
                                        <div className='textoMensaje'>
                                            Error de conexión: Tiempo de espera agotado al intentar conectar con el servicio ERP
                                        </div>
                                    </div>
                                </>
                            )
                        }

                        {
                            logsPagoTramaRequest && (
                                <>
                                    <div className='mt-3.5'>
                                        {
                                            record.trpaCome != 203 ? (
                                                <>
                                                    <div className='flex flex-col gap-5 p-4'>
                                                        <CodeViewer
                                                            title="RETRY REQUEST"
                                                            type="json"
                                                            content={logsPagoTramaRequest}
                                                        />

                                                        <CodeViewer
                                                            title="RETRY RESPONSE"
                                                            type="json"
                                                            // notiType='reve'
                                                            content={logsPagoTramaResponse}
                                                        />
                                                    </div>

                                                </>

                                            ) : (
                                                <>
                                                    <CodeViewer
                                                        title="RETRY REQUEST"
                                                        type="xml"
                                                        content={`${logsPagoTramaRequest}`}
                                                    />

                                                    <CodeViewer
                                                        title="RETRY RESPONSE"
                                                        type="xml"
                                                        content={`${logsPagoTramaResponse}`}
                                                    />
                                                </>
                                            )
                                        }
                                    </div>

                                </>
                            )
                        }


                        {/* <Lottie animationData={Loading}/> */}
                    </div>


                </div>





                {/* Footer */}
                {/* <div className="border-t px-5 py-3 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100"
                    >
                        Cerrar
                    </button>

                    <button
                        onClick={() => {
                            console.log("Registro:", record);
                        }}
                        className="px-4 py-2 rounded-md bg-violet-600 text-white hover:bg-violet-700"
                    >
                        Exportar
                    </button>
                </div> */}
            </div>
        </>
    )
}

export default RecordDetailsModal