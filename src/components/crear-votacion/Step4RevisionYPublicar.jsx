function Step4RevisionYPublicar({ formData, setCurrentStep }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Revisión y Publicar
      </h2>
      <p className="text-gray-600 mb-6">
        Revisa toda la información antes de publicar
      </p>

      <div className="space-y-4">
        {/* Información General */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Información General
            </h3>
            <button
              onClick={() => setCurrentStep(1)}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Editar
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Título de la Votación
              </p>
              <p className="text-gray-900 font-medium">
                {formData.titulo || "Sin título"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Descripción</p>
              <p className="text-gray-900">
                {formData.descripcion || "Sin descripción"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Categoría</p>
              <p className="text-gray-900 capitalize">
                {formData.categoria || "Sin categoría"}
              </p>
            </div>
          </div>
        </div>

        {/* Reglas y Fechas */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Reglas y Fechas
            </h3>
            <button
              onClick={() => setCurrentStep(3)}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Editar
            </button>
          </div>

          {/* Duración */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-900 mb-3">Duración</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Fecha de Inicio</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formData.fechaInicio
                      ? new Date(formData.fechaInicio).toLocaleDateString(
                          "es-ES",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )
                      : "01 de diciembre de 2025"}
                  </p>
                  <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {formData.horaInicio || "00:01"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Fecha de Cierre</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formData.fechaFin
                      ? new Date(formData.fechaFin).toLocaleDateString(
                          "es-ES",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )
                      : "13 de diciembre de 2025"}
                  </p>
                  <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {formData.horaFin || "23:59"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reglas de Votación */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-900 mb-3">
              Reglas de Votación
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-600">Tipo de Votación</p>
                <p className="text-sm font-medium text-gray-900">
                  {formData.tipoVotacion === "unico"
                    ? "Voto Único"
                    : "Selección Múltiple"}
                </p>
              </div>
            </div>
          </div>

          {/* Visibilidad de Resultados */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-900 mb-3">
              Visibilidad de Resultados
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-600">Visibilidad</p>
                <p className="text-sm font-medium text-gray-900">
                  {formData.visibilidad === "ocultos" &&
                    "Ocultos (Solo Admins)"}
                  {formData.visibilidad === "finalizar" &&
                    "Públicos al Finalizar"}
                  {formData.visibilidad === "tiempo-real" &&
                    "Públicos en Tiempo Real"}
                </p>
              </div>
            </div>
          </div>

          {/* Acceso */}
          <div>
            <p className="text-sm font-medium text-gray-900 mb-3">Acceso</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-600">Acceso Requerido</p>
                <p className="text-sm font-medium text-gray-900">
                  {formData.acceso === "publico"
                    ? "Público (Cualquiera)"
                    : "Solo Usuarios Registrados"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Candidatos */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Candidatos (2)
            </h3>
            <button
              onClick={() => setCurrentStep(2)}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Editar
            </button>
          </div>

          <div className="flex gap-4">
            {/* Placeholder candidates */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-2xl">
                🍕
              </div>
              <p className="text-sm font-medium text-gray-900">
                Pizza Napolitana
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-2xl">
                🥘
              </div>
              <p className="text-sm font-medium text-gray-900">Lasaña</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step4RevisionYPublicar;
