import React, { forwardRef, useLayoutEffect,useState, useEffect, useRef } from 'react';
import Inicio from './Inicio';
import Proyectos from './Proyectos';
import Contacto from './Contacto';
import Skills from './Skills';
import SobreMi from './SobreMi';

const ContenedorSecciones = (props) => {

    const [esDispositivoPequeno, setEsDispositivoPequeno] = useState(window.innerWidth <= 900);

    useLayoutEffect(() => {
        const handleResize = () => {
            setEsDispositivoPequeno(window.innerWidth <= 900);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(() => {
        scrollear();
    }, [])


    const scrollear = () => {
        const container = document.querySelector('.scroll-container');

        let isTouching = false;
        let startTouchY = 0;

        container.addEventListener('touchstart', (event) => {
            isTouching = true;
            startTouchY = event.touches[0].clientY;
        });

        container.addEventListener('touchmove', (event) => {
            if (!isTouching) return;

            const currentTouchY = event.touches[0].clientY;
            const delta = startTouchY - currentTouchY;

            container.scrollBy({
                top: delta,
                behavior: 'smooth'
            });

            startTouchY = currentTouchY;
        });

        container.addEventListener('touchend', () => {
            isTouching = false;
        });

        container.addEventListener('wheel', (event) => {
            event.preventDefault();
            const delta = event.deltaY;

            container.scrollBy({
                top: delta,
                behavior: 'smooth'
            });
        });
    }

    return (
        <section className='scroll-container'>
            <Inicio ref={props.refsLista.inicio}></Inicio>
            <Skills esDispositivoPequeno={esDispositivoPequeno} ref={props.refsLista.skills}></Skills>
            {esDispositivoPequeno ? <SobreMi ref={props.refsLista.sobremi}></SobreMi> : null}
            
            <Proyectos ref={props.refsLista.proyectos}></Proyectos>
            <Contacto ref={props.refsLista.contacto}></Contacto>
        </section>
    );
};

export default ContenedorSecciones;