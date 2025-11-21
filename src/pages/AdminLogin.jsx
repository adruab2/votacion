import "./../styles/Login.css";

export default function AdminLogin() {
  return (
    <div className="page-wrapper">
      <div className="card">
        <div className="card-header">
          <h1>Sistema de Votación</h1>
        </div>

        <div className="form-container">
          <label>Correo:</label>
          <input type="email" />

          <label>Contraseña:</label>
          <input type="password" />

          <label>Código de seguridad:</label>
          <input type="text" />

          <button>Ingresar</button>
        </div>
      </div>
    </div>
  );
}
