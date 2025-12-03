import { useState } from "react";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ChartColumn, LayoutGrid, DollarSign, FileCheck, RotateCcw, CircleAlert, Settings } from "lucide-react";
import LogotipoFlic from '../../assets/icons/LogotipoFlic.svg';
import { useNavigate } from "react-router-dom";


export default function SidebarFlic() {
  const [open, setOpen] = useState(true); // submenu abierto
  const [collapsed, setCollapsed] = useState(false); // sidebar colapsado
  const navigate = useNavigate();  // ← aquí


  return (
    // border-r
    <aside
      className={`h-screen bg-white  transition-all duration-200 ease-in-out flex flex-col items-stretch ${collapsed ? "w-20" : "w-64"
        }`}
      aria-expanded={!collapsed}
    >
      {/* Header: logo + collapse button */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <img src={LogotipoFlic} alt="Logo Flic" className='w-10' />
          {!collapsed && <span className="font-semibold text-xl text-purple-700">Flic</span>}
        </div>

        <button
          aria-label={collapsed ? "Abrir sidebar" : "Cerrar sidebar"}
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full bg-white shadow-sm border hover:shadow-md"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 px-1 py-2">
        <Item icon={<ChartColumn />} label="Dashboard" collapsed={collapsed} />

        <div className="mt-2">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <span className="flex items-center gap-2">
              <LayoutGrid />
              {!collapsed && "Centro de Recaudo"}
            </span>
            {!collapsed && (open ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
          </button>

          {open && (
            <div className="mt-2 ml-4 flex flex-col gap-1 border-l pl-3">
              <SubItem active label="Recaudo" icon={<DollarSign />} collapsed={collapsed} onClick={() => navigate("recaudo")} />
              <SubItem label="Cheque" icon={<FileCheck />} collapsed={collapsed} onClick={() => navigate("cheque")}/>
              <SubItem label="Reversiones" icon={<RotateCcw />} collapsed={collapsed} onClick={() => navigate("reversion")}/>
              <SubItem label="No notificadas" icon={<CircleAlert />} collapsed={collapsed} onClick={() => navigate("re-notificacion")}/>
            </div>
          )}
        </div>

        <Item icon={<Settings />} label="Panel de Configuración" collapsed={collapsed} />
      </nav>

      <div className="p-3">
        {!collapsed && <small className="text-xs text-gray-400">v1.0</small>}
      </div>
    </aside>
  );
}

interface ItemProps {
  icon: React.ReactNode;
  label: string;
  collapsed?: boolean;
}

function Item({ icon, label, collapsed = false }: ItemProps) {
  return (
    <div className="flex items-center gap-3 px-3 py-3 hover:bg-gray-100 rounded-lg cursor-pointer">
      <div className="flex items-center justify-center w-6 h-6">{icon}</div>
      {!collapsed && <span>{label}</span>}
    </div>
  );
}

interface SubItemProps {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}

function SubItem({ label, icon, active = false, collapsed = false, onClick }: SubItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${active ? "bg-purple-600 text-white" : "hover:bg-gray-100"
        }`}
      aria-current={active}
    >
      <span className="material-icons text-sm">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </div>
  );
}
