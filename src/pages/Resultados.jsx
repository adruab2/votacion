import { useNavigate, useLocation } from "react-router-dom";
import { useVotaciones } from "../context/VotacionesContext";

export default function Resultados() {
  const navigate = useNavigate();
  const location = useLocation();
  const { votaciones } = useVotaciones();

  // Determinar de dónde viene el usuario
  const from = location.state?.from || "user"; // default "user"
  const isAdmin = from === "admin";

  // Obtener datos del usuario actual
  const usuarioActual = JSON.parse(localStorage.getItem("userData"));
  const adminActual = JSON.parse(localStorage.getItem("adminData"));

  const handleVolver = () => {
    if (from === "admin") {
      navigate("/admin/panel-voto");
    } else {
      navigate("/user/vota");
    }
  };

  // Verificar si una votación puede ser vista según su visibilidad
  const puedeVerResultados = (votacion) => {
    // Los admins siempre ven todo
    if (isAdmin) return true;

    // Para usuarios normales, verificar visibilidad
    const now = new Date();
    const fechaFin = new Date(
      `${votacion.fechaFin}T${votacion.horaFin || "23:59"}`
    );

    switch (votacion.visibilidad) {
      case "ocultos":
        // Solo visible para admins (ya se filtra arriba)
        return false;
      case "finalizar":
        // Visible solo después de que termine la votación
        return now > fechaFin;
      case "tiempo-real":
        // Siempre visible
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resultados</h1>
            <p className="text-gray-600 mt-1">Resumen completo de votaciones</p>
            {!isAdmin && (
              <p className="text-xs text-gray-500 mt-2">
                Usuario: {usuarioActual?.dni || "N/A"}
              </p>
            )}
          </div>

          <button
            onClick={handleVolver}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Volver al Panel
          </button>
        </div>

        {/* LISTA DE VOTACIONES */}
        <div className="space-y-10">
          {votaciones.filter((vot) => puedeVerResultados(vot)).length === 0 ? (
            <div className="bg-white rounded-xl shadow p-8 text-center">
              <svg
                className="w-16 h-16 mx-auto text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {isAdmin
                  ? "No hay resultados disponibles"
                  : "No hay resultados disponibles para ti"}
              </h3>
              <p className="text-gray-600">
                {isAdmin
                  ? "Por el momento no hay votaciones con resultados."
                  : "Los resultados aún no están disponibles. Algunas votaciones pueden tener sus resultados ocultos o la votación aún no ha finalizado."}
              </p>
            </div>
          ) : (
            votaciones
              .filter((vot) => puedeVerResultados(vot))
              .map((vot) => {
                const candidatos = vot.candidatos || [];
                const totalVotos = candidatos.reduce(
                  (sum, c) => sum + (c.votos || 0),
                  0
                );
                const maxVotos =
                  candidatos.length > 0
                    ? Math.max(...candidatos.map((c) => c.votos || 0))
                    : 1;

                return (
                  <div
                    key={vot.id}
                    className="bg-white shadow-sm rounded-xl p-6 border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {vot.titulo}
                        </h2>
                        <p className="text-gray-600 mb-2">{vot.descripcion}</p>
                      </div>
                      {vot.badge && (
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-white text-xs font-semibold ${
                            vot.badge === "Activa"
                              ? "bg-green-500"
                              : vot.badge === "Cerrada"
                              ? "bg-gray-500"
                              : "bg-blue-500"
                          }`}
                        >
                          {vot.badge}
                        </span>
                      )}
                    </div>

                    <div className="text-sm text-gray-500 mb-4 pb-4 border-b">
                      <p>
                        📅 {vot.fechaInicio} - {vot.fechaFin}
                      </p>
                      <p className="mt-1 text-xs">
                        🔒 Visibilidad:{" "}
                        {vot.visibilidad === "ocultos"
                          ? "Ocultos (Solo Admin)"
                          : vot.visibilidad === "finalizar"
                          ? "Después de finalizar"
                          : "Tiempo real"}
                      </p>
                    </div>

                    {candidatos.length === 0 ? (
                      <p className="text-gray-500 italic">
                        Esta votación no tiene candidatos registrados.
                      </p>
                    ) : (
                      <div className="space-y-6">
                        {candidatos.map((cand) => {
                          const porcentaje =
                            totalVotos > 0
                              ? ((cand.votos / totalVotos) * 100).toFixed(1)
                              : 0;
                          const width =
                            maxVotos > 0 ? (cand.votos / maxVotos) * 100 : 0;

                          return (
                            <div
                              key={cand.id}
                              className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                            >
                              <div className="flex items-center gap-4 mb-2">
                                {cand.foto && (
                                  <img
                                    src={cand.foto}
                                    alt={cand.nombre}
                                    className="w-14 h-14 rounded-lg object-cover"
                                  />
                                )}
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-800">
                                    {cand.nombre}
                                  </h3>
                                  <p className="text-gray-600 text-sm">
                                    {cand.votos || 0} voto(s) – {porcentaje}%
                                  </p>
                                </div>
                              </div>

                              <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                                <div
                                  className="bg-blue-500 h-3 rounded-full"
                                  style={{ width: `${width}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
}
