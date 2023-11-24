import React, { Fragment, useEffect,useRef,forwardRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Inicio.css';
import {start} from '../sketch.js'; // Ajusta la ruta según la ubicación de tu archivo JS

const Inicio = forwardRef((props, ref) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas) {
            start(canvas);
        }
    }, []);


    return (
        <section ref={ref} id='inicio' className='scroll-item contenedor-inicio'>
            <article className='presentacion' aria-label='nombre'>
                <div>
                <h3>Hola, mi nombre es Hollenstein Franco</h3>
                <h2>FullStack Developer</h2>
                </div>
            </article>
            <article id='canvas-contenedor' aria-label='canvas' className='canvas-contenedor'>
            <canvas ref={canvasRef} id='canvas-inicio' className='canvas-inicio'></canvas>
            </article>
        </section>
    );
});

export default Inicio;