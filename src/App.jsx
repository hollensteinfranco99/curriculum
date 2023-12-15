// App.js
import React, { Fragment, useRef, useEffect, useState } from 'react';
import Navegador from './common/Navegador';
import ContenedorSecciones from './components/ContenedorSecciones';
import Preloader from './components/Preloader';
import Pdf from './components/Pdf'; // Importa el componente Pdf
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  const contenedorRef = useRef(null);

  const refsLista = {
    inicio: useRef(null),
    contacto: useRef(null),
    proyectos: useRef(null),
    skills: useRef(null),
    sobremi: useRef(null),
  };

  return (
    <Router>
      <Fragment>
        {loading ? (
          <Preloader />
        ) : (
          <section ref={contenedorRef} className='contenedor-principal'>
            <Navegador refsLista={refsLista}></Navegador>
            <Routes>
              <Route path='/' element={<ContenedorSecciones refsLista={refsLista} />} />
              <Route path='/pdf' element={<Pdf></Pdf>}></Route>
            </Routes>
          </section>
        )}
      </Fragment>
    </Router>
  );
};

export default App;