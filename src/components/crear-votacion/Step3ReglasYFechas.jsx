function Step3ReglasYFechas({ formData, setFormData, errors = {}, setErrors }) {
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

    // Validate start date in real-time
    if (name === "fechaInicio" && value && setErrors) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const selectedDate = new Date(value);

      if (selectedDate < today) {
        setErrors((prev) => ({
          ...prev,
          fechaInicio: "La fecha de inicio no puede ser anterior a hoy",
        }));
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Reglas y Fechas</h2>
      <p className="text-gray-600 mb-6">
        Configura las reglas y el período de votación
      </p>

      <div className="space-y-8">
        {/* Duración */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Duración</h3>
          <p className="text-sm text-gray-600 mb-4">
            Define cuándo inicia y finaliza la votación
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="fechaInicio"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Fecha y Hora de Inicio <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  id="fechaInicio"
                  type="date"
                  name="fechaInicio"
                  value={formData.fechaInicio}
                  onChange={handleInputChange}
                  className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.fechaInicio ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-invalid={errors.fechaInicio ? "true" : "false"}
                  aria-describedby={
                    errors.fechaInicio ? "fechaInicio-error" : undefined
                  }
                />
                <input
                  id="horaInicio"
                  type="time"
                  name="horaInicio"
                  value={formData.horaInicio}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  aria-label="Hora de inicio"
                />
              </div>
              {errors.fechaInicio && (
                <p id="fechaInicio-error" className="text-xs text-red-600 mt-1">
                  {errors.fechaInicio}
                </p>
              )}
              {!errors.fechaInicio && (
                <p className="text-xs text-gray-500 mt-1">
                  La votación se abrirá en esta fecha y hora
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="fechaFin"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Fecha y Hora de Cierre <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  id="fechaFin"
                  type="date"
                  name="fechaFin"
                  value={formData.fechaFin}
                  onChange={handleInputChange}
                  className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                    errors.fechaFin ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-invalid={errors.fechaFin ? "true" : "false"}
                  aria-describedby={
                    errors.fechaFin ? "fechaFin-error" : undefined
                  }
                />
                <input
                  id="horaFin"
                  type="time"
                  name="horaFin"
                  value={formData.horaFin}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  aria-label="Hora de cierre"
                />
              </div>
              {errors.fechaFin && (
                <p id="fechaFin-error" className="text-xs text-red-600 mt-1">
                  {errors.fechaFin}
                </p>
              )}
              {!errors.fechaFin && (
                <p className="text-xs text-gray-500 mt-1">
                  La votación se cerrará automáticamente
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Reglas de Votación */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Reglas de Votación
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Define el comportamiento de la votación
          </p>

          <fieldset>
            <legend className="block text-sm font-medium text-gray-900 mb-3">
              Tipo de Votación <span className="text-red-500">*</span>
            </legend>
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition cursor-pointer">
                <input
                  type="radio"
                  name="tipoVotacion"
                  value="unico"
                  checked={formData.tipoVotacion === "unico"}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-blue-600 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Voto Único</div>
                  <div className="text-sm text-gray-600">
                    Cada participante puede votar por una sola opción
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition cursor-pointer">
                <input
                  type="radio"
                  name="tipoVotacion"
                  value="multiple"
                  checked={formData.tipoVotacion === "multiple"}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-blue-600 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    Selección Múltiple
                  </div>
                  <div className="text-sm text-gray-600">
                    Los participantes pueden seleccionar varias opciones
                  </div>
                </div>
              </label>
            </div>
          </fieldset>
        </div>

        {/* Visibilidad de Resultados */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Visibilidad de Resultados
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Define el comportamiento de la votación
          </p>

          <fieldset>
            <legend className="block text-sm font-medium text-gray-900 mb-3">
              Visibilidad <span className="text-red-500">*</span>
            </legend>
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition cursor-pointer">
                <input
                  type="radio"
                  name="visibilidad"
                  value="ocultos"
                  checked={formData.visibilidad === "ocultos"}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-blue-600 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    Ocultos (Solo Admins)
                  </div>
                  <div className="text-sm text-gray-600">
                    Solo los administradores pueden ver los resultados
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition cursor-pointer">
                <input
                  type="radio"
                  name="visibilidad"
                  value="finalizar"
                  checked={formData.visibilidad === "finalizar"}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-blue-600 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    Públicos al Finalizar
                  </div>
                  <div className="text-sm text-gray-600">
                    Los resultados se mostrarán cuando la votación cierre
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition cursor-pointer">
                <input
                  type="radio"
                  name="visibilidad"
                  value="tiempo-real"
                  checked={formData.visibilidad === "tiempo-real"}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-blue-600 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    Públicos en Tiempo Real
                  </div>
                  <div className="text-sm text-gray-600">
                    Los participantes ven los resultados mientras votan
                  </div>
                </div>
              </label>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
}

export default Step3ReglasYFechas;
