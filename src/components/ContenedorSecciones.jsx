import React, { useLayoutEffect, useState, useEffect, useRef, useCallback  } from "react";
import Inicio from "./Inicio";
import Proyectos from "./Proyectos";
import Contacto from "./Contacto";
import Skills from "./Skills";
import SobreMi from "./SobreMi";

/*const ContenedorSecciones = (props) => {
  const [esDispositivoPequeno, setEsDispositivoPequeno] = useState(
    window.innerWidth <= 900
  );
  const scrollContainerRef = useRef(null);


  useLayoutEffect(() => {
    const handleResize = () => {
      setEsDispositivoPequeno(window.innerWidth <= 900);
    };
    window.addEventListener("resize", handleResize);
    handleResize();


    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const scrollear = () => {
      const container = document.querySelector(".scroll-container");

      let isTouching = false;
      let startTouchY = 0;
      const sensitivity = 1; // Ajusta la sensibilidad según tus necesidades

      const handleTouchStart = (event) => {
        isTouching = true;
        startTouchY = event.touches[0].clientY;
      };

      const handleTouchMove = (event) => {
        if (!isTouching) return;
        event.preventDefault();

        const currentTouchY = event.touches[0].clientY;
        const delta = (startTouchY - currentTouchY) * sensitivity;

        container.scrollBy({
          top: delta,
          behavior: "smooth",
        });

        startTouchY = currentTouchY;
      };

      const handleTouchEnd = () => {
        isTouching = false;
      };

      const handleWheel = (event) => {
        event.preventDefault();
        const delta = event.deltaY;

        container.scrollBy({
          top: delta,
          behavior: "smooth",
        });
      };


      container.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      container.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      container.addEventListener("touchend", handleTouchEnd, {
        passive: false,
      });
      container.addEventListener("touchcancel", handleTouchEnd, {
        passive: false,
      });
      return () => {
        container.removeEventListener("touchstart", handleTouchStart,{passive:false});
        container.removeEventListener("touchmove", handleTouchMove,{passive:false});
        container.removeEventListener("touchend", handleTouchEnd,{passive:false});
        container.removeEventListener("wheel", handleWheel,{passive:false});
      };
    };

    scrollear();
  }, []);*/
  const ContenedorSecciones = (props) => {
  // Estado para detectar si el dispositivo es pequeño, útil para diseño responsivo.
  const [esDispositivoPequeno, setEsDispositivoPequeno] = useState(false);

  // useRef para obtener una referencia directa al elemento DOM que queremos controlar.
  // Esto es crucial para un manejo de eventos limpio y eficiente en React.
  const scrollContainerRef = useRef(null);

  // useRef para almacenar el estado mutable de los eventos táctiles sin causar re-renders.
  const isTouchingRef = useRef(false);
  const startTouchYRef = useRef(0);

  // Puedes ajustar esta sensibilidad para cambiar la velocidad del scroll.
  // Un valor mayor hará que el scroll sea más rápido. Prueba con valores como 1.5, 2, o 3 si lo sientes lento en iOS.
  const sensitivity = 1.5; 

  // --- useLayoutEffect para el manejo del tamaño de la ventana ---
  // Este efecto se ejecuta de forma síncrona después de todas las mutaciones del DOM.
  useLayoutEffect(() => {
    const handleResize = () => {
      setEsDispositivoPequeno(window.innerWidth <= 900);
    };

    // Adjunta el event listener al objeto window para detectar cambios de tamaño.
    window.addEventListener("resize", handleResize);
    // Llama una vez al montar para establecer el estado inicial.
    handleResize();

    // Función de limpieza: se ejecuta cuando el componente se desmonta.
    // Es vital para prevenir fugas de memoria.
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Dependencias vacías: este efecto solo se ejecuta una vez al montar y desmontar.

  // --- Funciones de manejo de eventos táctiles y de rueda ---
  // Usamos `useCallback` para "memorizar" estas funciones. Esto asegura que
  // siempre sean las mismas instancias de función, lo cual es fundamental
  // para que `removeEventListener` funcione correctamente.

  const handleTouchStart = useCallback((event) => {
    isTouchingRef.current = true;
    startTouchYRef.current = event.touches[0].clientY;
  }, []); // Dependencias vacías: la función es estable y no necesita recrearse.

  const handleTouchMove = useCallback((event) => {
    if (!isTouchingRef.current) return; // Si no hay un toque activo, salimos.

    // Prevenir el comportamiento predeterminado del navegador (ej. scroll nativo).
    // `{ passive: false }` en `addEventListener` asegura que esto funcione en iOS.
    event.preventDefault();

    const container = scrollContainerRef.current;
    if (!container) return; // Si el contenedor no está disponible, salimos.

    const currentTouchY = event.touches[0].clientY;
    // Calcula la diferencia de movimiento y aplica la sensibilidad.
    const delta = (startTouchYRef.current - currentTouchY) * sensitivity;

    // Desplaza el contenedor.
    container.scrollBy({
      top: delta,
      behavior: "smooth", // Para un desplazamiento suave. Si notas saltos, puedes quitarlo.
    });

    // Actualiza la posición de inicio del toque para el siguiente cálculo.
    startTouchYRef.current = currentTouchY;
  }, [sensitivity]); // `sensitivity` como dependencia: la función se recreará si `sensitivity` cambia.

  const handleTouchEnd = useCallback(() => {
    isTouchingRef.current = false; // Reinicia el estado del toque al finalizar.
  }, []); // Dependencias vacías.

  // Manejador para el evento de la rueda del ratón (para dispositivos de escritorio).
  const handleWheel = useCallback((event) => {
    event.preventDefault(); // Previene el scroll nativo del navegador con la rueda.

    const container = scrollContainerRef.current;
    if (!container) return;

    const delta = event.deltaY; // Obtiene la dirección y cantidad del scroll de la rueda.

    container.scrollBy({
      top: delta,
      behavior: "smooth",
    });
  }, []); // Dependencias vacías.

  // --- useEffect para adjuntar y limpiar los event listeners de scroll ---
  // Este efecto se ejecuta una vez al montar el componente y la función de retorno
  // se ejecuta cuando el componente se desmonta.
  useEffect(() => {
    const container = scrollContainerRef.current;

    if (container) {
      // Adjuntar event listeners. `{ passive: false }` es crucial para que `preventDefault()`
      // funcione con los eventos táctiles en iOS, permitiendo tu scroll personalizado.
      container.addEventListener("touchstart", handleTouchStart, { passive: false });
      container.addEventListener("touchmove", handleTouchMove, { passive: false });
      container.addEventListener("touchend", handleTouchEnd, { passive: false });
      // `touchcancel` es importante para cuando un toque es interrumpido (ej. llamada entrante).
      container.addEventListener("touchcancel", handleTouchEnd, { passive: false });
      container.addEventListener("wheel", handleWheel, { passive: false }); // También con passive: false para `preventDefault()`

      // Función de limpieza: se ejecuta cuando el componente se desmonta.
      // Es ABSOLUTAMENTE CRUCIAL remover los listeners para evitar problemas de rendimiento
      // y comportamiento inesperado (acumulación de listeners).
      return () => {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
        container.removeEventListener("touchcancel", handleTouchEnd);
        container.removeEventListener("wheel", handleWheel);
      };
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, handleWheel]); // Dependencias: el efecto se re-ejecuta
                                                                       // solo si alguna de estas funciones (estables gracias a useCallback) cambia.


  return (
    <section className="scroll-container">
      <Inicio ref={props.refsLista.inicio}></Inicio>
      <Skills
        esDispositivoPequeno={esDispositivoPequeno}
        ref={props.refsLista.skills}
      ></Skills>
      {esDispositivoPequeno ? (
        <SobreMi ref={props.refsLista.sobremi}></SobreMi>
      ) : null}

      <Proyectos ref={props.refsLista.proyectos}></Proyectos>
      <Contacto ref={props.refsLista.contacto}></Contacto>
    </section>
  );
};

export default ContenedorSecciones;
