import React, {useRef, forwardRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Inicio.css';
import { start } from '../sketch.js'; // Ajusta la ruta según la ubicación de tu archivo JS

const Inicio = forwardRef((props, ref) => {
    const canvasRef = useRef(null);

    const handleResize = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            start(canvas);
        }
    };

    return (
        <section ref={ref} id='inicio' className='scroll-item contenedor-inicio'>
            <article className='presentacion' aria-label='nombre'>
                <div>
                    <h3>sola, soy Hollenstein Franco,</h3>
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