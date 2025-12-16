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


// import { ChartColumn, DollarSign } from "lucide-react";
// import React from "react";


// export const SidebarFlic = () => {
//   return (
//     <div className="flex flex-col w-60 h-[1024px] items-start pl-0 pr-px py-0 relative bg-mutedbackground border-r [border-right-style:solid] border-borderinput">
//       <div className="relative self-stretch w-full h-[87px]">
//         <div className="absolute top-6 left-[70px] w-[41px] h-[39px] flex">
//           <div className="w-[42px] h-[39px] [font-family:'Quicksand-Bold',Helvetica] font-bold text-violet-800 text-[26px] tracking-[0] leading-[39px] whitespace-nowrap">
//             Flic
//           </div>
//         </div>

//         <img
//           className="absolute top-7 left-8 w-[30px] h-[30px]"
//           alt="Logo"
//           // src={logo}
//         />
//       </div>

//       <div className="flex flex-col h-[407px] items-start gap-2 px-8 py-0 relative self-stretch w-full">
//         <div className="w-[175px] h-12 gap-4 px-4 py-2 relative rounded-[10px] flex items-center">
//           <div className="relative w-6 h-6">
//             {/* <img
//               className="absolute w-[75.00%] h-[75.00%] top-[8.33%] left-[8.33%]"
//               alt="Vector"
//               // src={vector}
//             /> */}

//             {/* <img
//               className="absolute w-0 h-[33.33%] top-[33.33%] left-[70.83%]"
//               alt="Vector"
//               // src={image}
//             /> */}

//             {/* <img
//               className="absolute w-0 h-[50.00%] top-[16.67%] left-[50.00%]"
//               alt="Vector"
//               // src={vector2}
//             /> */}


//               <ChartColumn />

//             {/* <img
//               className="absolute w-0 h-[12.50%] top-[54.17%] left-[29.17%]"
//               alt="Vector"
//               src={vector3}
//             /> */}
//           </div>

//           <div className="relative w-[70.4px] h-[21px]">
//             <div className="absolute top-0 left-0 [font-family:'Manrope-Regular',Helvetica] font-normal text-[#313a4e] text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap">
//               Dashboard
//             </div>
//           </div>
//         </div>

//         <div className="relative w-[175px] h-[244px]">
//           <div className="flex flex-col w-[159px] items-start gap-1 pl-4 pr-0 py-0 absolute top-[63px] left-4 border-l-2 [border-left-style:solid] border-[#e1e1e1]">
            
//             <div className="flex w-[141px] h-[37px] items-center gap-3 pl-3 pr-0 py-0 relative bg-violet-800 rounded-lg">
//               <div className="relative w-4 h-4">
//                 {/* <img
//                   className="absolute w-0 h-[83.33%] top-[4.17%] left-[45.83%]"
//                   alt="Vector"
//                   // src={vector4}
//                 />

//                 <img
//                   className="absolute w-[50.00%] h-[58.33%] top-[16.67%] left-[20.83%]"
//                   alt="Vector"
//                   // src={vector5}
//                 /> */}
//                 <DollarSign />
//               </div>

//               <div className="relative w-[57.39px] h-[21px]">
//                 <div className="top-0 text-white leading-[21px] absolute left-0 [font-family:'Manrope-Regular',Helvetica] font-normal text-sm tracking-[0] whitespace-nowrap">
//                   Recaudo
//                 </div>
//               </div>
//             </div>

//             <div className="flex w-[141px] h-[37px] items-center gap-3 pl-3 pr-0 py-0 relative rounded-lg">
//               <div className="relative w-4 h-4">
//                 <img
//                   className="absolute w-[66.67%] h-[83.33%] top-[4.17%] left-[12.50%]"
//                   alt="Vector"
//                   // src={vector6}
//                 />

//                 <img
//                   className="absolute w-[25.00%] h-[25.00%] top-[4.17%] left-[54.17%]"
//                   alt="Vector"
//                   // src={vector7}
//                 />

//                 <img
//                   className="absolute w-[25.00%] h-[16.67%] top-[50.00%] left-[33.33%]"
//                   alt="Vector"
//                   // src={vector8}
//                 />
//               </div>

//               <div className="relative w-[51.31px] h-[21px]">
//                 <div className="absolute top-0 left-0 [font-family:'Manrope-Regular',Helvetica] font-normal text-fontprimary text-sm tracking-[0] leading-[21px] whitespace-nowrap">
//                   Cheque
//                 </div>
//               </div>
//             </div>

//             <div className="flex w-[141px] h-[37px] items-center gap-3 pl-3 pr-0 py-0 relative rounded-lg">
//               <div className="relative w-4 h-4">
//                 <img
//                   className="absolute w-[75.00%] h-[75.00%] top-[8.33%] left-[8.33%]"
//                   alt="Vector"
//                   // src={vector9}
//                 />

