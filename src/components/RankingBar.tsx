import React from 'react';
import './RankingBar.css';
import { CreditCard, TrendingUp } from 'lucide-react';

export interface RankingItem {
  label: string;
  value: number;
  porcentaje: number;
}

export interface SubDetalle {
  title: string;
  label: string;
  porcentaje: number;
}

interface RankingBarListProps {
  titulo?: string;
  subtitulo?: string;
  items: RankingItem[];
  formatValue?: (value: number) => string;
  colorBarra?: string;
  numero?: boolean;
  subDetalle?: SubDetalle;
  concentracionTop3?: number;
}

const defaultFormat = (v: number) =>
  '$ ' + v.toLocaleString('es-CO');

export function RankingBarList({
  titulo,
  subtitulo,
  items,
  formatValue = defaultFormat,
  colorBarra = '#5B21B6',
  numero = false,
  subDetalle,
  concentracionTop3
}: RankingBarListProps) {
  const max = Math.max(...items.map(i => i.porcentaje));

  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: '1.25rem', border: '0.5px solid #e5e7eb' }}>
      {titulo && (
        // <p style={{ fontSize: 15, fontWeight: 500, margin: '0 0 2px' }}>{titulo}</p>
        <p className='tituloRankinBar'>{titulo}</p>
      )}
      {subtitulo && (
        // <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 1.25rem' }}>{subtitulo}</p>
        <p className='subTituloRankinBar'>{subtitulo}</p>

      )}

      {
        subDetalle && (
          <div className='medioPrincipal'>

            <div className='flex'>
              <CreditCard size={18} color='#FFF' className='iconoDetalle' />
              <div className='flex flex-col'>
                <p className='tituloSubDetalle'>{subDetalle.title}</p>
                <p className='subTituloSubDetalle'>{subDetalle.label}</p>
              </div>

            </div>

            <p className='porcentajeSubDetalle'>{subDetalle.porcentaje.toFixed(1)}%</p>

          </div>
        )
      }



      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {items.map((item, i) => (
          <div key={item.label}>
            {/* Fila: número + nombre + porcentaje */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              {/* Badge número */}

              {
                numero ? (
                  <span style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: colorBarra,
                    color: '#fff', fontSize: 12, fontWeight: 500,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {i + 1}
                  </span>
                ) : null
              }


              {/* Nombre */}
              <span style={{ fontSize: 14, fontWeight: 400, flex: 1, color: '#111' }}>
                {item.label}
              </span>

              {/* Porcentaje */}
              <span style={{ fontSize: 14, color: '#374151', fontWeight: 400, whiteSpace: 'nowrap' }}>
                {item.porcentaje.toFixed(1)}%
              </span>
            </div>

            {/* Barra de progreso */}
            <div style={{
              height: 6, borderRadius: 3,
              background: '#f3f4f6',
              overflow: 'hidden',
              marginBottom: 4,
            }}>
              <div style={{
                height: '100%',
                borderRadius: 3,
                background: colorBarra,
                width: `${(item.porcentaje / max) * 100}%`,
                transition: 'width 0.6s ease',
              }} />
            </div>

            {/* Valor */}
            {
              numero ? (
                <span style={{ fontSize: 12, color: '#9ca3af' }}>
                  {formatValue(item.value)}
                </span>
              ) : null
            }

          </div>
        ))}

        {
          subDetalle && (
            <div className='footerGraficaMedio'>
              <div className="flex gap-2.5">

                <span className={`w-9 h-9 rounded-[0.875rem] flex items-center justify-center bg-green-50 text-green-600`}>
                  <TrendingUp size={14} />
                </span>

                <div>
                  <p className="detallletop">Concentración Top 3</p>
                  <p className="detalleTopValor">{concentracionTop3}% del recaudo total</p>
                </div>
              </div>
            </div>
          )
        }


      </div>
    </div>
  );
}