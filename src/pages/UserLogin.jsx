import { useState, useEffect } from "react";
import { users as defaultUsers } from "./../data/authData"; // usuarios existentes
import "./../styles/Login.css";

export default function UserLogin() {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [creating, setCreating] = useState(false); // true si estamos creando cuenta
  const [newDni, setNewDni] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // Combinar usuarios por defecto y los guardados en localStorage
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUserList([...defaultUsers, ...savedUsers]);

    // Cargar datos guardados si existe
    const saved = localStorage.getItem("userData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setDni(parsed.dni);
      setPassword(parsed.password);
      setRemember(true);
    }
  }, []);

  function handleLogin() {
    if (dni.trim() === "" || password.trim() === "") {
      alert("Debes llenar todos los campos.");
      return;
    }

    // Validar usuario existente
    const userExists = userList.find(
      (user) => user.dni === dni && user.password === password
    );

    if (!userExists) {
      alert("Usuario o contraseña incorrectos.");
      return;
    }

    if (remember) {
      localStorage.setItem("userData", JSON.stringify({ dni, password }));
    } else {
      localStorage.removeItem("userData");
    }

    window.location.href = "/user/vota";
  }

  function handleCreateAccount() {
    if (newDni.trim() === "" || newPassword.trim() === "") {
      alert("Debes llenar todos los campos.");
      return;
    }

    // Verificar si el DNI ya existe
    const exists = userList.find((user) => user.dni === newDni);
    if (exists) {
      alert("Este DNI ya está registrado.");
      return;
    }

    const newUser = { dni: newDni, password: newPassword };
    const updatedUsers = [...userList, newUser];
    setUserList(updatedUsers);

    // Guardar solo usuarios nuevos en localStorage
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    localStorage.setItem("users", JSON.stringify([...savedUsers, newUser]));

    alert("Cuenta creada exitosamente!");
    setCreating(false);
    setNewDni("");
    setNewPassword("");
  }

  return (
    <div className="page-wrapper">
      <div className="card">
        <div className="card-header">
          <h1>Sistema de Votación</h1>
        </div>

        <div className="form-container">
          {!creating ? (
            <>
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
              <p
                style={{ cursor: "pointer", color: "blue", marginTop: "10px" }}
                onClick={() => setCreating(true)}
              >
                Crear cuenta nueva
              </p>
            </>
          ) : (
            <>
              <label>Nuevo DNI:</label>
              <input
                type="text"
                value={newDni}
                onChange={(e) => setNewDni(e.target.value)}
              />

              <label>Nueva Contraseña:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <button onClick={handleCreateAccount}>Crear Cuenta</button>
              <p
                style={{ cursor: "pointer", color: "red", marginTop: "10px" }}
                onClick={() => setCreating(false)}
              >
                Volver al login
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
