import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { votaciones as votacionesIniciales } from "../data/votacionesData";

const VotacionesContext = createContext();
const STORAGE_KEY = "votaciones_app";

export function VotacionesProvider({ children }) {
  // Initialize state from localStorage or use initial data
  const [votaciones, setVotaciones] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : votacionesIniciales;
      }
    } catch (error) {
      console.error("Error loading votaciones from localStorage:", error);
    }
    return votacionesIniciales;
  });

  // Save to localStorage whenever votaciones change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(votaciones));
    } catch (error) {
      console.error("Error saving votaciones to localStorage:", error);
    }
  }, [votaciones]);

  const agregarVotacion = useCallback(
    (nuevaVotacion) => {
      // Generate new ID
      const nuevoId =
        votaciones.length > 0
          ? Math.max(...votaciones.map((v) => v.id)) + 1
          : 1;

      // Calculate estado based on dates
      const now = new Date();
      const fechaInicio = new Date(
        `${nuevaVotacion.fechaInicio}T${nuevaVotacion.horaInicio || "00:00"}`
      );
      const fechaFin = new Date(
        `${nuevaVotacion.fechaFin}T${nuevaVotacion.horaFin || "23:59"}`
      );

      let estado = "programada";
      let badge = "Programada";

      if (now >= fechaInicio && now <= fechaFin) {
        estado = "activa";
        badge = "Activa";
      } else if (now > fechaFin) {
        estado = "cerrada";
        badge = "Cerrada";
      }

      const votacionCompleta = {
        id: nuevoId,
        titulo: nuevaVotacion.titulo,
        descripcion: nuevaVotacion.descripcion,
        votos: 0,
        fechaFin: nuevaVotacion.fechaFin,
        estado,
        badge,
        image:
          nuevaVotacion.imagen || "https://placehold.co/600x400?text=No+Imagen",
        categoria: nuevaVotacion.categoria,
        fechaInicio: nuevaVotacion.fechaInicio,
        horaInicio: nuevaVotacion.horaInicio,
        horaFin: nuevaVotacion.horaFin,
        tipoVotacion: nuevaVotacion.tipoVotacion,
        visibilidad: nuevaVotacion.visibilidad,
        acceso: nuevaVotacion.acceso,
        candidatos: nuevaVotacion.candidatos || [],
      };

      setVotaciones((prev) => [votacionCompleta, ...prev]);
      return votacionCompleta;
    },
    [votaciones]
  );

  const actualizarVotacion = useCallback((id, datosActualizados) => {
    setVotaciones((prev) =>
      prev.map((votacion) =>
        votacion.id === id ? { ...votacion, ...datosActualizados } : votacion
      )
    );
  }, []);

  const eliminarVotacion = useCallback((id) => {
    setVotaciones((prev) => prev.filter((votacion) => votacion.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      votaciones,
      agregarVotacion,
      actualizarVotacion,
      eliminarVotacion,
    }),
    [votaciones, agregarVotacion, actualizarVotacion, eliminarVotacion]
  );

  return (
    <VotacionesContext.Provider value={value}>
      {children}
    </VotacionesContext.Provider>
  );
}

export function useVotaciones() {
  const context = useContext(VotacionesContext);
  if (!context) {
    throw new Error(
      "useVotaciones debe usarse dentro de un VotacionesProvider"
    );
  }
  return context;
}
