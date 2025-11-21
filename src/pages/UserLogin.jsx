import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../data/authData";
import "./../styles/Login.css";

export default function UserLogin() {
  const navigate = useNavigate();

  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = users.find(
      (u) => u.dni === dni && u.password === password
    );

    if (user) {
      navigate("/user/PanelVoto");
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
          <label>DNI:</label>
          <input type="text" value={dni}
            onChange={(e) => setDni(e.target.value)} />

          <label>Contraseña:</label>
          <input type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} />

          <div className="checkbox-wrapper">
            <input type="checkbox" />
            <label>Recordarme</label>
          </div>

          <button onClick={handleLogin}>Ingresar</button>
        </div>
      </div>
    </div>
  );
}
