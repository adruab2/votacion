import { useState } from "react";

function Step1InformacionGeneral({
  formData,
  setFormData,
  errors = {},
  setErrors,
}) {
  const [imagePreview, setImagePreview] = useState(formData.imagen || null);
  const [imageUrl, setImageUrl] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name] && setErrors) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateField = (name, value) => {
    if (!setErrors) return true;

    let error = "";

    switch (name) {
      case "titulo":
        if (!value.trim()) {
          error = "El título es obligatorio";
        } else if (value.trim().length < 5) {
          error = "El título debe tener al menos 5 caracteres";
        } else if (value.trim().length > 100) {
          error = "El título no puede exceder 100 caracteres";
        }
        break;

      case "descripcion":
        if (!value.trim()) {
          error = "La descripción es obligatoria";
        } else if (value.trim().length < 10) {
          error = "La descripción debe tener al menos 10 caracteres";
        } else if (value.trim().length > 500) {
          error = "La descripción no puede exceder 500 caracteres";
        }
        break;

      case "categoria":
        if (!value) {
          error = "Debes seleccionar una categoría";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    return error === "";
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({
          ...prev,
          imagen: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlUpload = () => {
    if (imageUrl) {
      setImagePreview(imageUrl);
      setFormData((prev) => ({
        ...prev,
        imagen: imageUrl,
      }));
      setImageUrl("");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Información General
      </h2>
      <p className="text-gray-600 mb-6">
        Proporciona los datos básicos de tu votación
      </p>

      <div className="space-y-6">
        {/* Título */}
        <div>
          <label
            htmlFor="titulo"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Título de la Votación <span className="text-red-500">*</span>
          </label>
          <input
            id="titulo"
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Ej. Votación de Comida para Fin de Año"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
              errors.titulo ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={errors.titulo ? "true" : "false"}
            aria-describedby={errors.titulo ? "titulo-error" : undefined}
          />
          {errors.titulo && (
            <p id="titulo-error" className="text-xs text-red-600 mt-1">
              {errors.titulo}
            </p>
          )}
          {!errors.titulo && (
            <p className="text-xs text-gray-500 mt-1">
              Este será el nombre visible de tu votación
            </p>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label
            htmlFor="descripcion"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Descripción <span className="text-red-500">*</span>
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Describe el propósito y detalles de esta votación..."
            rows={5}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none ${
              errors.descripcion ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={errors.descripcion ? "true" : "false"}
            aria-describedby={
              errors.descripcion ? "descripcion-error" : undefined
            }
          />
          {errors.descripcion && (
            <p id="descripcion-error" className="text-xs text-red-600 mt-1">
              {errors.descripcion}
            </p>
          )}
          {!errors.descripcion && (
            <p className="text-xs text-gray-500 mt-1">
              Proporciona contexto e instrucciones para los votantes
            </p>
          )}
        </div>

        {/* Categoría */}
        <div>
          <label
            htmlFor="categoria"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Categoría <span className="text-red-500">*</span>
          </label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white ${
              errors.categoria ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={errors.categoria ? "true" : "false"}
            aria-describedby={errors.categoria ? "categoria-error" : undefined}
          >
            <option value="">Selecciona una categoría</option>
            <option value="comida">Comida</option>
            <option value="entretenimiento">Entretenimiento</option>
            <option value="proyectos">Proyectos</option>
            <option value="diseño">Diseño</option>
            <option value="politicas">Políticas</option>
            <option value="beneficios">Beneficios</option>
            <option value="otros">Otros</option>
          </select>
          {errors.categoria && (
            <p id="categoria-error" className="text-xs text-red-600 mt-1">
              {errors.categoria}
            </p>
          )}
          {!errors.categoria && (
            <p className="text-xs text-gray-500 mt-1">
              Ayuda a organizar y filtrar las votaciones
            </p>
          )}
        </div>

        {/* Imagen de Portada */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Imagen de Portada <span className="text-gray-500">(Opcional)</span>
          </label>

          {/* Upload buttons */}
          <div className="flex gap-3 mb-4">
            <label
              htmlFor="file-upload"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition cursor-pointer"
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
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              Subir Archivo
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="URL de imagen"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                aria-label="URL de imagen"
              />
              <button
                type="button"
                onClick={handleUrlUpload}
                className="px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                aria-label="Cargar imagen desde URL"
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
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step1InformacionGeneral;
