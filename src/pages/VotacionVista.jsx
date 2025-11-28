import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVotaciones } from "../context/VotacionesContext";

export default function VotacionVista() {
  const navigate = useNavigate();
  const { votaciones, registrarVoto } = useVotaciones();

  const [selectedVotes, setSelectedVotes] = useState({}); // guardará la selección por votación
  const [votadas, setVotadas] = useState({}); // votaciones ya enviadas

  // cargar votos previos desde localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("votosUsuario")) || {};
    setVotadas(stored);
  }, []);

  const handleSelect = (votacionId, candidatoId) => {
    if (votadas[votacionId]) return; // si ya votó, no permite seleccionar
    setSelectedVotes((prev) => ({ ...prev, [votacionId]: candidatoId }));
  };

  const handleSubmit = (votacionId) => {
    if (votadas[votacionId]) {
      alert("Ya has votado en esta votación.");
      return;
    }

    const selected = selectedVotes[votacionId];
    if (!selected) {
      alert("Selecciona un candidato antes de enviar.");
      return;
    }

    registrarVoto(votacionId, selected);

    // marcar como votada
    const updatedVotadas = { ...votadas, [votacionId]: true };
    setVotadas(updatedVotadas);
    localStorage.setItem("votosUsuario", JSON.stringify(updatedVotadas));

    alert("¡Voto registrado!");
  };

  // Función para ir a Resultados pasando el origen
  const irAResultados = () => {
    navigate("/votacion/resultados", { state: { from: "votacion" } });
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
      {/* HEADER */}
      <div className="w-full bg-blue-500 py-6 flex justify-between items-center px-6">
        <h1 className="text-white text-3xl font-bold">Sistema de Votación</h1>
        <button
          onClick={irAResultados}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Ver resultados
        </button>
      </div>

      <div className="w-11/12 mt-8 space-y-16">
        {votaciones.map((votacion) => (
          <div key={votacion.id} className="bg-white p-6 rounded-xl shadow">
            {/* IMAGEN DE LA VOTACIÓN */}
            {votacion.image && (
              <img
                src={votacion.image}
                alt={votacion.titulo}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
            )}

            <h2 className="text-2xl font-bold">{votacion.titulo}</h2>
            <p className="text-gray-600">{votacion.descripcion}</p>

            {/* LISTA DE CANDIDATOS */}
            <div className="grid grid-cols-3 gap-6 mt-6">
              {votacion.candidatos.map((cand) => (
                <div
                  key={cand.id}
                  onClick={() => handleSelect(votacion.id, cand.id)}
                  className={`flex flex-col items-center p-4 rounded-xl border cursor-pointer transition 
                    ${
                      selectedVotes[votacion.id] === cand.id
                        ? "bg-blue-100 border-blue-500"
                        : "bg-white border-gray-300"
                    }
                    ${votadas[votacion.id] ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  {/* IMAGEN DEL CANDIDATO */}
                  {cand.foto && (
                    <img
                      src={cand.foto}
                      alt={cand.nombre}
                      className="w-20 h-20 object-cover rounded-full mb-2"
                    />
                  )}

                  {/* NOMBRE Y DESCRIPCIÓN */}
                  <div className="text-gray-700 flex flex-col items-center">
                    <p className="font-bold">{cand.nombre}</p>
                    <p className="text-sm">{cand.descripcion || "Candidato"}</p>
                  </div>
                </div>
              ))}
            </div>

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
        ))}
      </div>
    </div>
  );
}
