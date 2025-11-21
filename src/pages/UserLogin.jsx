import "./../styles/Login.css";

export default function UserLogin() {
  return (
    <div className="page-wrapper">
      <div className="card">
        <div className="card-header">
          <h1>Sistema de Votación</h1>
        </div>

        <div className="form-container">
          <label>DNI:</label>
          <input type="text" />

          <label>Contraseña:</label>
          <input type="password" />

          <div className="checkbox-wrapper">
            <input type="checkbox" />
            <label>Recordarme</label>
          </div>

          <button>Ingresar</button>
        </div>
      </div>
    </div>
  );
}
