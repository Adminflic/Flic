import { Calendar, CreditCard, DollarSign, Dot, Receipt, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import './Dashboard.css';
import { MetricCard } from "../../components/MetricCard ";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { RankingBarList } from "../../components/RankingBar";
import { dashboardMetricas } from '../../services/Dashboard';
import type { DashboardEstructura, TendenciaRecaudo } from "../../types/dashboardType";
import { CustomTooltip, CustomTooltipFranja } from "../../components/CustomTooltip";
import Loading from '../../../src/assets/animations/loading.json'

import Lottie from "lottie-react";
import { useLocation } from "react-router-dom";

const toInputValue = (date: Date) => date.toISOString().split('T')[0];

const formatDisplay = (date: Date) =>
  date.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });

const formatMonthDay = (date: Date) =>
  date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

const formatYear = (date: Date) =>
  date.toLocaleDateString('en-US', {
    year: 'numeric'
  });

const formatDateRange = (start: Date, end: Date) => {
  return `${formatMonthDay(start)} - ${formatMonthDay(end)}, ${formatYear(end)}`;
};

const formatISODateLocal = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

// const formatDateRangeDisplay = (start: Date, end: Date) => {
//   const monthDayFormatter = new Intl.DateTimeFormat('es-ES', {
//     month: 'short',
//     day: 'numeric',
//   });

//   const yearFormatter = new Intl.DateTimeFormat('es-ES', {
//     year: 'numeric',
//   });

//   return `${monthDayFormatter.format(start)} – ${monthDayFormatter.format(end)}, ${yearFormatter.format(end)}`;
// };

// Ejemplo:
const start = new Date(2026, 2, 1); // Mar 1, 2026
const end = new Date(2026, 2, 24);  // Mar 24, 2026

const formatDateRangeDisplay = (start: Date, end: Date) => {
  const sameDay = start.toDateString() === end.toDateString();

  const formatter = new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  if (sameDay) {
    return formatter.format(start).replace('.', '');
  }

  const monthDayFormatter = new Intl.DateTimeFormat('es-ES', {
    month: 'short',
    day: 'numeric',
  });

  const yearFormatter = new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
  });

  return `${monthDayFormatter.format(start).replace('.', '')} – ${monthDayFormatter.format(end).replace('.', '')}, ${yearFormatter.format(end)}`;
};
// console.log(formatDateRangeDisplay(start, end)); // "Mar 1 – Mar 24, 2026"

// const CustomTooltip = ({ active, payload, label }: any) => {
//   if (active && payload && payload.length) {
//     return (
//       <div style={{
//         backgroundColor: 'var(--color-surface-base)',
//         border: '1px solid var(--color-border-2)',
//         borderRadius: '8px',
//         padding: '12px',
//         boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
//       }}>
//         <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: 'var(--color-text-1)' }}>
//           {label}
//         </p>
//         {payload.map((entry: any, index: number) => (
//           <div key={index} style={{ marginBottom: '4px' }}>
//             <span style={{ color: entry.color, marginRight: '8px' }}>
//               {entry.name === 'Page Views' ? '📊 ' : '👥 '}
//             </span>
//             <span style={{ color: 'var(--color-text-2)' }}>
//               {entry.name}:
//             </span>
//             <span style={{ color: 'var(--color-text-1)', fontWeight: 'bold', marginLeft: '8px' }}>
//               {entry.value.toLocaleString()}
//               {entry.name === 'Page Views' ? ' views' : ' users'}
//             </span>
//           </div>
//         ))}
//         {payload[0] && payload[0].payload && (
//           <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--color-border-3)' }}>
//             <small style={{ color: 'var(--color-text-3)' }}>
//               Amount: ${payload[0].payload.amt?.toLocaleString()}
//             </small>
//           </div>
//         )}
//       </div>
//     );
//   }
//   return null;
// };

