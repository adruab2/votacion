import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, isAdmin = false }) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const adminData = JSON.parse(localStorage.getItem("adminData"));

  // Para rutas de usuario
  if (!isAdmin) {
    if (!userData) {
      return <Navigate to="/" replace />;
    }
    return children;
  }

  // Para rutas de admin
  if (isAdmin) {
    if (!adminData) {
      return <Navigate to="/admin/login" replace />;
    }
    return children;
  }

  return children;
}
