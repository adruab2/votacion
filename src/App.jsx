import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import AdminPanelVoto from "./pages/AdminPanelVoto";
import VotacionVista from "./pages/VotacionVista";
import CrearVotacion from "./pages/CrearVotacion";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/" element={<UserLogin />} />

        <Route path="/user/vota" element={<VotacionVista />} />

        <Route path="/admin/panel-voto" element={<AdminPanelVoto />} />
        <Route path="/admin/crear-votacion" element={<CrearVotacion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
