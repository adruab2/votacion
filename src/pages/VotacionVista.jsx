import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVotaciones } from "../context/VotacionesContext";

export default function VotacionVista() {
  const navigate = useNavigate();
  const { votaciones, registrarVoto } = useVotaciones();

  const [selectedVotes, setSelectedVotes] = useState({}); // guardará la selección por votación
  const [votadas, setVotadas] = useState({}); // votaciones ya enviadas

  // cargar votos previos desde localStorage (específicos del usuario actual)
  useEffect(() => {
    const usuarioActual = JSON.parse(localStorage.getItem("userData"));
    if (usuarioActual && usuarioActual.dni) {
      const votosKey = `votos_${usuarioActual.dni}`;
      const stored = JSON.parse(localStorage.getItem(votosKey)) || {};
      setVotadas(stored);
    }
  }, []);

  const handleSelect = (votacionId, candidatoId) => {
    if (votadas[votacionId]) return; // si ya votó, no permite seleccionar
    
    const votacion = votaciones.find((v) => v.id === votacionId);
    const tipoVotacion = votacion?.tipoVotacion || "unico";

    if (tipoVotacion === "unico") {
      // Voto único: solo un candidato
      setSelectedVotes((prev) => ({ ...prev, [votacionId]: candidatoId }));
    } else if (tipoVotacion === "multiple") {
      // Voto múltiple: array de candidatos
      setSelectedVotes((prev) => {
        const current = prev[votacionId] || [];
        const isSelected = current.includes(candidatoId);
        const updated = isSelected
          ? current.filter((id) => id !== candidatoId)
          : [...current, candidatoId];
        return { ...prev, [votacionId]: updated };
      });
    }
  };

  const handleSubmit = (votacionId) => {
    if (votadas[votacionId]) {
      alert("Ya has votado en esta votación.");
      return;
    }

    const selected = selectedVotes[votacionId];
    if (!selected || (Array.isArray(selected) && selected.length === 0)) {
      alert("Selecciona al menos un candidato antes de enviar.");
      return;
    }

    // Registrar voto(s)
    if (Array.isArray(selected)) {
      // Múltiples votos
      selected.forEach((candidatoId) => {
        registrarVoto(votacionId, candidatoId);
      });
    } else {
      // Un solo voto
      registrarVoto(votacionId, selected);
    }

    // marcar como votada (guardando específicamente para este usuario)
    const usuarioActual = JSON.parse(localStorage.getItem("userData"));
    const updatedVotadas = { ...votadas, [votacionId]: true };
    setVotadas(updatedVotadas);
    
    if (usuarioActual && usuarioActual.dni) {
      const votosKey = `votos_${usuarioActual.dni}`;
      localStorage.setItem(votosKey, JSON.stringify(updatedVotadas));
    }

    alert("¡Voto registrado!");
  };

  // Función para ir a Resultados pasando el origen
  const irAResultados = () => {
    navigate("/votacion/resultados", { state: { from: "votacion" } });
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    if (window.confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      localStorage.removeItem("userData");
      navigate("/");
    }
  };

  // Obtener datos del usuario actual
  const usuarioActual = JSON.parse(localStorage.getItem("userData")) || {};

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
      {/* HEADER */}
      <div className="w-full bg-blue-500 py-6 flex justify-between items-center px-6">
        <h1 className="text-white text-3xl font-bold">Sistema de Votación</h1>
        <div className="flex items-center gap-4">
          <span className="text-white">Bienvenido: {usuarioActual.dni}</span>
          <button
            onClick={irAResultados}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Ver resultados
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="w-11/12 mt-8 space-y-16">
        {votaciones && votaciones.length > 0 ? (
          votaciones.map((votacion) => (
            <div key={votacion.id} className="bg-white p-6 rounded-xl shadow">
              {/* BADGE DE ESTADO */}
              {votacion.badge && (
                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-white text-sm font-semibold ${
                      votacion.badge === "Activa"
                        ? "bg-green-500"
                        : votacion.badge === "Cerrada"
                        ? "bg-gray-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {votacion.badge}
                  </span>
                </div>
              )}

              {/* IMAGEN DE LA VOTACIÓN */}
              {votacion.image && (
                <img
                  src={votacion.image}
                  alt={votacion.titulo}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              )}

              <h2 className="text-2xl font-bold mb-2">{votacion.titulo}</h2>
              <p className="text-gray-600 mb-4">{votacion.descripcion}</p>

              {/* INFORMACIÓN DE FECHAS */}
              <div className="text-sm text-gray-500 mb-4">
                <p>
                  📅 Desde: {votacion.fechaInicio} {votacion.horaInicio || ""}
                </p>
                <p>
                  📅 Hasta: {votacion.fechaFin} {votacion.horaFin || ""}
                </p>
              </div>

              {/* MENSAJE SI YA VOTÓ */}
              {votadas[votacion.id] && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-blue-800 font-semibold">
                    ✓ Ya has completado tu voto en esta votación
                  </p>
                </div>
              )}

              {/* LISTA DE CANDIDATOS */}
              {votacion.candidatos && votacion.candidatos.length > 0 ? (
                <>
                  {votacion.tipoVotacion === "multiple" && (
                    <p className="text-sm text-blue-600 mb-4 font-semibold">
                      ℹ️ Puedes seleccionar múltiples candidatos
                    </p>
                  )}
                  <div className="grid grid-cols-3 gap-6 mt-6">
                    {votacion.candidatos.map((cand) => {
                      const isSelected =
                        votacion.tipoVotacion === "multiple"
                          ? (selectedVotes[votacion.id] || []).includes(cand.id)
                          : selectedVotes[votacion.id] === cand.id;

                      return (
                        <div
                          key={cand.id}
                          onClick={() => handleSelect(votacion.id, cand.id)}
                          className={`flex flex-col items-center p-4 rounded-xl border cursor-pointer transition 
                            ${
                              isSelected
                                ? "bg-blue-100 border-blue-500 border-2"
                                : "bg-white border-gray-300 hover:border-blue-300"
                            }
                            ${votadas[votacion.id] ? "opacity-50 cursor-not-allowed" : ""}
                          `}
                        >
                          {/* CHECKBOX/RADIO INDICATOR */}
                          <div className="mb-2">
                            {votacion.tipoVotacion === "multiple" ? (
                              <div
                                className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                                  isSelected
                                    ? "bg-blue-500 border-blue-500"
                                    : "border-gray-300"
                                }`}
                              >
                                {isSelected && (
                                  <svg
                                    className="w-4 h-4 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={3}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                )}
                              </div>
                            ) : (
                              <div
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                  isSelected
                                    ? "bg-blue-500 border-blue-500"
                                    : "border-gray-300"
                                }`}
                              >
                                {isSelected && (
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* IMAGEN DEL CANDIDATO */}
                          {cand.foto && (
                            <img
                              src={cand.foto}
                              alt={cand.nombre}
                              className="w-20 h-20 object-cover rounded-full mb-2"
                            />
                          )}

                          {/* NOMBRE Y DESCRIPCIÓN */}
                          <div className="text-gray-700 flex flex-col items-center text-center">
                            <p className="font-bold">{cand.nombre}</p>
                            <p className="text-sm text-gray-500">
                              {cand.descripcion || "Candidato"}
                            </p>
                            {cand.votos && (
                              <p className="text-xs text-gray-400 mt-2">
                                {cand.votos} voto{cand.votos !== 1 ? "s" : ""}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                  <p className="text-yellow-800">
                    No hay candidatos disponibles en esta votación
                  </p>
                </div>
              )}

            {/* BOTÓN ENVIAR */}
            <button
              onClick={() => handleSubmit(votacion.id)}
              className={`px-8 py-2 rounded-full font-semibold mt-6 ${
                votadas[votacion.id]
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              disabled={votadas[votacion.id]}
            >
              {votadas[votacion.id] ? "Votación completada" : "Enviar"}
            </button>
          </div>
        ))
        ) : (
          <div className="w-full bg-white rounded-xl shadow p-8 text-center">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No hay votaciones disponibles
            </h3>
            <p className="text-gray-600">
              Por el momento no hay votaciones activas. Vuelve más tarde para participar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
