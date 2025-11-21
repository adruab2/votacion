import { useState, useEffect } from "react";
import "./../styles/Login.css";

export default function UserLogin() {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // Load data ONLY if it exists
  useEffect(() => {
    const saved = localStorage.getItem("userData");

    if (saved) {
      const parsed = JSON.parse(saved);
      setDni(parsed.dni);
      setPassword(parsed.password);
      setRemember(true);
    }
  }, []);

  function handleLogin() {
    // VALIDATION – prevent empty login
    if (dni.trim() === "" || password.trim() === "") {
      alert("Debes llenar todos los campos.");
      return;
    }

    // Save only when checkbox is active AND fields are not empty
    if (remember) {
      localStorage.setItem(
        "userData",
        JSON.stringify({ dni, password })
      );
    } else {
      localStorage.removeItem("userData");
    }

    // Redirect if login OK
    window.location.href = "/user/PanelVoto";
  }

  return (
    <div className="page-wrapper">
      <div className="card">
        <div className="card-header">
          <h1>Sistema de Votación</h1>
        </div>

        <div className="form-container">
          <label>DNI:</label>
          <input
            type="text"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />

          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            <label>Recordarme</label>
          </div>

          <button onClick={handleLogin}>Ingresar</button>
        </div>
      </div>
    </div>
  );
}