// #region Sample data
// const data = [
//   {
//     fecha: "04/01/2026 00:00:00",
//     totalRecaudos: "2655487072",
//     cantidadTransacciones: "967",
//     ticketPromedio: "2746108.657704",
//     promedioDiarioTotal: "1062985155.428571",
//     fechaMaxRecaudo: "04/06/2026 00:00:00",
//     montoMaxRecaudo: "2695977256"
//   },
//   {
//     fecha: "04/02/2026 00:00:00",
//     totalRecaudos: "701509820",
//     cantidadTransacciones: "635",
//     ticketPromedio: "1104739.874015",
//     promedioDiarioTotal: "1062985155.428571",
//     fechaMaxRecaudo: "04/06/2026 00:00:00",
//     montoMaxRecaudo: "2695977256"
//   },
//   {
//     fecha: "04/03/2026 00:00:00",
//     totalRecaudos: "147179715",
//     cantidadTransacciones: "106",
//     ticketPromedio: "1388487.877358",
//     promedioDiarioTotal: "1062985155.428571",
//     fechaMaxRecaudo: "04/06/2026 00:00:00",
//     montoMaxRecaudo: "2695977256"
//   },
//   {
//     fecha: "04/04/2026 00:00:00",
//     totalRecaudos: "1011313809",
//     cantidadTransacciones: "639",
//     ticketPromedio: "1582650.718309",
//     promedioDiarioTotal: "1062985155.428571",
//     fechaMaxRecaudo: "04/06/2026 00:00:00",
//     montoMaxRecaudo: "2695977256"
//   },
//   {
//     fecha: "04/05/2026 00:00:00",
//     totalRecaudos: "157407339",
//     cantidadTransacciones: "94",
//     ticketPromedio: "1674546.159574",
//     promedioDiarioTotal: "1062985155.428571",
//     fechaMaxRecaudo: "04/06/2026 00:00:00",
//     montoMaxRecaudo: "2695977256"
//   },
//   {
//     fecha: "04/06/2026 00:00:00",
//     totalRecaudos: "2695977256",
//     cantidadTransacciones: "907",
//     ticketPromedio: "2972411.528114",
//     promedioDiarioTotal: "1062985155.428571",
//     fechaMaxRecaudo: "04/06/2026 00:00:00",
//     montoMaxRecaudo: "2695977256"
//   },
//   {
//     fecha: "04/07/2026 00:00:00",
//     totalRecaudos: "72021077",
//     cantidadTransacciones: "67",
//     ticketPromedio: "1074941.447761",
//     promedioDiarioTotal: "1062985155.428571",
//     fechaMaxRecaudo: "04/06/2026 00:00:00",
//     montoMaxRecaudo: "2695977256"
//   }
// ];

// // #region Sample data
// const data2 = [
//   {
//     franjaHoraria: "4-6",
//     cantidadTransacciones: "12",
//     recaudoTotal: "2988766",
//     franjaMaxRecaudo: "12-14",
//     montoMaxRecaudo: "4058536135"
//   },
//   {
//     franjaHoraria: "6-8",
//     cantidadTransacciones: "128",
//     recaudoTotal: "58670194",
//     franjaMaxRecaudo: "12-14",
//     montoMaxRecaudo: "4058536135"
//   },
//   {
//     franjaHoraria: "8-10",
//     cantidadTransacciones: "200",
//     recaudoTotal: "377219986",
//     franjaMaxRecaudo: "12-14",
//     montoMaxRecaudo: "4058536135"
//   },
//   {
//     franjaHoraria: "10-12",
//     cantidadTransacciones: "185",
//     recaudoTotal: "552636874",
//     franjaMaxRecaudo: "12-14",
//     montoMaxRecaudo: "4058536135"
//   },
//   {
//     franjaHoraria: "12-14",
//     cantidadTransacciones: "1788",
//     recaudoTotal: "4058536135",
//     franjaMaxRecaudo: "12-14",
//     montoMaxRecaudo: "4058536135"
//   },
//   {
//     franjaHoraria: "14-16",
//     cantidadTransacciones: "314",
//     recaudoTotal: "812974203",
//     franjaMaxRecaudo: "12-14",
//     montoMaxRecaudo: "4058536135"
//   },
//   {
//     franjaHoraria: "16-18",
//     cantidadTransacciones: "388",
//     recaudoTotal: "787521633",
//     franjaMaxRecaudo: "12-14",
//     montoMaxRecaudo: "4058536135"
//   },
//   {
//     franjaHoraria: "18-20",
//     cantidadTransacciones: "282",
//     recaudoTotal: "590101005",
//     franjaMaxRecaudo: "12-14",
//     montoMaxRecaudo: "4058536135"
//   },
//   {
//     franjaHoraria: "20-22",
//     cantidadTransacciones: "115",
//     recaudoTotal: "198673292",
//     franjaMaxRecaudo: "12-14",
//     montoMaxRecaudo: "4058536135"
//   },
//   {
//     franjaHoraria: "22-24",
//     cantidadTransacciones: "3",
//     recaudoTotal: "1574000",
//     franjaMaxRecaudo: "12-14",
//     montoMaxRecaudo: "4058536135"
//   }
// ];

