import { useParams, useNavigate } from "react-router-dom";
import { useVotaciones } from "../context/VotacionesContext";
import { useState, useEffect } from "react";

function EditarVotacion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { votaciones, actualizarVotacion } = useVotaciones();

  const votacionOriginal = votaciones.find(v => v.id === Number(id));

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    fechaInicio: "",
    horaInicio: "",
    fechaFin: "",
    horaFin: "",
    candidatos: [],
    visibilidad: "tiempo-real"
  });

  // Cargar datos iniciales
  useEffect(() => {
    if (votacionOriginal) {
      setForm({
        titulo: votacionOriginal.titulo,
        descripcion: votacionOriginal.descripcion,
        fechaInicio: votacionOriginal.fechaInicio || "",
        horaInicio: votacionOriginal.horaInicio || "",
        fechaFin: votacionOriginal.fechaFin || "",
          horaFin: votacionOriginal.horaFin || "",
          candidatos: [...votacionOriginal.candidatos],
          visibilidad: votacionOriginal.visibilidad || "tiempo-real"
      });
    }
  }, [votacionOriginal]);

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Candidatos
  const handleCandidatoChange = (index, value) => {
    const newList = [...form.candidatos];
    newList[index].nombre = value;
    setForm({ ...form, candidatos: newList });
  };

  const handleCandidatoFotoChange = (index, value) => {
    const newList = [...form.candidatos];
    newList[index].foto = value;
    setForm({ ...form, candidatos: newList });
  };

  const agregarCandidato = () => {
    const newCandidate = {
      id: form.candidatos.length > 0 
        ? Math.max(...form.candidatos.map(c => c.id)) + 1 
        : 1,
      nombre: "",
      votos: 0,
      foto: ""
    };
    setForm({ ...form, candidatos: [...form.candidatos, newCandidate] });
  };

  const eliminarCandidato = (id) => {
    const filtered = form.candidatos.filter(c => c.id !== id);
    setForm({ ...form, candidatos: filtered });
  };

  const guardarCambios = () => {
    actualizarVotacion(votacionOriginal.id, {
      ...form
    });
    navigate("/admin/panel-voto");
  };

  if (!votacionOriginal) {
    return <p className="p-6 text-red-600">Votación no encontrada.</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-4">Editar Votación</h1>

        {/* TITULO */}
        <label className="block mb-2 font-semibold">Título</label>
        <input
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        {/* DESCRIPCION */}
        <label className="block mb-2 font-semibold">Descripción</label>
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        {/* FECHA INICIO */}
        <label className="block mb-2 font-semibold">Fecha de inicio</label>
        <input
          type="date"
          name="fechaInicio"
          value={form.fechaInicio}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        {/* HORA INICIO */}
        <label className="block mb-2 font-semibold">Hora de inicio</label>
        <input
          type="time"
          name="horaInicio"
          value={form.horaInicio}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        {/* FECHA FIN */}
        <label className="block mb-2 font-semibold">Fecha de cierre</label>
        <input
          type="date"
          name="fechaFin"
          value={form.fechaFin}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        {/* HORA FIN */}
        <label className="block mb-2 font-semibold">Hora de cierre</label>
        <input
          type="time"
          name="horaFin"
          value={form.horaFin}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-6"
        />

        {/* VISIBILIDAD */}
        <label className="block mb-2 font-semibold">Visibilidad de resultados</label>
        <select
          name="visibilidad"
          value={form.visibilidad}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-6"
        >
          <option value="ocultos">Ocultos (solo admin)</option>
          <option value="finalizar">Visibles al finalizar</option>
          <option value="tiempo-real">Tiempo real (público)</option>
        </select>

        {/* CANDIDATOS */}
        <h2 className="text-xl font-semibold mb-2">Candidatos</h2>

        {form.candidatos.map((c, i) => (
          <div key={c.id} className="flex flex-col gap-2 mb-2">
            <div className="flex items-center gap-2">
              <input
                value={c.nombre}
                onChange={(e) => handleCandidatoChange(i, e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder="Nombre del candidato"
              />
              <button
                onClick={() => eliminarCandidato(c.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                X
              </button>
            </div>
            <input
              value={c.foto || ""}
              onChange={(e) => handleCandidatoFotoChange(i, e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="URL de la imagen"
            />
          </div>
        ))}

        <button
          onClick={agregarCandidato}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
        >
          Agregar candidato
        </button>

        {/* GUARDAR */}
        <button
          onClick={guardarCambios}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Guardar cambios
        </button>

      </div>
    </div>
  );
}

export default EditarVotacion;
