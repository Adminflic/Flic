export interface DashboardEstructura {
    recaudoTotal: RecaudoTotal;
    transacciones: Transacciones;
    ticketPromedio: TicketPromedio;
    tendenciaRecaudo: TendenciaRecaudo[];
    recaudoFranjaHoraria: RecaudoFranjaHoraria[];
    topEntidades: TopEntidade[];
    medioPago: MedioPago[];
    mensajes: any[];
}

export interface RecaudoFranjaHoraria {
    franjaHoraria: string;
    cantidadTransacciones: string;
    recaudoTotal: string;
    franjaMaxRecaudo: string;
    montoMaxRecaudo: string;
}

export interface RecaudoTotal {
    montoMesActual: string;
    montoMesAnterior: string;
    porcentajeVariacion: string;
}

export interface TendenciaRecaudo {
    fecha: string;
    totalRecaudos: string | number;
    cantidadTransacciones: string;
    ticketPromedio: string;
    promedioDiarioTotal: string | number;
    fechaMaxRecaudo: string;
    montoMaxRecaudo: string;
}

export interface TicketPromedio {
    totalRecaudos: string;
    cantidadTransacciones: string;
    ticketPromedio: string;
    porcentajeVariacion: string;
    rangoMontos: string;
}

export interface TopEntidade {
    bancoNombre: string;
    totalRecaudo: string;
    totalTransacciones: string;
    ticketPromedio: string;
    porcentajeFrenteTotal: string;
}

export interface MedioPago {
    ranking: string;
    nombreMedio: string;
    totalRecaudos: string;
    cantidadTransacciones: string;
    porcentaje: string;
    esPrincipal: string;
    nombrePrincipal: string;
    porcentajePrincipal: string;
    concentracionTop3: string;
}

export interface Transacciones {
    cantidadTransaccionMesActual: string;
    cantidadTransaccionMesAnterior: string;
    promedioDiaTransaccion: string;
    porcentajeVariacion: string;
}
