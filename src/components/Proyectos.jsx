import React, { Fragment, forwardRef, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/proyectos.css';
import { imagenes } from '../imagen/imagenes';

const Proyectos = forwardRef((props, ref) => {


    return (
        <div data-section="proyectos" ref={ref} className='scroll-item contenedor-proyectos'>
            <section>
                <div className='titulo-cont'>
                <h2>Proyectos</h2>
                </div>
                <section className='galeria-proyectos'>

                    <article className='tarjeta-proyecto'>
                        <section className='tarjeta-hover'>
                            <div className='contenedor-img-proyecto'>
                                <img src={imagenes.pelicula} alt="" />
                            </div>
                            <div className='informacion-tarjeta'>
                                <div className='contenedor-img-logo'>
                                    <img src={imagenes.primelogo} alt="" />
                                </div>
                                <a href='https://655fba09c3392c0008445b71--peliculas-primevideo.netlify.app/' target='_blank' className='btn btn-danger'>Ver sitio</a>
                                <a href='https://github.com/hollensteinfranco99/peliculas-frontend.git' target='_blank' className='px-3 py-1 btn btn-warning btn-codigo'>codigo</a>
                            </div>
                        </section>
                        <div className='descripcion'>
                            <p>La pagina sirve para mostrar, buscar y filtrar pelciulas y series que se encuentra en la API MovieDb</p>
                            <span className='btn btn-dark ms-1'>HTML</span>
                            <span className='btn btn-dark ms-1'>JAVASCRIPT</span>
                            <span className='btn btn-dark ms-1'>CSS</span>
                            <span className='btn btn-dark ms-1'>REACT</span>
                        </div>
                    </article>
                </section>
            </section>
        </div>
    );
});

export default Proyectos;