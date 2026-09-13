import { TrendingUp, TrendingDown } from 'lucide-react';
import './MetricCard.css';

interface MetricCardProps {
  isToday?: boolean;
  title: string;
  value: string;
  trend: number;           // positivo o negativo, ej: 6.1 o -0.4
  trendLabel?: string;
  meta: string;            // "Meta: $..." o "Promedio: 88 trx/día"
  icon: React.ReactNode;
  iconColor?: 'green' | 'purple' | 'pink';
  highlightTitle?: boolean; // para el fondo morado en el título
}

const iconStyles = {
  green:  { wrapper: 'bg-[#ECFDF5] text-[#009966]' },
  purple: { wrapper: 'bg-[#F5F3FF] text-[#7F22FE]' },
  pink:  { wrapper: 'bg-[#FAF5FF] text-[#8B5CF6]' }
};

export const MetricCard = ({
  isToday= false, title, value, trend, trendLabel = isToday ? 'vs mismo día mes anterior' : 'vs mes anterior',
  meta, icon, iconColor = 'purple', highlightTitle = false
}: MetricCardProps) => {
  const isUp = trend >= 0;

  return (
    // w-85
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 ">

      {/* Header */}
      <div className="flex items-center justify-between">
        <span className={highlightTitle
          ? `${iconStyles[iconColor].wrapper} text-xs font-semibold px-2 py-1 rounded`
          // : 'text-gray-500 text-sm font-medium'
          : 'title'

        }>
          {title}
        </span>
        <span className={`w-9 h-9 rounded-full flex items-center justify-center ${iconStyles[iconColor].wrapper}`}>
          {icon}
        </span>
      </div>

      {/* Valor */}
      {/* "text-[22px] font-semibold text-gray-900 font-mono tracking-tight" */}
      <p className="valueMetric">
        {value}
      </p>

      {/* Footer */}
      <div className="flex flex-col gap-1">
        <div className={`flex items-center gap-1 text-[13px] font-semibold
          ${isUp ? 'text-green-600 text-[0.875rem]' : 'text-red-500'}`}>
          {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {Math.abs(trend)}%
          {/* <span className="text-gray-400 font-normal text-xs">{trendLabel}</span> */}
          <span className="promedioVariacion">{trendLabel}</span>

        </div>
        {/* <p className="text-xs text-gray-400">{meta}</p> */}
        <p className="meta">{meta}</p>

      </div>

    </div>
  );
};