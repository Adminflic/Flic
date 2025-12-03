import { useState } from "react";
import { ChartColumn, ChevronDown, ChevronUp, CircleAlert, DollarSign, FileCheck, LayoutGrid, RotateCcw, Settings } from "lucide-react";
import LogotipoFlic from '../../assets/icons/LogotipoFlic.svg';


export default function SidebarFlic1() {
  const [open, setOpen] = useState(true);

  return (
    <aside className="w-64 bg-gray-50 h-screen border-r p-4 flex flex-col gap-6">
      <div className="flex items-center gap-2 px-2">
      <img src={LogotipoFlic} alt="Logo Flic" className='w-10' />
        <span className="font-semibold text-xl text-purple-700">Flic</span>
      </div>

      <nav className="flex flex-col gap-4">
        <Item icon={<ChartColumn />} label="Dashboard" />

        <div>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between w-full px-2 py-2 hover:bg-gray-100 rounded-lg"
          >
            <span className="flex items-center gap-2">
            <LayoutGrid />
              Centro de Recaudo
            </span>
            {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {open && (
            <div className="ml-6 mt-2 flex flex-col gap-1 border-l pl-4">
              <SubItem active label="Recaudo" icon={<DollarSign />} />
              <SubItem label="Cheque" icon={<FileCheck />} />
              <SubItem label="Reversiones" icon={<RotateCcw />} />
              <SubItem label="No notificadas" icon={<CircleAlert />} />
            </div>
          )}
        </div>

        <Item icon={<Settings />} label="Panel de Configuración" />
      </nav>
    </aside>
  );
}

interface ItemProps {
  icon: React.ReactNode;
  label: string;
}

function Item({ icon, label }: ItemProps) {
  return (
    <div className="flex items-center gap-3 px-2 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
      {icon}
      <span>{label}</span>
    </div>
  );
}

interface SubItemProps {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

function SubItem({ label, icon, active = false }: SubItemProps) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
        active ? "bg-purple-600 text-white" : "hover:bg-gray-100"
      }`}
    >
      <span className="material-icons text-sm">{icon}</span>
      {label}
    </div>
  );
}