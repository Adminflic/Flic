import React from 'react'
import SidebarFlic from '../../components/ui/Sidebar'
import Header from '../../components/ui/Header'
import { Outlet } from 'react-router-dom'

const AppLayout  = () => {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <SidebarFlic />

        {/* Contenido derecho */}
        <div className="flex flex-col flex-1">
          {/* Header */}
          <Header />

          {/* Contenido dinámico de las rutas */}
          <main className="p-6 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

export default AppLayout 