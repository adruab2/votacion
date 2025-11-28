import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVotaciones } from "../context/VotacionesContext";

export default function VotacionVista() {
  const navigate = useNavigate();
  const { votaciones, registrarVoto } = useVotaciones();

  const [selectedVotes, setSelectedVotes] = useState({});
  const [votadas, setVotadas] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("votosUsuario")) || {};
    setVotadas(stored);
  }, []);

  const handleSelect = (votacionId, candidatoId) => {
    if (votadas[votacionId]) return;
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

    const updatedVotadas = { ...votadas, [votacionId]: true };
    setVotadas(updatedVotadas);
    localStorage.setItem("votosUsuario", JSON.stringify(updatedVotadas));

    alert("¡Voto registrado!");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center">
      
      {/* HEADER MODERNO */}
      <header className="w-full bg-blue-500 backdrop-blur-md py-8 shadow-sm border-b border-gray-200 mb-8">
        <h1 className="text-center text-4xl font-extrabold text-gray-800 tracking-tight">
          🗳️ Sistema de Votación
        </h1>
      </header>

      <div className="w-11/12 lg:w-4/5 max-w-5xl space-y-20 mb-16">
        {votaciones.map((votacion) => (
          <div
            key={votacion.id}
            className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-xl border border-gray-100 
                    transition hover:shadow-2xl duration-300"
          >
            {/* IMAGEN PRINCIPAL */}
            {votacion.image && (
              <img
                src={votacion.image}
                alt={votacion.titulo}
                className="w-full h-56 object-cover rounded-2xl shadow-md mb-6"
              />
            )}

            {/* TITULO */}
            <h2 className="text-3xl font-bold text-gray-900">{votacion.titulo}</h2>
            <p className="text-gray-600 mt-1">{votacion.descripcion}</p>

            {/* CANDIDATOS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {votacion.candidatos.map((cand) => {
                const selected = selectedVotes[votacion.id] === cand.id;
                const disabled = votadas[votacion.id];

                return (
                  <div
                    key={cand.id}
                    onClick={() => handleSelect(votacion.id, cand.id)}
                    className={`
                      flex flex-col items-center p-6 rounded-2xl border transition shadow-sm cursor-pointer
                      backdrop-blur-xl bg-white/70 hover:shadow-xl hover:border-gray-400 duration-300
                      ${
                        selected
                          ? "border-blue-500 shadow-blue-200 bg-blue-50/80"
                          : "border-gray-200"
                      }
                      ${disabled ? "opacity-40 cursor-not-allowed hover:shadow-sm" : ""}
                    `}
                  >
                    {/* FOTO
                    {cand.foto ? (
                      <img
                        src={cand.foto}
                        alt={cand.nombre}
                        className="w-24 h-24 mb-3 rounded-full object-cover shadow-md border"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gray-200 mb-3 flex items-center justify-center text-gray-600">
                        Foto
                      </div>
                    )}*/}

                    {/* TEXTO */}
                    <h3 className="text-lg font-semibold text-gray-900">{cand.nombre}</h3>
                    <p className="text-gray-500 text-sm text-center">
                      {cand.descripcion || "Candidato"}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* BOTONES */}
            <div className="flex flex-wrap gap-4 mt-10">
              {/* ENVIAR */}
              <button
                onClick={() => handleSubmit(votacion.id)}
                disabled={votadas[votacion.id]}
                className={`
                  px-8 py-3 rounded-full font-semibold transition shadow-lg
                  ${
                    votadas[votacion.id]
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed shadow-none"
                      : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-2xl"
                  }
                `}
              >
                {votadas[votacion.id] ? "Votación completa" : "Enviar voto"}
              </button>

              {/* RESULTADOS */}
              <button
                onClick={() => navigate("/votacion/resultados")}
                className="px-8 py-3 rounded-full font-semibold bg-green-600 text-white
                          shadow-lg hover:bg-green-700 transition hover:shadow-2xl"
              >
                Ver resultados
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}