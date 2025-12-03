import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VotacionesProvider } from "./context/VotacionesContext";
import ProtectedRoute from "./components/ProtectedRoute";

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

          {/* USUARIO - RUTAS PROTEGIDAS */}
          <Route
            path="/user/vota"
            element={
              <ProtectedRoute isAdmin={false}>
                <VotacionVista />
              </ProtectedRoute>
            }
          />

          {/* ADMIN - RUTAS PROTEGIDAS */}
          <Route
            path="/admin/panel-voto"
            element={
              <ProtectedRoute isAdmin={true}>
                <AdminPanelVoto />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/crear-votacion"
            element={
              <ProtectedRoute isAdmin={true}>
                <CrearVotacion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/votacion/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <AdminVotacionDetalle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/editar-votacion/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <EditarVotacion />
              </ProtectedRoute>
            }
          />

          {/* RESULTADOS */}
          <Route path="/votacion/resultados" element={<Resultados />} />
        </Routes>
      </VotacionesProvider>
    </BrowserRouter>
  );
}

export default App;
