import { useState } from "react";

function Step2Candidatos({ formData, setFormData }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  const agregarCandidato = () => {
    if (!nombre.trim()) return alert("El nombre es obligatorio");

    const nuevo = {
      id: Date.now(),
      nombre,
      descripcion,
      foto: imagenUrl, // <-- Guardamos la URL de la imagen
      votos: 0,
    };

    setFormData({
      ...formData,
      candidatos: [...formData.candidatos, nuevo],
    });

    // Limpiar inputs
    setNombre("");
    setDescripcion("");
    setImagenUrl("");
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
        {/* Nombre */}
        <div>
          <label className="font-medium">Nombre del candidato</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="font-medium">Descripción (opcional)</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        {/* Imagen */}
        <div>
          <label className="font-medium">Imagen (URL opcional)</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="Ingresa la URL de la imagen"
            value={imagenUrl}
            onChange={(e) => setImagenUrl(e.target.value)}
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

      {/* Lista de candidatos */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Lista de candidatos agregados:</h3>

        {formData.candidatos.length === 0 ? (
          <p className="text-gray-500">No has agregado candidatos aún</p>
        ) : (
          <ul className="space-y-3">
            {formData.candidatos.map((c) => (
              <li
                key={c.id}
                className="border p-3 rounded flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  {c.foto ? (
                    <img
                      src={c.foto}
                      alt={c.nombre}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium">{c.nombre}</p>
                    {c.descripcion && (
                      <p className="text-xs text-gray-500">{c.descripcion}</p>
                    )}
                  </div>
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
