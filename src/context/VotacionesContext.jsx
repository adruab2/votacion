import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";

const VotacionesContext = createContext();
const STORAGE_KEY = "votaciones_app";

export function VotacionesProvider({ children }) {
  const [votaciones, setVotaciones] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          return parsed.map((v) => ({
            ...v,
            candidatos: Array.isArray(v.candidatos) ? v.candidatos : [],
            image: v.image || "https://placehold.co/600x400?text=No+Imagen",
          }));
        }
      }
    } catch (error) {
      console.error("Error loading votaciones from localStorage:", error);
    }

    // Inicializar con array vacío
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(votaciones));
    } catch (error) {
      console.error("Error saving votaciones to localStorage:", error);
    }
  }, [votaciones]);

  // Actualizar estado de votaciones cada minuto
  useEffect(() => {
    const updateVotacionesStatus = () => {
      setVotaciones((prev) => {
        const now = new Date();
        return prev.map((votacion) => {
          const fechaInicio = new Date(
            `${votacion.fechaInicio}T${votacion.horaInicio || "00:00"}`
          );
          const fechaFin = new Date(
            `${votacion.fechaFin}T${votacion.horaFin || "23:59"}`
          );

          let nuevoEstado = "programada";
          let nuevoBadge = "Programada";

          if (now >= fechaInicio && now <= fechaFin) {
            nuevoEstado = "activa";
            nuevoBadge = "Activa";
          } else if (now > fechaFin) {
            nuevoEstado = "cerrada";
            nuevoBadge = "Cerrada";
          }

          // Solo actualizar si el estado cambió
          if (nuevoEstado !== votacion.estado) {
            return { ...votacion, estado: nuevoEstado, badge: nuevoBadge };
          }
          return votacion;
        });
      });
    };

    // Ejecutar inmediatamente
    updateVotacionesStatus();

    // Ejecutar cada 60 segundos (1 minuto)
    const interval = setInterval(updateVotacionesStatus, 60000);

    return () => clearInterval(interval);
  }, []);

  // Recargar votaciones cuando el usuario cambia (ej: logout/login)
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setVotaciones(
              parsed.map((v) => ({
                ...v,
                candidatos: Array.isArray(v.candidatos) ? v.candidatos : [],
                image: v.image || "https://placehold.co/600x400?text=No+Imagen",
              }))
            );
          }
        }
      } catch (error) {
        console.error("Error reloading votaciones from localStorage:", error);
      }
    };

    // Detectar cambios en userData o adminData (cambio de sesión)
    const checkSessionChange = () => {
      const userData = localStorage.getItem("userData");
      const adminData = localStorage.getItem("adminData");
      const lastSession = localStorage.getItem("lastSession");
      const currentSession = `${userData || ""}-${adminData || ""}`;

      if (lastSession && lastSession !== currentSession) {
        handleStorageChange();
      }
      localStorage.setItem("lastSession", currentSession);
    };

    // Ejecutar al montar y cuando cambien las dependencias
    checkSessionChange();

    // Escuchar cambios en storage desde otras pestañas
    const handleStorageEvent = (e) => {
      if (e.key === STORAGE_KEY) {
        handleStorageChange();
      }
    };

    window.addEventListener("storage", handleStorageEvent);
    return () => window.removeEventListener("storage", handleStorageEvent);
  }, []);

  const registrarVoto = useCallback((votacionId, candidatoId) => {
    setVotaciones((prev) =>
      prev.map((vot) =>
        vot.id === votacionId
          ? {
              ...vot,
              candidatos: vot.candidatos.map((c) =>
                c.id === candidatoId ? { ...c, votos: (c.votos || 0) + 1 } : c
              ),
              // Marcar votación como cerrada para el usuario si quieres impedir re-voto
            }
          : vot
      )
    );
  }, []);

  const agregarVotacion = useCallback(
    (nuevaVotacion) => {
      setVotaciones((prev) => {
        const nuevoId =
          prev.length > 0
            ? Math.max(...prev.map((v) => v.id)) + 1
            : 1;

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

        return [votacionCompleta, ...prev];
      });
    },
    []
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
      registrarVoto,
    }),
    [
      votaciones,
      agregarVotacion,
      actualizarVotacion,
      eliminarVotacion,
      registrarVoto,
    ]
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
