import { useState } from "react";

function Step2Candidatos({ formData, setFormData }) {
  const [newCandidate, setNewCandidate] = useState({
    nombre: "",
    descripcion: "",
    foto: "",
  });

  const handleAddCandidate = () => {
    if (!newCandidate.nombre.trim()) {
      alert("El nombre del candidato es obligatorio");
      return;
    }

    const updatedCandidatos = [
      ...formData.candidatos,
      { ...newCandidate, id: Date.now() },
    ];

    setFormData({ ...formData, candidatos: updatedCandidatos });
    setNewCandidate({ nombre: "", descripcion: "", foto: "" });
  };

  const handleRemoveCandidate = (id) => {
    const updatedCandidatos = formData.candidatos.filter((c) => c.id !== id);
    setFormData({ ...formData, candidatos: updatedCandidatos });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCandidate({ ...newCandidate, foto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Candidatos</h2>
      <p className="text-gray-600 mb-6">
        Agrega las opciones disponibles para votar
      </p>

      {/* Formulario de agregar candidato */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Nuevo Candidato
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              value={newCandidate.nombre}
              onChange={(e) =>
                setNewCandidate({ ...newCandidate, nombre: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej. Opción A"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción (Opcional)
            </label>
            <textarea
              value={newCandidate.descripcion}
              onChange={(e) =>
                setNewCandidate({
                  ...newCandidate,
                  descripcion: e.target.value,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Breve descripción..."
              rows="2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Foto / Imagen (Opcional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <div className="flex justify-end mt-2">
            <button
              onClick={handleAddCandidate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Agregar Candidato
            </button>
          </div>
        </div>
      </div>

      {/* Lista de candidatos */}
      {formData.candidatos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.candidatos.map((candidato) => (
            <div
              key={candidato.id}
              className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              {candidato.foto ? (
                <img
                  src={candidato.foto}
                  alt={candidato.nombre}
                  className="w-16 h-16 rounded-lg object-cover mr-4"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4 text-gray-400">
                  <svg
                    className="w-8 h-8"
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
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">
                  {candidato.nombre}
                </h4>
                <p className="text-sm text-gray-500 line-clamp-1">
                  {candidato.descripcion}
                </p>
              </div>
              <button
                onClick={() => handleRemoveCandidate(candidato.id)}
                className="text-red-500 hover:text-red-700 p-2"
                title="Eliminar"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p>No hay candidatos agregados aún.</p>
        </div>
      )}
    </div>
  );
}

export default Step2Candidatos;
