import React from 'react'
import SidebarFlic from '../../components/ui/Sidebar'
import Header from '../../components/ui/Header'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

// const AppLayout  = () => {
//   return (
//     <>
//       <div className="flex h-screen overflow-hidden">
//         {/* Sidebar */}
//         <SidebarFlic />

//         {/* Contenido derecho */}
//         <div className="flex flex-col flex-1">
//           {/* Header */}
//           <Header />

//           {/* Contenido dinámico de las rutas */}
//           <main className="p-6 overflow-y-auto">
//             <Outlet />
//           </main>
//         </div>
//       </div>
//     </>
//   )
// }

// export default AppLayout 

const AppLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SidebarFlic />

      {/* Contenido derecho */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header />

        {/* Contenido dinámico */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

        <Toaster />
      </div>
    </div>
  )
}

export default AppLayout

