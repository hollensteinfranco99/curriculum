import React, { forwardRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Inicio.css';

const Inicio = forwardRef((props, ref) => {

    return (
        <section ref={ref} id='inicio' className='scroll-item contenedor-inicio'>
            <article className='presentacion' aria-label='nombre'>
                <div>
                    <h3>Hola, soy Hollenstein Franco,</h3>
                    <h2>FullStack Developer</h2>
                </div>
            </article>
        </section>
    );
});

export default Inicio;