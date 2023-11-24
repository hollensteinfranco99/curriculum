import React, { Fragment, useRef, useEffect } from 'react';
import Navegador from '../src/common/Navegador';
import ContenedorSecciones from '../src/components/ContenedorSecciones';
import './App.css';


const App = () => {

  /* ================= variables ======================= */
  const contenedorRef = useRef(null);
  const refsLista = {
    inicio: useRef(null),
    contacto: useRef(null),
    proyectos: useRef(null),
    skills: useRef(null),
  };
  /* ============== useEffect ===================== */
  


  return (
    <section ref={contenedorRef} className='contenedor-principal'>
            <Navegador refsLista={refsLista}></Navegador>
            <ContenedorSecciones refsLista={refsLista}></ContenedorSecciones>
    </section>
  );
};

export default App;