//                 <img
//                   className="absolute w-[20.83%] h-[20.83%] top-[8.33%] left-[8.33%]"
//                   alt="Vector"
//                   // src={vector10}
//                 />
//               </div>

//               <div className="relative w-[79.23px] h-[21px]">
//                 <div className="absolute top-0 left-0 [font-family:'Manrope-Regular',Helvetica] font-normal text-colecci-n-de-variables-color-texto-principal-duplicate text-sm tracking-[0] leading-[21px] whitespace-nowrap">
//                   Reversiones
//                 </div>
//               </div>
//             </div>

//             <div className="flex w-[141px] h-[58px] items-center gap-3 px-3 py-0 relative rounded-lg">
//               <div className="relative w-[15.35px] h-[15.35px]">
//                 <img
//                   className="absolute w-[83.33%] h-[83.33%] top-[4.17%] left-[4.17%]"
//                   alt="Vector"
//                   // src={vector11}
//                 />

//                 <img
//                   className="absolute w-0 h-[16.67%] top-[29.17%] left-[45.83%]"
//                   alt="Vector"
//                   // src={vector12}
//                 />

//                 <img
//                   className="absolute w-0 h-0 top-[62.50%] left-[45.83%]"
//                   alt="Vector"
//                   // src={vector13}
//                 />
//               </div>

//               <div className="relative flex-1 grow h-[42px]">
//                 <div className="absolute top-0 left-0 w-[73px] [font-family:'Manrope-Regular',Helvetica] font-normal text-colecci-n-de-variables-color-texto-principal-duplicate text-sm tracking-[0] leading-[21px]">
//                   No notificadas
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex w-[175px] h-[59px] items-center gap-4 px-4 py-2 absolute top-0 left-0 rounded-lg">
//             <div className="relative w-6 h-6">
//               <img
//                 className="absolute w-[29.17%] h-[29.17%] top-[8.33%] left-[8.33%]"
//                 alt="Vector"
//                 // src={vector14}
//               />

//               <img
//                 className="absolute w-[29.17%] h-[29.17%] top-[8.33%] left-[54.17%]"
//                 alt="Vector"
//                 // src={vector15}
//               />

//               <img
//                 className="absolute w-[29.17%] h-[29.17%] top-[54.17%] left-[54.17%]"
//                 alt="Vector"
//                 // src={vector16}
//               />

//               <img
//                 className="absolute w-[29.17%] h-[29.17%] top-[54.17%] left-[8.33%]"
//                 alt="Vector"
//                 // src={vector17}
//               />
//             </div>

//             <div className="relative flex-1 grow h-[35px]">
//               <div className="absolute top-0 left-0 [font-family:'Manrope-Regular',Helvetica] font-normal text-colecci-n-de-variables-color-texto-principal-duplicate text-sm tracking-[0] leading-[17.5px] whitespace-nowrap">
//                 Centro de
//               </div>

//               <div className="top-[18px] text-colecci-n-de-variables-color-texto-principal-duplicate leading-[17.5px] absolute left-0 [font-family:'Manrope-Regular',Helvetica] font-normal text-sm tracking-[0] whitespace-nowrap">
//                 Recaudo
//               </div>
//             </div>

//             <div className="relative w-5 h-5">
//               <img
//                 className="absolute w-[50.00%] h-[25.00%] top-[33.33%] left-[20.83%]"
//                 alt="Vector"
//                 // src={vector18}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="w-[175px] h-[66px] gap-4 px-4 py-2 relative rounded-lg flex items-center">
//           <div className="relative w-6 h-6">
//             <img
//               className="absolute w-[74.64%] h-[83.18%] top-[4.24%] left-[8.52%]"
//               alt="Vector"
//               // src={vector19}
//             />

//             <img
//               className="absolute w-[25.00%] h-[25.00%] top-[33.33%] left-[33.33%]"
//               alt="Vector"
//               // src={vector20}
//             />
//           </div>

//           <div className="relative flex-1 grow h-[42px]">
//             <div className="absolute top-0 left-0 w-[92px] [font-family:'Manrope-Regular',Helvetica] font-normal text-colecci-n-de-variables-color-texto-principal-duplicate text-sm tracking-[0] leading-[21px]">
//               Panel de Configuración
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="w-6 h-6 justify-center absolute top-8 left-[227px] bg-primaryforeground rounded-[16777200px] border border-solid border-bordercard shadow-[0px_1px_2px_-1px_#0000001a,0px_1px_3px_#0000001a] flex items-center">
//         <div className="relative w-4 h-4">
//           <img
//             className="absolute w-[25.00%] h-[50.00%] top-[20.83%] left-[33.33%]"
//             alt="Vector"
//             // src={vector21}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
