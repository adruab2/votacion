import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VotacionesProvider } from "./context/VotacionesContext";

import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import AdminPanelVoto from "./pages/AdminPanelVoto";
import VotacionVista from "./pages/VotacionVista";
import CrearVotacion from "./pages/CrearVotacion";
import Resultados from "./pages/Resultados";

// nuevas páginas
import AdminVotacionDetalle from "./pages/AdminVotacionDetalle";
import EditarVotacion from "./pages/EditarVotacion";

function App() {
  return (
    <BrowserRouter>
      <VotacionesProvider>
        <Routes>
          {/* LOGIN */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/" element={<UserLogin />} />

          {/* USUARIO */}
          <Route path="/user/vota" element={<VotacionVista />} />

          {/* ADMIN */}
          <Route path="/admin/panel-voto" element={<AdminPanelVoto />} />
          <Route path="/admin/crear-votacion" element={<CrearVotacion />} />
          {/* detalles y editar */}
          <Route path="/admin/votacion/:id" element={<DetallesVotacion />} />
          <Route path="/admin/votacion/:id/editar" element={<EditarVotacion />} />

          {/* RESULTADOS */}
          <Route path="/votacion/resultados" element={<Resultados />} />
        </Routes>
      </VotacionesProvider>
    </BrowserRouter>
  );
}

export default App;
