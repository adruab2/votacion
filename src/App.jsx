import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VotacionesProvider } from "./context/VotacionesContext";
import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import AdminPanelVoto from "./pages/AdminPanelVoto";
import VotacionVista from "./pages/VotacionVista";
import CrearVotacion from "./pages/CrearVotacion";

function App() {
  return (
    <VotacionesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/" element={<UserLogin />} />

          <Route path="/user/vota" element={<VotacionVista />} />

          <Route path="/admin/panel-voto" element={<AdminPanelVoto />} />
          <Route path="/admin/crear-votacion" element={<CrearVotacion />} />
        </Routes>
      </BrowserRouter>
    </VotacionesProvider>
  );
}

export default App;
