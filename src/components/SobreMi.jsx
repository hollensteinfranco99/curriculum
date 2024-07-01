import React,{ forwardRef } from 'react';
import '../css/skills.css';

const SobreMi = forwardRef((props, ref) => {
    return (
        <section ref={ref} className='scroll-item sobre-mi'>
        <h2>Sobre mi</h2>
        <article>
            <p className='parrafo'>Soy desarrollador web, estudiante en la carrera Tecnico superior en programacion.
                me especializo en el desarrollo front-end principalmente.  <br/> En este momento me encuentro estudiando y busco ampliar mi campo laboral en el mundo de desarrollo web</p>
        </article>
    </section>
    );
});

export default SobreMi;