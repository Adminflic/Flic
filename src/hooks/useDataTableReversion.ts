import { useState, useEffect } from 'react';
import { numeroRecaudosNoNotificados } from '../services/torreNotificacion';

export const useDataTableReversion = () => {
    // Estados
    const [allUsers, setAllUsers] = useState([])
    const [allExport, setAllExport] = useState([])

    const [filteredUsers, setFilteredUsers] = useState([])
    const [filteredExport, setFilteredExport] = useState([])
    const [onfilter, setOnfilter] = useState(false);

    const [currentUsers, setCurrentUsers] = useState([])
    const [search, setSearch] = useState("")
    const [searchOptions, setSearchOptions] = useState([])
    const [selectedField, setSelectedField] = useState("todas")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalRegistros, setTotalRegistros] = useState(0)
    const [loadingAll, setLoadingAll] = useState(false)

    // Modales 
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false)

    // Estados para fechas
    const [fechaInicial, setFechaInicial] = useState("")
    const [fechaFinal, setFechaFinal] = useState("")

    const pageSize = 10

    const fieldLabels = {
        trreCodi: 'ID de Reverso',
        trpaIdtr: 'ID de recaudo',
        trpaDocu: "Ref. principal",
        trpaValo: "Valor",
        bancEnti: "Entidad"
    };

    // Función para construir la URL con parámetros opcionales

    const EXPORT_FIELDS = [
        { key: "trreCodi", label: "ID de Reverso" },
        { key: "trpaIdtr", label: "ID de recaudo" },
        { key: "trpaDocu", label: "Documento" },
        { key: "trpaValo", label: "Valor", format: "currency" },
        { key: "bancEnti", label: "Entidad" },
        { key: "trpaFear", label: "Fecha de recaudo", format: "date" },
        { key: "trreFere", label: "Fecha de reversion", format: "date" },
    ];

    const formatValue = (value, type) => {
        if (value === null || value === undefined) return "";

        switch (type) {
            case "currency":
                return `$${Number(value).toLocaleString("es-CO")}`;

            case "date":
                return new Date(value).toLocaleString("es-CO");

            default:
                return value;
        }
    };

    const mapDataForExport = (data) => {
        return data.map((item) => {
            const mappedItem = {};

            EXPORT_FIELDS.forEach(({ key, label, format }) => {
                mappedItem[label] = formatValue(item[key], format);
            });

            return mappedItem;
        });
    };


    const buildURL = (page) => {
        const comercioKey = localStorage.getItem('Comercio');

        const url = import.meta.env.VITE_API_BASE_URL_REVERSION;
        let URL = `${url}/${comercioKey}?pageNumber=${page}&pageSize=100`

        // Agregar parámetros de fecha solo si tienen valor
        if (fechaInicial) {
            URL += `&fechaInicial=${fechaInicial}`
        }
        if (fechaFinal) {
            URL += `&fechaFinal=${fechaFinal}`
        }

        return URL
    }

    const inicializarFecha = () => {
        const hoy = new Date();
        const yyyy = hoy.getFullYear();
        const mm = String(hoy.getMonth() + 1).padStart(2, "0");
        const dd = String(hoy.getDate()).padStart(2, "0");

        setFechaInicial(`${yyyy}-${mm}-${dd}`);
    }

    // Función para cargar TODOS los datos con filtros de fecha
    const loadAllData = async () => {
        setLoadingAll(true)
        try {
            let allData = []
            let allExportData = []
            let page = 1
            let hasMorePages = true

            // Cargar todas las páginas
            while (hasMorePages) {
                const URL = buildURL(page)
                // console.log('Cargando URL:', URL)

                const response = await fetch(URL)
                const data = await response.json()

                //Cantidad No notificadas
                const come = localStorage.getItem('Comercio');
                await numeroRecaudosNoNotificados(Number.parseInt(come!));

                // console.log(`Cargando página ${page}:`, data.data?.length, 'registros')

                if (data.data && data.data.length > 0) {
                    allData = [...allData, ...data.data]

                    allExportData = mapDataForExport(allData);
                    // console.log(`Dataexport - | ${JSON.stringify(allExportData)}`);

                    // Configurar opciones de búsqueda solo la primera vez
                    if (searchOptions.length === 0 && data.data.length > 0) {
                        const propiedades = Object.keys(data.data[0])
                        // console.log('object', { propiedades });

                        // const labeledFields = fields
                        //     .filter(f => propiedades.includes(f.key))
                        //     .map(f => ({
                        //         value: f.key,
                        //         label: f.label
                        //     }));

                        const options = Object.keys(fieldLabels)
                            .filter(key => propiedades.includes(key))
                            .map(key => ({
                                value: key,
                                label: fieldLabels[key]
                            }));


                        setSearchOptions(options)
                    }

                    // Verificar si hay más páginas
                    const totalRecords = data.totalRegistros || allData.length
                    const totalPages = Math.ceil(totalRecords / 100)
                    hasMorePages = page < totalPages && data.data.length === 100
                    page++

                    // Pequeña pausa para no saturar el servidor
                    await new Promise(resolve => setTimeout(resolve, 100))
                } else {
                    hasMorePages = false
                }
            }

            // setAllUsers(allData)
            // setAllExport(allExportData)
            // setFilteredUsers(allData)
            // setFilteredExport(allExportData)
            // setTotalRegistros(allData.length)
            // setTotalPages(Math.ceil(allData.length / pageSize))
            // updateCurrentUsers(allData, 1)

            setAllUsers(allData);
            setFilteredUsers(allData);
            setCurrentPage(1);
            setTotalPages(Math.ceil(allData.length / pageSize));
            updateCurrentUsers(allData, 1);


            // console.log('Todos los datos cargados:', allData.length, 'registros')

        } catch (error) {
            console.error("Error loading all data:", error)
        } finally {
            setLoadingAll(false)
        }
    }

    // Actualizar usuarios de la página actual
    const updateCurrentUsers = (users, page) => {
        const startIndex = (page - 1) * pageSize
        const endIndex = startIndex + pageSize
        setCurrentUsers(users.slice(startIndex, endIndex))
    }

    // Filtrar datos - CORREGIDO
    // const filterData = (searchTerm, field) => {
    //     if (!searchTerm.trim()) {
    //         // Si no hay término de búsqueda, mostrar todos los datos
    //         setFilteredUsers(allUsers)
    //         setTotalPages(Math.ceil(allUsers.length / pageSize))
    //         setCurrentPage(1)
    //         updateCurrentUsers(allUsers, 1)
    //         return
    //     }

    //     const filtered = allUsers.filter((user) => {
    //         if (field === 'todas') {
    //             // Buscar en todas las columnas
    //             return Object.values(user).some(value => {
    //                 if (value === null || value === undefined) return false
    //                 return String(value).toLowerCase().includes(searchTerm.toLowerCase())
    //             })
    //         } else {
    //             // Buscar en columna específica
    //             const value = user[field]
    //             if (value === null || value === undefined) return false
    //             return String(value).toLowerCase().includes(searchTerm.toLowerCase())
    //         }
    //     })

    //     setFilteredUsers(filtered)
    //     setTotalPages(Math.ceil(filtered.length / pageSize))
    //     setCurrentPage(1)
    //     updateCurrentUsers(filtered, 1)
    // }
    const resetTableState = () => {
        setSearch("");
        setSelectedField("todas");

        setAllUsers([]);
        setFilteredUsers([]);
        setFilteredExport([]);
        setCurrentUsers([]);

        setCurrentPage(1);
        setTotalPages(1);
        setTotalRegistros(0);
    };

    const filterData = (searchTerm, field) => {
        let baseData = allUsers;

        if (searchTerm.trim()) {
            baseData = allUsers.filter((user) => {
                if (field === 'todas') {
                    return Object.values(user).some(value => {
                        if (value === null || value === undefined) return false;
                        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
                    });
                } else {
                    const value = user[field];
                    if (value === null || value === undefined) return false;
                    return String(value).toLowerCase().includes(searchTerm.toLowerCase());
                }
            });
        }

        // Tabla
        setFilteredUsers(baseData);

        // 🔴 EXPORT CORRECTO
        setFilteredExport(mapDataForExport(baseData));

        setTotalPages(Math.ceil(baseData.length / pageSize));
        setCurrentPage(1);
        updateCurrentUsers(baseData, 1);
    };

    // Cambiar de página
    const loadPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== currentPage) {
            setCurrentPage(pageNumber)
            updateCurrentUsers(filteredUsers, pageNumber)
        }
    }

    // Limpiar filtros de fecha
    // const limpiarFiltrosFecha = () => {
    //     const hoy = new Date();
    //     const yyyy = hoy.getFullYear();
    //     const mm = String(hoy.getMonth() + 1).padStart(2, "0");
    //     const dd = String(hoy.getDate()).padStart(2, "0");

    //     setFechaInicial(`${yyyy}-${mm}-${dd}`);
    //     setSelectedField('todas')
    //     // setFechaInicial("")
    //     setFechaFinal("")
    //     setSearch("")
    //     // setTotalRegistros(0);
    //     // Recargar datos sin filtros
    //     loadAllData()
    // }
    const limpiarFiltrosFecha = async () => {
        const hoy = new Date();
        const yyyy = hoy.getFullYear();
        const mm = String(hoy.getMonth() + 1).padStart(2, "0");
        const dd = String(hoy.getDate()).padStart(2, "0");

        setSearch("");
        setSelectedField("todas");

        setFechaInicial(`${yyyy}-${mm}-${dd}`);
        setFechaFinal("");

        await loadAllData();
    };

    // Efecto para cargar datos automáticamente solo cuando cambia fechaFinal
    useEffect(() => {
        if (fechaFinal) {
            const timeoutId = setTimeout(() => {
                loadAllData()
            }, 500)

            return () => clearTimeout(timeoutId)
        }
    }, [fechaFinal])

    // Efecto para filtrar cuando cambia search o selectedField
    useEffect(() => {
        filterData(search, selectedField)
    }, [search, selectedField])

    // Carga inicial sin filtros
    useEffect(() => {
        loadAllData()
    }, [])

    useEffect(() => {
        setFilteredExport(mapDataForExport(filteredUsers));
        setTotalRegistros(filteredUsers.length);
    }, [filteredUsers]);

    return {
        // Estados
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
        totalRegistros,
        loadingAll,
        fechaInicial,
        setFechaInicial,
        fechaFinal,
        setFechaFinal,
        isDetailsModalVisible,
        setIsDetailsModalVisible,
        onfilter,
        setOnfilter,

        // Funciones
        loadPage,
        filterData,
        limpiarFiltrosFecha,
        loadAllData
    }
}