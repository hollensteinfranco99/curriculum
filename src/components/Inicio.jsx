import React, {useRef, forwardRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Inicio.css';

const Inicio = forwardRef((props, ref) => {


    return (
        <section ref={ref} id='inicio' className='scroll-item contenedor-inicio'>
            <article className='presentacion' aria-label='nombre'>
                <div>
                    <h3>Holsa, soy Hollenstein Franco,</h3>
                    <h2>FullStack Developer</h2>
                </div>
            </article>
        </section>
    );
});

export default Inicio;

/*
            <article id='canvas-contenedor' aria-label='canvas' className='canvas-contenedor'>
                <canvas ref={canvasRef} id='canvas-inicio' className='canvas-inicio'></canvas>
            </article>
*/