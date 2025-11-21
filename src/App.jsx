import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import AdminPanelVoto from "./pages/AdminPanelVoto";
import UserPanelVoto from "./pages/UserPanelVoto";
import PanelVotacionesPage from "./pages/PanelVotacionesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/" element={<UserLogin />} />

        <Route path="/admin/PanelVoto" element={<AdminPanelVoto />} />
        <Route path="/user/PanelVoto" element={<UserPanelVoto />} />
        <Route path="/panel-votaciones" element={<PanelVotacionesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
