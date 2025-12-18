import { Calendar, ChevronDown, ChevronUp, Columns3Cog, Download, FileDown, Funnel, Search, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'sonner';

import './Filter.css';

export const FiltersComponent = ({
    fechaInicial,
    setFechaInicial,
    fechaFinal,
    setFechaFinal,
    search,
    setSearch,
    selectedField,
    setSelectedField,
    searchOptions,
    loadingAll,
    onClearFilters,
    onExportCSV,
    onExportExcel,
    allUsers,
    setIsDetailsModalVisible
}) => {

    const [onfilter, setOnfilter] = useState(false);
    const [onExport, setOnExport] = useState(false);

    const handleFechaFinalChange = (e) => {
        const nuevaFechaFinal = e.target.value
        setFechaFinal(nuevaFechaFinal)

        // Validar que fecha final no sea menor que fecha inicial
        if (fechaInicial && nuevaFechaFinal && nuevaFechaFinal < fechaInicial) {
            // alert('La fecha final no puede ser menor que la fecha inicial')
            toast.error('La fecha final no puede ser menor a la fecha inicial');
            setFechaFinal("")
            return
        }
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleFieldChange = (e) => {
        setSelectedField(e.target.value)
    }

   

    return (

        <>
            <div className='m-5'>

                <div className=''>
                    <div className='flex justify-between'>
                        <div className='flex gap-0.5 justify-center content-center buttonFilter' onClick={() => setOnfilter(!onfilter)}>
                            <Funnel size={18} className='text-purple-900' />
                            <h5 className=''>Filtros</h5>
                            {
                                onfilter ?
                                    <ChevronDown size={18} />
                                    :
                                    <ChevronUp size={18} />
                            }
                        </div>

                        <div className='flex gap-1.5'>
                            <button
                                className='buttonLine'
                                onClick={() => setIsDetailsModalVisible(true)}
                                title="Configurar columnas visibles"
                            >
                                <Columns3Cog size={18} />
                                Configurar columnas
                            </button>


                            <button className='buttonLine' onClick={() => { setOnExport(!onExport) }}>
                                <FileDown size={18} />
                                Exportar
                            </button>

                        </div>
                    </div>


                    {/* Filtro */}
                    {onfilter && (
                        <>
                            <div className='flex mt-10 gap-5'>
                                {/* Fechas */}
                                <div className='flex justify-center items-center gap-2.5'>
                                    <div className='flex flex-col '>
                                        <label className=''>Fecha desde <b className='text-red-600'>*</b></label>
                                        <div className='inputDate'>
                                            <Calendar size={18} />
                                            <input
                                                type='date'
                                                value={fechaInicial}
                                                onChange={(e) => setFechaInicial(e.target.value)}
                                                className=''
                                                placeholder='d/mm/aaaa'
                                            />
                                        </div>

                                    </div>

                                    <div className='flex flex-col '>
                                        <label className=''>Fecha hasta <b className='text-red-600'>*</b></label>
                                        <div className='inputDate'>
                                            <Calendar size={18} />
                                            <input
                                                type='date'
                                                value={fechaFinal}
                                                onChange={handleFechaFinalChange}
                                                className=''
                                                placeholder='dd/mm/aaaa'
                                            />
                                        </div>

                                    </div>
                                </div>

                                <div className='barraDivisor '></div>

                                {/* Búsqueda */}
                                <div className='flex  items-center gap-2.5 w-full'>

                                    <div className='flex flex-col'>
                                        <p>Buscar en</p>
                                        <div className="flex h-9 items-center justify-between px-3 py-0 relative bg-[#f3f3f5] rounded-lg border border-solid border-transparent">
                                            <select
                                                value={selectedField}
                                                onChange={handleFieldChange}
                                                className="relative w-fit mt-[-1.00px] [font-family:'Manrope-Regular',Helvetica] font-normal text-[#313a4e] text-sm tracking-[0] leading-5 whitespace-nowrap">
                                                <option value="todas">Todas las columnas</option>
                                                {searchOptions.map((type) => (
                                                    <option key={type.value} value={type.value}>
                                                        {type.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>



                                    <div className='flex flex-col w-full'>
                                        <p>Término de búsqueda</p>
                                        <div className="flex flex-row 
                                         h-9 items-center pl-2 
                                        pr-3 py-1 relative bg-[#f3f3f5] 
                                        rounded-lg overflow-hidden border border-solid border-[#e1e1e1] gap-1.5">

                                            <Search size={18} />

                                            <input
                                                value={search}
                                                onChange={handleSearchChange}
                                                type="text"
                                                placeholder={fechaInicial || fechaFinal ? 'Buscar...' : 'Selecciona un rango de fechas primero'}
                                                className="relative w-full [font-family:'Manrope-Regular',Helvetica] 
                                                font-normal text-[#717182] text-sm tracking-[0] leading-[normal] h-2/3 outline-none"
                                                disabled={!fechaInicial && !fechaFinal}
                                            />

                                        </div>
                                    </div>

                                    {
                                        selectedField != 'todas' && (
                                            <div className='flex flex-row bg-amber-300 w-52 justify-center mt-6 items-center selectFiltro'>
                                                1 activo
                                            </div>
                                        )
                                    }

                                    {
                                        search && (
                                            <div className='flex flex-row justify-center items-center w-35  mt-5'>
                                                <X />
                                                <button
                                                    onClick={onClearFilters}
                                                    disabled={loadingAll || (!fechaInicial && !fechaFinal)}
                                                    className='w-30'
                                                >
                                                    Limpiar Filtros
                                                </button>
                                            </div>
                                        )
                                    }

                                </div>



                            </div>
                        </>
                    )}

                </div>
            </div>

            {
                onExport && (
                    <>
                        <div className='absolute top-68 right-6 border-1 border-gray-400 rounded-lg bg-white'>
                            <div className="flex flex-col p-3 justify-center">
                                <button
                                    onClick={onExportCSV}
                                    disabled={allUsers.length === 0 || loadingAll}
                                    className='flex gap-2.5 items-center text-center p-2.5 exportHover'
                                >
                                    <FileDown size={18} className='text-gray-600' />
                                    Exportar CSV
                                </button>
                                <button
                                    onClick={onExportExcel}
                                    disabled={allUsers.length === 0 || loadingAll}
                                    className='flex gap-2.5 items-center text-center p-2.5 exportHover'
                                >
                                    <FileDown size={18} className='text-gray-600' />
                                    Exportar Excel
                                </button>
                            </div>
                        </div>
                    </>
                )
            }


        </>

    )
}

