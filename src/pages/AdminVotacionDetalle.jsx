import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useVotaciones } from "../context/VotacionesContext";

export default function AdminVotacionDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { votaciones } = useVotaciones();

  const votacion = votaciones.find((v) => String(v.id) === String(id));

  if (!votacion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-700">Votación no encontrada</p>
          <button onClick={() => navigate("/admin/panel-voto")} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Volver</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{votacion.titulo}</h1>
            <p className="text-sm text-gray-500">{votacion.descripcion}</p>
          </div>
          <div>
            <button onClick={() => navigate(`/admin/editar-votacion/${votacion.id}`)} className="px-3 py-1 bg-blue-500 text-white rounded mr-2">Editar</button>
            <button onClick={() => navigate("/admin/panel-voto")} className="px-3 py-1 bg-gray-200 rounded">Cerrar</button>
          </div>
        </div>

        {votacion.image && (
          <img src={votacion.image} alt={votacion.titulo} className="w-full h-56 object-cover rounded mt-4" />
        )}

        <div className="mt-4">
          <p><strong>Fecha fin:</strong> {votacion.fechaFin}</p>
          <p><strong>Estado:</strong> {votacion.estado}</p>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Candidatos</h3>
          <ul className="space-y-2">
            {votacion.candidatos?.map((c) => (
              <li key={c.id} className="flex justify-between items-center border p-2 rounded">
                <span>{c.nombre}</span>
                <span className="text-sm text-gray-600">{c.votos ?? 0} votos</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
