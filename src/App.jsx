import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import AdminPanelVoto from "./pages/AdminPanelVoto";
import UserPanelVoto from "./pages/UserPanelVoto";
import VotacionVista from "./pages/VotacionVista";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/" element={<UserLogin />} />

        <Route path="/user/vota" element={<VotacionVista />} />

        <Route path="/admin/PanelVoto" element={<AdminPanelVoto />} />
        <Route path="/user/PanelVoto" element={<UserPanelVoto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
