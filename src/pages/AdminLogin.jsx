import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { admins } from "../data/authData";
import "./../styles/Login.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  const handleLogin = () => {
    const admin = admins.find(
      (a) =>
        a.email === email &&
        a.password === password &&
        a.securityCode === securityCode
    );

    if (admin) {
      navigate("/admin/PanelVoto");
    } else {
      alert("Datos incorrectos");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="card">
        <div className="card-header">
          <h1>Sistema de Votación</h1>
        </div>

        <div className="form-container">
          <label>Correo:</label>
          <input type="email" value={email}
            onChange={(e) => setEmail(e.target.value)} />

          <label>Contraseña:</label>
          <input type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} />

          <label>Código de seguridad:</label>
          <input type="text" value={securityCode}
            onChange={(e) => setSecurityCode(e.target.value)} />

          <button onClick={handleLogin}>Ingresar</button>
        </div>
      </div>
    </div>
  );
}
