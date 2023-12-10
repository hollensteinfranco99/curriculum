import React, { forwardRef } from 'react';
import '../css/skills.css';
import { imagenes } from '../imagen/imagenes';

const Skills = forwardRef((props, ref) => {
    return (
        <div ref={ref} className='scroll-item contenedor-skills'>
            <section className='d-flex padre-skills'>
                {
                    props.esDispositivoPequeno ? null : 
                    <section ref={ref} className='scroll-item sobre-mi'>
                    <h2>Sobre mi</h2>
                    <article>
                        <p>Hola soy desarrollador web, estudiante en la carrera Tecnico superior en programacion.
                            me especializo en el desarrollo front-end principalmente.  <br/> Actualmente estudio y busco ampliar mi campo laboral en el mundo de desarrollo web</p>
                    </article>
                </section>
                }

                <section className='cont-skills'>
                    <h2>Skills</h2>
                    <article className='skills'>

                        <div>
                        <article className='contenedor-img-skills'>
                            <img src={imagenes.css} alt="img" />
                        </article>
                        <span>CSS3</span>
                        </div>
                        <div>
                        <article className='contenedor-img-skills'>
                            <img src={imagenes.c} alt="img" />
                        </article>
                        <span>C#</span>
                        </div>
                        <div>
                        <article className='contenedor-img-skills'>
                            <img src={imagenes.html} alt="img" />
                        </article>
                        <span>HTML5</span>
                        </div>
                        <div>
                        <article className='contenedor-img-skills'>
                            <img src={imagenes.js} alt="img" />
                        </article>
                        <span className='ms-4'>JS</span>
                        </div>
                        <div>
                        <article className='contenedor-img-skills'>
                            <img src={imagenes.react} alt="img" />
                        </article>
                        <span>REACT.JS</span>
                        </div>
                        <div>
                        <article className='contenedor-img-skills'>
                            <img src={imagenes.bootstrap} alt="img" />
                        </article>
                        <span>BOOTSTRAP</span>
                        </div>
                    </article>
                </section>
            </section>
        </div>
    );
});

export default Skills;