import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVotaciones } from "../context/VotacionesContext";

export default function VotacionVista() {
  const navigate = useNavigate();
  const { votaciones, registrarVoto } = useVotaciones();

  const [selectedVotes, setSelectedVotes] = useState({}); // guardará la selección por votación

  const handleSelect = (votacionId, candidatoId) => {
    setSelectedVotes((prev) => ({ ...prev, [votacionId]: candidatoId }));
  };

  const handleSubmit = (votacionId) => {
    const selected = selectedVotes[votacionId];
    if (!selected) {
      alert("Selecciona un candidato antes de enviar.");
      return;
    }

    registrarVoto(votacionId, selected);
    alert("¡Voto registrado!");
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full bg-blue-500 py-6 text-center text-white text-3xl font-bold">
        Sistema de Votación
      </div>

      <div className="w-11/12 mt-8 space-y-16">
        {votaciones.map((votacion) => (
          <div key={votacion.id} className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold">{votacion.titulo}</h2>
            <p className="text-gray-600">{votacion.descripcion}</p>

            {/* LISTA DE CANDIDATOS */}
            <div className="grid grid-cols-3 gap-6 mt-6">
              {votacion.candidatos.map((cand) => (
                <div
                  key={cand.id}
                  onClick={() => handleSelect(votacion.id, cand.id)}
                  className={`flex p-4 rounded-xl border cursor-pointer transition 
                    ${selectedVotes[votacion.id] === cand.id ? "bg-blue-100 border-blue-500" : "bg-white border-gray-300"}
                  `}
                >
                  <img
                    src={cand.foto}
                    alt={cand.nombre}
                    className="w-28 h-36 object-cover rounded-lg"
                  />
                  <div className="ml-4 text-gray-700 flex flex-col justify-center">
                    <p className="font-bold">{cand.nombre}</p>
                    <p>{cand.descripcion || "Candidato"}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* BOTÓN ENVIAR */}
            <button
              onClick={() => handleSubmit(votacion.id)}
              className="bg-blue-500 text-white px-8 py-2 rounded-full font-semibold mt-6 hover:bg-blue-600"
            >
              Enviar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