export const Dashboard = () => {

  const startRef = useRef<HTMLInputElement>(null);

  const [dateRange, setDateRange] = useState(() => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    return { startDate: firstDay, endDate: today };
  });

  const [isToday, setIsToday] = useState(false);

  const start = formatISODateLocal(dateRange.startDate);
  const end = formatISODateLocal(dateRange.endDate);

  // console.log('Inicio ' + start); // 2026-04-01
  // console.log('Fin ' + end);   // 2026-04-07

  const getMonthOptions = () => {
    const today = new Date();
    const currentMonth = today.getMonth();

    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    // Excluye el mes actual y el mes anterior
    return monthNames
      .slice(0, currentMonth - 1) // Abril(3) → slice(0,2) → [Enero, Febrero]
      .map((name, index) => ({
        label: name,
        value: `month-${index}`,
        monthIndex: index,
      }));
  };

  // const handlePreset = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const today = new Date();
  //   const value = e.target.value;

  //   if (value === 'mes-actual') {
  //     setDateRange({
  //       startDate: new Date(today.getFullYear(), today.getMonth(), 1),
  //       endDate: today,
  //     });
  //   } else if (value === 'mes-anterior') {
  //     setDateRange({
  //       startDate: new Date(today.getFullYear(), today.getMonth() - 1, 1),
  //       endDate: new Date(today.getFullYear(), today.getMonth(), 0),
  //     });
  //   } else if (value.startsWith('month-')) {
  //     const monthIndex = parseInt(value.split('-')[1]);
  //     setDateRange({
  //       startDate: new Date(today.getFullYear(), monthIndex, 1),
  //       endDate: new Date(today.getFullYear(), monthIndex + 1, 0), // último día del mes
  //     });
  //   }
  // };

  const handlePreset = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const today = new Date();
    const value = e.target.value;

    let startDate: Date = today;
    let endDate: Date = today;

    if (value === 'mes-actual') {
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = today;
      setIsToday(false);
    } else if (value === 'dia-actual') {
      setIsToday(true);

      const today = new Date();
      startDate = today;
      endDate = today;

      setFecha(formatISODateLocal(today));
    } else if (value === 'mes-anterior') {
      startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      endDate = new Date(today.getFullYear(), today.getMonth(), 0);
      setIsToday(false);
    } else if (value.startsWith('month-')) {
      const monthIndex = parseInt(value.split('-')[1]);
      startDate = new Date(today.getFullYear(), monthIndex, 1);
      endDate = new Date(today.getFullYear(), monthIndex + 1, 0);
      setIsToday(false);
    }

    // Ahora TypeScript sabe que las variables existen
    setDateRange({ startDate, endDate });

    const formattedEndDate = formatISODateLocal(endDate);
    // console.log(formattedEndDate); // 2026-04-07
  };

  const [dashboardData, setDashboardData] = useState<DashboardEstructura>();
  // const [dashboardTendencia, setDashboardTendencia] = useState<TendenciaRecaudo[]>([]);

  const [loading, setLoading] = useState(false);

  const isFirstLoad = useRef(true);
  const [fecha, setFecha] = useState("");

  useEffect(() => {

    const fetchDashboard = async () => {
      try {
        // setLoading(true);
        // Solo muestra loading en la primera carga
        if (isFirstLoad.current) {
          setLoading(true);
        }

        const esMesActual =
          dateRange.endDate.getMonth() === new Date().getMonth() &&
          dateRange.endDate.getFullYear() === new Date().getFullYear();

        // const fechaConsulta = !isToday ? null : formatISODateLocal(dateRange.startDate);
        // const fechaFin = !isToday ? null : formatISODateLocal(dateRange.endDate);

        const fechaConsulta = formatISODateLocal(dateRange.startDate);
        const fechaFin = isToday ? null : formatISODateLocal(dateRange.endDate);


        const data = await dashboardMetricas({
          idComercio: Number.parseInt(localStorage.getItem("Comercio")!), // o tu variable dinámica
          fechaConsulta,
          fechaFin
        });

        // const tendencia = data?.tendenciaRecaudo?.map(x => ({
        //   ...x,
        //   totalRecaudos: Number(x.totalRecaudos),
        //   promedioDiarioTotal: Number(x.promedioDiarioTotal),
        // })) ?? [];

        setDashboardData(data);
        // setDashboardTendencia(tendencia);
        // console.log(JSON.stringify(tendencia))
      } catch (error) {
        console.error("Error consultando dashboard:", error);
      } finally {
        setLoading(false);
        isFirstLoad.current = false; // Marca que ya cargó la primera vez
      }
    };

    fetchDashboard();
  }, [dateRange.endDate]);


  const defaultFormat = (v: number) =>
    '$ ' + v.toLocaleString('es-CO');

  const defaultFormato = (v: number) =>
    v.toLocaleString('es-CO');

  // Determinar si está activo: por path o por prop active
  // const location = useLocation();
  // const path = 'main';
  // const active = false;

  // const isActive = path ? location.pathname.includes(path) : active;

  const formatYAxis = (value: number) => {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(0)} M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(0)} K`;
    // if (value >= 1_000) return `$${(value / 1_000).toFixed(0)} K`;

    return `$${value}`;
  };

  const openPicker = (ref: React.RefObject<HTMLInputElement>) => {
    if (!ref.current) return;

    if (ref.current.showPicker) {
      ref.current.showPicker();
    } else {
      ref.current.focus();
    }
  };

  const parseLocalDate = (value: string) => {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  return (
    // <>
    <div>
      {/* <code> */}
      {/* <pre>{formatDateRangeDisplay(dateRange.startDate, dateRange.endDate)}</pre> */}
      {/* <pre>{JSON.stringify(isToday)}</pre> */}
      {/* </code> */}

      <header className="headerMain">
        <div className='detalle'>
          <h1 className="tituloDashboard">Resumen de Recaudo Multicanal</h1>
          <p className="parrafoDashboard">Visión general del comportamiento de recaudos en el periodo seleccionado</p>
        </div>

        <div className='filtro'>
          <select onChange={handlePreset} defaultValue='mes-actual' className="selectorFiltroDash">
            <option value='dia-actual'>Hoy</option>
            <option value='mes-actual'>Mes en Curso</option>
            <option value='mes-anterior'>Mes Anterior</option>

            {getMonthOptions().map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>

          {/* Visualización del rango */}

          {/* <p>
              {formatDisplay(dateRange.startDate)} – {formatDisplay(dateRange.endDate)}
              Ej: "01 feb. 2026 – 07 abr. 2026"
            </p> */}

          {/* Ej: "Mar 1 – Mar 24, 2026" */}

          <div className="fechaSeleccionada">
            {
              isToday ?
                <>
                  <div onClick={() => openPicker(startRef)} className="flex justify-center items-center gap-2.5">
                    <Calendar size={18} />
                    <input
                      ref={startRef}
                      value={fecha}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFecha(value);

                        if (value) {
                          const newDate = parseLocalDate(value);

                          const startDate = new Date(newDate);
                          startDate.setHours(0, 0, 0, 0);

                          const endDate = new Date(newDate);
                          endDate.setHours(23, 59, 59, 999);

                          setDateRange({ startDate, endDate });
                        }
                      }}
                      type="date"
                      name="" id=""
                      className="absolute opacity-0 pointer-events-none"
                    // className="hidden"
                    />

                    <p>
                      {formatDateRangeDisplay(dateRange.startDate, dateRange.endDate)}
                    </p>
                  </div>

                </>
                :
                <>
                  <div className="flex flex-row justify-center gap-1.5 items-center opacity-45 cursor-not-allowed">
                    <Calendar size={18} />

                    <p className="">
                      {formatDateRangeDisplay(dateRange.startDate, dateRange.endDate)}
                    </p>
                  </div>

                </>
            }

          </div>

          {/* Opcional: inputs para rango personalizado */}
          {/* <input
            type='date'
            value={toInputValue(dateRange.startDate)}
            onChange={(e) =>
              setDateRange((r) => ({ ...r, startDate: new Date(e.target.value + 'T00:00:00') }))
            }
          />
          <input
            type='date'
            value={toInputValue(dateRange.endDate)}
            onChange={(e) =>
              setDateRange((r) => ({ ...r, endDate: new Date(e.target.value + 'T00:00:00') }))
            }
          /> */}
        </div>
      </header>

      {/* Loading inicial */}
      {loading && (
        // <div className='text-center py-5'>
        //     <div className='spinner-border text-primary' role='status'>
        //         <span className='visually-hidden'>Cargando datos...</span>
        //     </div>
        //     <p className='mt-2 text-muted'>Cargando datos... Esto puede tomar unos segundos</p>
        // </div>

        <div className='flex justify-center'>
          <Lottie animationData={Loading} className='w-fit h-fit' />
        </div>
      )}

      {
        !loading && (
          <>

            <main>
              {/* Detalle Filtro es Seleccionado  */}
              {
                isToday && (
                  <div className="isToday">
                    <div className="flex flex-row gap-2.5 justify-center items-center">
                      <span className={`w-9 h-9 rounded-[0.875rem] flex items-center justify-center bg-violet-100 text-violet-700`}>
                        <Calendar size={20} />
                      </span>

                      <div>
                        <p className="tituloIsToday">Vista de día específico</p>
                        <p className="fechaIsToday">{formatDateRangeDisplay(dateRange.startDate, dateRange.endDate)}</p>
                      </div>
                    </div>
                    <p className="subtituloIsToday">Comparación vs mismo día del mes anterior</p>

                  </div>
                )
              }

              <div className="cardPrincipales">
                <MetricCard
                  title="Recaudo Total"
                  value={`${defaultFormat(Number.parseInt(dashboardData?.recaudoTotal.montoMesActual!))}`}
                  trend={Number(dashboardData?.recaudoTotal.porcentajeVariacion)}
                  meta={`Total del periodo: ${defaultFormat(Number.parseInt(dashboardData?.recaudoTotal.montoMesAnterior!))}`}
                  icon={<DollarSign size={17} />}
                  iconColor="green"
                  highlightTitle
                  isToday={isToday}
                />

                <MetricCard
                  title="Transacciones"
                  value={`${defaultFormato(Number.parseInt(dashboardData?.transacciones.cantidadTransaccionMesActual!))}`}
                  trend={Number(dashboardData?.transacciones.porcentajeVariacion)}
                  meta={`Promedio: ${Number.parseInt(dashboardData?.transacciones.promedioDiaTransaccion!)} ${isToday ? 'trx/hora' : 'trx/día'} `}
                  icon={<CreditCard size={17} />}
                  iconColor="pink"
                  highlightTitle
                  isToday={isToday}
                />

                <MetricCard
                  title="Ticket Promedio"
                  value={`${defaultFormat(Number.parseInt(dashboardData?.ticketPromedio.ticketPromedio!))}`}
                  trend={Number(dashboardData?.ticketPromedio.porcentajeVariacion)}
                  meta={`Rango: ${dashboardData?.ticketPromedio.rangoMontos!}`}
                  icon={<Receipt size={17} />}
                  iconColor="purple"
                  highlightTitle
                  isToday={isToday}
                />
              </div>

              <div className="flex flex-col gap-10">
                <div className="tendenciaRecaudo">

                  <div className="tendenciaHeader">
                    <h3 className="tendenciaTitulo">Tendencia de Recaudo</h3>
                    <h3 className="tendenciaParrafo">Evolución del recaudo diario en el periodo seleccionado</h3>
                  </div>

                  {/* Grafica Tendencia */}
                  <div className="graficaTendencia">

                    {/* Grafica  */}
                    <div className="graficaPrimera">
                      {
                        dashboardData?.tendenciaRecaudo ?
                          <LineChart
                            style={{ width: '100%', maxHeight: '65vh', aspectRatio: 1.618 }}
                            responsive
                            data={dashboardData?.tendenciaRecaudo ?? []}
                            margin={{
                              top: 15,
                              right: 0,
                              left: 0,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-3)" />
                            <XAxis dataKey="fecha" stroke="var(--color-text-3)" tick={{ fontSize: 11, fill: "var(--Font-Secondary)" }} />
                            <YAxis width="auto" stroke="var(--color-text-3)" tickFormatter={formatYAxis} />
                            <Tooltip
                              cursor={{ stroke: 'var(--color-border-2)' }}
                              content={<CustomTooltip />}
                            />
                            <Legend wrapperStyle={{ fontSize: 13, color: "#6b7280" }} />
                            <Line
                              type="monotone"
                              dataKey="totalRecaudos"
                              stroke="var(--Primary)"
                              strokeWidth={4}
                              // strokeDasharray="5 5"
                              dot={{
                                fill: 'var(--Primary)',
                                r: 4
                              }}
                              activeDot={{
                                // stroke: 'var(--color-surface-base)',
                                fill: 'var(--Primary)',
                                r: 6
                              }}
                              name="Recaudo"
                            />
                            <Line
                              type="monotone"
                              // dataKey={`${isToday ? 'totalRecaudosMesAnterior' : 'promedioDiarioTotal'}`}
                              dataKey="totalRecaudosMesAnterior"
                              stroke="var(--Font-Secondary)"
                              strokeWidth={2}
                              strokeDasharray="5 7"
                              dot={{
                                fill: 'var(--color-surface-base)',
                              }}
                              activeDot={{
                                stroke: 'var(--color-surface-base)',
                              }}
                              name={`${isToday ? 'Mes Anterior' : 'Mes Anterior'}`} //Promedio Diario
                            />
                          </LineChart>
                          : null

                      }


                    </div>

                    {/* Footer Grafica  */}

                    <div className="footerGrafica">
                      <div className="flex gap-2.5">

                        <span className={`w-9 h-9 rounded-[0.875rem] flex items-center justify-center bg-violet-100 text-violet-700`}>
                          <TrendingUp size={14} />
                        </span>

                        <div>
                          <p className="detallleTendencia">{`${isToday ? 'Promedio por hora' : 'Promedio diario'}`}</p>
                          <p className="detalleTendenciaValor">{defaultFormat(Number(dashboardData?.tendenciaRecaudo[0].promedioDiarioTotal))}</p>
                        </div>
                      </div>

                      <div className="flex gap-2.5">
                        <span className={`w-9 h-9 rounded-[0.875rem] flex items-center justify-center bg-green-50 text-green-600`}>
                          <TrendingUp size={14} />
                        </span>
                        <div>
                          <p className="detallleTendencia"> {`${isToday ? 'Hora pico' : 'Día con mayor recaudo'}`}</p>
                          <p className="detalleTendenciaValor">{dashboardData?.tendenciaRecaudo[0].fechaMaxRecaudo}: {defaultFormat(Number(dashboardData?.tendenciaRecaudo[0].montoMaxRecaudo))}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="gridMultiEstadistica">

                  {/* Medio de Pago */}
                  <div className="">

                    {/* <div className="medioPrincipal">

                    </div> */}
                    <RankingBarList
                      titulo="Participación de Recaudo por Medio de Pago"
                      subtitulo="Distribución porcentual del recaudo según el método de pago"
                      colorBarra="#5B21B6"
                      items={
                        dashboardData?.medioPago?.map(mediopago => ({
                          label: mediopago.nombreMedio,
                          value: Number.parseInt(mediopago.totalRecaudos),
                          porcentaje: Number.parseInt(mediopago.porcentaje),
                        })) ?? []
                      }
                      subDetalle={{
                        title: "Medio principal",
                        label: dashboardData?.medioPago[0].nombrePrincipal!,
                        porcentaje: Number.parseInt(dashboardData?.medioPago[0].porcentajePrincipal!),
                      }}
                      concentracionTop3={Number.parseInt(dashboardData?.medioPago[0].concentracionTop3!)}

                    />
                  </div>

                  {/* Franja Horaria */}
                  <div className="seccionGrafica bg-amber-200">
                    <div>
                      <h3 className="franjaHorariaTitulo">Recaudo por Franja Horaria</h3>
                      <p className="franjaHorariaParrafo">Identificación de picos de actividad</p>
                    </div>

                    {
                      dashboardData?.recaudoFranjaHoraria! ?
                        <BarChart
                          style={{ width: '100%', maxHeight: '65vh', aspectRatio: 1.618 }}
                          responsive
                          data={dashboardData?.recaudoFranjaHoraria}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="franjaHoraria" />
                          <YAxis width="auto" tickFormatter={formatYAxis} />
                          <Tooltip
                            cursor={{ stroke: 'var(--color-border-2)' }}
                            content={<CustomTooltipFranja />}
                          />
                          {/* <Legend /> */}
                          {/* <Bar dataKey="pv" fill="#8884d8" /> */}
                          <Bar dataKey="recaudoTotal" fill="#10B981"
                            style={{ borderTopLeftRadius: '15px' }}
                            radius={[8, 8, 0, 0]}
                          />
                        </BarChart>
                        :
                        null
                    }

                    <div className="footerGraficaFranjaHoraria">

                      <div className="flex gap-2.5">

                        <span className={`w-9 h-9 rounded-[0.875rem] flex items-center justify-center bg-violet-100 text-violet-700`}>
                          <TrendingUp size={14} />
                        </span>

                        <div>
                          <p className="detallleTendencia">{`Mayor actividad`}</p>
                          <p className="detalleFranjaHoraria">{dashboardData?.recaudoFranjaHoraria[0].franjaMaxRecaudo} {`(${defaultFormat(Number.parseInt(dashboardData?.recaudoFranjaHoraria[0].montoMaxRecaudo!))})`}</p>
                        </div>
                      </div>

                      {/* <Dot size={40} style={{ color: '#00BC7D' }} />
                      <p className="detalleFranjaHoraria">Mayor actividad: {dashboardData?.recaudoFranjaHoraria[0].franjaMaxRecaudo} {`(${defaultFormat(Number.parseInt(dashboardData?.recaudoFranjaHoraria[0].montoMaxRecaudo!))})`}</p> */}
                    </div>

                  </div>
                </div>

                {/* Top Entidades */}
                <div className="">
                  <RankingBarList
                    numero={true}
                    titulo="Top Entidades"
                    subtitulo="Por volumen de recaudo procesado"
                    colorBarra="#5B21B6"
                    //   items={
                    //     [
                    //     { label: 'BANCOLOMBIA', value: 4385554070, porcentaje: 58.938520 },
                    //     { label: 'BBVA', value: 1496812245, porcentaje: 20.116021 },
                    //     { label: 'ACCCIONES VALORES', value: 912265700, porcentaje: 12.260159 },
                    //     { label: 'DAVIVIENDA', value: 577331805, porcentaje: 7.758901 },
                    //     { label: 'BANCO BOGOTA', value: 68932268, porcentaje: 0.926397 },
                    //   ]
                    // }
                    items={
                      dashboardData?.topEntidades?.map(entidad => ({
                        label: entidad.bancoNombre,
                        value: Number.parseInt(entidad.totalRecaudo),
                        porcentaje: Number.parseInt(entidad.porcentajeFrenteTotal),
                      })) ?? []
                    }
                  />
                </div>

              </div>



            </main>
          </>
        )
      }
    </div>


    // </>
  );
};