import { useNavigate } from "react-router-dom";
import { useVotaciones } from "../context/VotacionesContext";

function PanelVotacionesPage() {
  const navigate = useNavigate();
  const { votaciones } = useVotaciones();

  const getBadgeColor = (badge) => {
    switch (badge.toLowerCase()) {
      case "nueva":
      case "activa":
        return "bg-blue-500";
      case "cerrada":
      case "programada":
        return "bg-gray-400";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panel de Votaciones</h1>
              <p className="text-gray-600 mt-1">
                Gestiona y administra todas las votaciones activas
              </p>
            </div>

            {/* BOTONES DEL HEADER */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/admin/crear-votacion")}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Crear Nueva Votación
              </button>

              <button
                onClick={() => navigate("/votacion/resultados", { state: { from: "admin" } })}
                className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Ver Resultados
              </button>
            </div>
          </div>
        </div>

        {/* GRID DE VOTACIONES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* CARD PARA CREAR VOTACIÓN */}
          <div
            onClick={() => navigate("/admin/crear-votacion")}
            className="border-2 border-dashed border-blue-300 rounded-xl p-8 flex flex-col items-center justify-center hover:border-blue-400 cursor-pointer bg-blue-400/10"
          >
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              Crear Nueva Votación
            </h3>
            <p className="text-sm text-gray-600 text-center">
              Haz clic aquí para comenzar una nueva votación
            </p>
          </div>

          {/* TARJETAS DE VOTACIONES */}
          {votaciones.map((votacion) => (
            <div
              key={votacion.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition"
            >
              <div className="relative">
                {votacion.image && (
                  <img
                    src={votacion.image}
                    alt={votacion.titulo}
                    className="w-full h-40 object-cover rounded-t-xl"
                  />
                )}

                <span
                  className={`absolute top-3 right-3 px-3 py-1 text-white text-xs rounded-full ${getBadgeColor(
                    votacion.badge
                  )}`}
                >
                  {votacion.badge}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold">{votacion.titulo}</h3>
                <p className="text-gray-600 text-sm mb-4">{votacion.descripcion}</p>

                <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                  <span>{votacion.votos} Fecha de caducidad:</span>
                  <span>{votacion.fechaFin}</span>
                </div>

                {/* BOTONES DE ACCIÓN */}
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/votacion/${votacion.id}`)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Ver detalles
                  </button>

                  <button
                    onClick={() => navigate(`/admin/editar-votacion/${votacion.id}`)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Editar
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default PanelVotacionesPage;
