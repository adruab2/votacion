import { useNavigate } from "react-router-dom";
import { useVotaciones } from "../context/VotacionesContext";

export default function Resultados() {
  const navigate = useNavigate();
  const { votaciones } = useVotaciones();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resultados</h1>
            <p className="text-gray-600 mt-1">Resumen completo de votaciones</p>
          </div>

          <button
            onClick={() => navigate("/admin/panel-voto")}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Volver al Panel
          </button>
        </div>

        {/* LISTA DE VOTACIONES */}
        <div className="space-y-10">
          {votaciones.map((vot) => {

            const candidatos = vot.candidatos || []; // 🔥 Siempre un array

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
                <h2 className="text-2xl font-bold text-gray-900">
                  {vot.titulo}
                </h2>
                <p className="text-gray-600 mb-6">{vot.descripcion}</p>

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
                        maxVotos > 0
                          ? (cand.votos / maxVotos) * 100
                          : 0;

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
          })}
        </div>

      </div>
    </div>
  );
}
