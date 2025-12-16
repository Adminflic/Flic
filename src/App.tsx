import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Login } from "./pages/Login/login";
import AppLayout from "./pages/AppLayout/AppLayout";
// import { RecaudoPage } from "./pages/Recaudos/RecaudoPage";
import { ChequePage } from "./pages/Cheques/ChequePage";
import { ReversionPage } from "./pages/Reversion/ReversionPage";
import { NoNotificadaPage } from "./pages/NoNotificadas/NoNotificadaPage";
import RecaudoPage from "./pages/Recaudos/RecaudoPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<AppLayout />}>
          {/* Cuando entre a /dashboard, redirigir a /dashboard/recaudo */}
          <Route index element={<Navigate to="recaudo" replace />} />
          <Route path="recaudo" element={<RecaudoPage />} />
          <Route path="cheque" element={<ChequePage />} />
          <Route path="reversion" element={<ReversionPage />} />
          <Route path="re-notificacion" element={<NoNotificadaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
