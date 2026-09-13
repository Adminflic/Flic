import React from 'react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  // Tomamos los valores específicos de tu payload
  const data = payload[0].payload;
  const fecha = label; // o data.fecha formateada si quieres

  const recaudo = Number(data.totalRecaudos ?? 0);
  const transacciones = Number(data.cantidadTransacciones ?? 0);
  // const ticketPromedio = transacciones ? Math.round(recaudo / transacciones) : 0;
  const ticketPromedio = Number(data.ticketPromedio ?? 0)


  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface-base)',
        border: '1px solid var(--color-border-2)',
        borderRadius: 8,
        padding: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        minWidth: 180,
      }}
    >
      <p
        style={{
          margin: 0,
          marginBottom: 8,
          fontWeight: 'bold',
          color: 'var(--color-text-1)',
        }}
      >
        {fecha}
      </p>

      <div style={{ marginBottom: 4 }}>
        <span style={{ color: 'var(--Primary)', fontWeight: '500' }}>Recaudo: </span>
        <span style={{ color: 'var(--Primary)', fontWeight: 'bold' }}>
          ${recaudo.toLocaleString()}
        </span>
      </div>

      <div style={{ marginBottom: 4 }}>
        <span style={{ color: 'var(--color-text-2)', fontWeight: '500' }}>Transacciones: </span>
        <span style={{ color: 'var(--color-text-1)', fontWeight: 'bold' }}>
          {transacciones.toLocaleString()}
        </span>
      </div>

      <div>
        <span style={{ color: 'var(--color-text-2)', fontWeight: '500' }}>Ticket Promedio: </span>
        <span style={{ color: 'var(--color-text-1)', fontWeight: 'bold' }}>
          ${ticketPromedio.toLocaleString()}
        </span>
      </div>
    </div>
  );
};


export const CustomTooltipFranja: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  // Tomamos los valores específicos de tu payload
  const data = payload[0].payload;
  const fecha = label; // o data.fecha formateada si quieres

  const recaudo = Number(data.recaudoTotal ?? 0);
  const transacciones = Number(data.cantidadTransacciones ?? 0);
  // const ticketPromedio = transacciones ? Math.round(recaudo / transacciones) : 0;
  // const ticketPromedio = Number(data.ticketPromedio ?? 0)


  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface-base)',
        border: '1px solid var(--color-border-2)',
        borderRadius: 8,
        padding: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        minWidth: 180,
      }}
    >
      <p
        style={{
          margin: 0,
          marginBottom: 8,
          fontWeight: 'bold',
          color: 'var(--color-text-1)',
        }}
      >
        {fecha}
      </p>

      <div style={{ marginBottom: 4 }}>
        <span style={{ color: 'var(--Color-semantico-verde)', fontWeight: '500' }}>Recaudo: </span>
        <span style={{ color: 'var(--Color-semantico-verde)', fontWeight: 'bold' }}>
          ${recaudo.toLocaleString()}
        </span>
      </div>

      <div style={{ marginBottom: 4 }}>
        <span style={{ color: 'var(--color-text-2)', fontWeight: '500' }}>Transacciones: </span>
        <span style={{ color: 'var(--color-text-1)', fontWeight: 'bold' }}>
          {transacciones.toLocaleString()}
        </span>
      </div>

      {/* <div>
        <span style={{ color: 'var(--color-text-2)', fontWeight: '500' }}>Ticket Promedio: </span>
        <span style={{ color: 'var(--color-text-1)', fontWeight: 'bold' }}>
          ${ticketPromedio.toLocaleString()}
        </span>
      </div> */}
    </div>
  );
};
