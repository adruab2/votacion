import { useState } from "react";

function Step2Candidatos({ formData, setFormData }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const agregarCandidato = () => {
    if (!nombre.trim()) return alert("El nombre es obligatorio");

    const nuevo = {
      id: Date.now(),
      nombre,
      descripcion,
      votos: 0,
    };

    setFormData({
      ...formData,
      candidatos: [...formData.candidatos, nuevo],
    });

    setNombre("");
    setDescripcion("");
  };

  const eliminarCandidato = (id) => {
    setFormData({
      ...formData,
      candidatos: formData.candidatos.filter((c) => c.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Agregar Candidatos</h2>

      <div className="space-y-4">
        <div>
          <label className="font-medium">Nombre del candidato</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium">Descripción (opcional)</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <button
          onClick={agregarCandidato}
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Agregar candidato
        </button>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Lista de candidatos agregados:</h3>

        {formData.candidatos.length === 0 ? (
          <p className="text-gray-500">No has agregado candidatos aún</p>
        ) : (
          <ul className="space-y-3">
            {formData.candidatos.map((c) => (
              <li
                key={c.id}
                className="border p-3 rounded flex justify-between"
              >
                <div>
                  <p className="font-medium">{c.nombre}</p>
                  {c.descripcion && (
                    <p className="text-sm text-gray-600">{c.descripcion}</p>
                  )}
                </div>

                <button
                  onClick={() => eliminarCandidato(c.id)}
                  className="text-red-600 font-semibold"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Step2Candidatos;
