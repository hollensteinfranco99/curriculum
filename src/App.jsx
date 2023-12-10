import React, { Fragment, useRef, useEffect,useState } from 'react';
import Navegador from '../src/common/Navegador';
import ContenedorSecciones from '../src/components/ContenedorSecciones';
import Preloader from './components/Preloader';
import './App.css';


const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);



  /* ================= variables ======================= */
  const contenedorRef = useRef(null);
  const refsLista = {
    inicio: useRef(null),
    contacto: useRef(null),
    proyectos: useRef(null),
    skills: useRef(null),
    sobremi: useRef(null)
  };
  /* ============== useEffect ===================== */
  


  return (
    <Fragment>
            {loading ? (
        <Preloader />
      ) : (
    <section ref={contenedorRef} className='contenedor-principal'>
            <Navegador refsLista={refsLista}></Navegador>
            <ContenedorSecciones refsLista={refsLista}></ContenedorSecciones>
    </section>)}
    </Fragment>
  );
};

export default App;