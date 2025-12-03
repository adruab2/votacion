import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Step1InformacionGeneral from "../components/crear-votacion/Step1InformacionGeneral";
import Step2Candidatos from "../components/crear-votacion/Step2Candidatos";
import Step3ReglasYFechas from "../components/crear-votacion/Step3ReglasYFechas";
import Step4RevisionYPublicar from "../components/crear-votacion/Step4RevisionYPublicar";
import { useVotaciones } from "../context/VotacionesContext";

function CrearVotacion() {
  const navigate = useNavigate();
  const { agregarVotacion } = useVotaciones();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    imagen: "",
    candidatos: [],
    fechaInicio: "",
    fechaFin: "",
    horaInicio: "",
    horaFin: "",
    tipoVotacion: "unico",
    visibilidad: "ocultos",
    acceso: "registrados",
  });

  const steps = [
    { number: 1, title: "Información General", subtitle: "Datos básicos" },
    { number: 2, title: "Candidatos", subtitle: "Agregar opciones" },
    { number: 3, title: "Reglas y Fechas", subtitle: "Configuración" },
    { number: 4, title: "Revisión y Publicar", subtitle: "Confirmar" },
  ];

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = "El título es obligatorio";
    } else if (formData.titulo.trim().length < 5) {
      newErrors.titulo = "El título debe tener al menos 5 caracteres";
    } else if (formData.titulo.trim().length > 100) {
      newErrors.titulo = "El título no puede exceder 100 caracteres";
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria";
    } else if (formData.descripcion.trim().length < 10) {
      newErrors.descripcion =
        "La descripción debe tener al menos 10 caracteres";
    } else if (formData.descripcion.trim().length > 500) {
      newErrors.descripcion = "La descripción no puede exceder 500 caracteres";
    }

    if (!formData.categoria) {
      newErrors.categoria = "Debes seleccionar una categoría";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    const now = new Date();

    if (!formData.fechaInicio) {
      newErrors.fechaInicio = "La fecha de inicio es obligatoria";
    } else {
       // Comparar fecha y hora completas
       const selectedStartDateTime = new Date(
         `${formData.fechaInicio}T${formData.horaInicio || "00:00"}`
       );
     
       if (selectedStartDateTime < now) {
        newErrors.fechaInicio =
           "La fecha y hora de inicio no pueden ser anteriores al momento actual";
      }
    }

    if (!formData.horaInicio) {
      newErrors.horaInicio = "La hora de inicio es obligatoria";
    }

    if (!formData.fechaFin) {
      newErrors.fechaFin = "La fecha de cierre es obligatoria";
    }

    if (!formData.horaFin) {
      newErrors.horaFin = "La hora de cierre es obligatoria";
    }

    // Validate that end date is after start date
    if (formData.fechaInicio && formData.fechaFin && !newErrors.fechaInicio) {
      const startDateTime = new Date(
        `${formData.fechaInicio}T${formData.horaInicio || "00:00"}`
      );
      const endDateTime = new Date(
        `${formData.fechaFin}T${formData.horaFin || "00:00"}`
      );

      if (endDateTime <= startDateTime) {
        newErrors.fechaFin =
          "La fecha de cierre debe ser posterior a la fecha de inicio";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep < 4) {
      let isValid = true;

      // Validate current step before advancing
      if (currentStep === 1) {
        isValid = validateStep1();
      } else if (currentStep === 3) {
        isValid = validateStep3();
      }

      if (isValid) {
        setCurrentStep(currentStep + 1);
        setErrors({}); // Clear errors when moving to next step
      } else {
        // Scroll to top to show errors
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/admin/panel-voto");
    }
  };

  const handleSubmit = () => {
    try {
      const newVotacion = {
        ...formData,
        id: Date.now(),
        candidatos: formData.candidatos.map((c) => ({
          ...c,
          votos: 0,
        })),
        estado: "activa",
        badge: "Activa",
        image: formData.imagen || "https://placehold.co/600x400?text=Votacion",
      };

      agregarVotacion(newVotacion);

      console.log("Votación creada:", newVotacion);
      alert("¡Votación publicada exitosamente!");

      navigate("/admin/panel-voto");
    } catch (error) {
      console.error("Error al crear la votación:", error);
      alert("Hubo un error al crear la votación.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition cursor-pointer"
            aria-label="Volver"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Crear Nueva Votación
          </h1>
          <p className="text-gray-600 mt-1">
            Completa los pasos para configurar tu votación
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex-1 flex items-center">
                <div className="flex flex-col items-center flex-1">
                  {/* Circle */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition ${
                      currentStep === step.number
                        ? "bg-blue-600 text-white"
                        : currentStep > step.number
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step.number}
                  </div>
                  {/* Labels */}
                  <div className="text-center mt-2">
                    <div
                      className={`text-sm font-medium ${
                        currentStep >= step.number
                          ? "text-gray-900"
                          : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500">{step.subtitle}</div>
                  </div>
                </div>
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 -mt-12 transition ${
                      currentStep > step.number ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {currentStep === 1 && (
            <Step1InformacionGeneral
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
            />
          )}

          {currentStep === 2 && (
            <Step2Candidatos formData={formData} setFormData={setFormData} />
          )}

          {currentStep === 3 && (
            <Step3ReglasYFechas
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
            />
          )}

          {currentStep === 4 && (
            <Step4RevisionYPublicar
              formData={formData}
              setCurrentStep={setCurrentStep}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            {currentStep === 4 ? (
              <button
                onClick={handleBack}
                className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium cursor-pointer"
              >
                Guardar como Borrador
              </button>
            ) : (
              <button
                onClick={handleBack}
                className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium cursor-pointer"
              >
                Atrás
              </button>
            )}

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium cursor-pointer"
              >
                Siguiente:{" "}
                {currentStep === 1
                  ? "Candidatos"
                  : currentStep === 2
                  ? "Reglas y Fechas"
                  : "Revisión y Publicar"}
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium cursor-pointer"
              >
                Publicar Votación
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrearVotacion;
