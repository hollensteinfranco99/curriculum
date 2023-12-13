import React, { forwardRef, useLayoutEffect, useState, useEffect } from 'react';
import Inicio from './Inicio';
import Proyectos from './Proyectos';
import Contacto from './Contacto';
import Skills from './Skills';
import SobreMi from './SobreMi';

const ContenedorSecciones = (props) => {
    const [esDispositivoPequeno, setEsDispositivoPequeno] = useState(
        window.innerWidth <= 900
    );

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
        const scrollear = () => {
            const container = document.querySelector('.scroll-container');
    
            let isTouching = false;
            let startTouchY = 0;
            const sensitivity = 1; // Ajusta la sensibilidad según tus necesidades
    
            const handleTouchStart = (event) => {
                isTouching = true;
                startTouchY = event.touches[0].clientY;
            };
    
            const handleTouchMove = (event) => {
                if (!isTouching) return;
                event.preventDefault();
    
                const currentTouchY = event.touches[0].clientY;
                const delta = (startTouchY - currentTouchY) * sensitivity;
    
                container.scrollBy({
                    top: delta,
                    behavior: 'smooth',
                });
    
                startTouchY = currentTouchY;
            };
    
            const handleTouchEnd = () => {
                isTouching = false;
            };
    
            const handleWheel = (event) => {
                event.preventDefault();
                const delta = event.deltaY;
    
                container.scrollBy({
                    top: delta,
                    behavior: 'smooth',
                });
            };
    
            container.addEventListener('touchstart', handleTouchStart);
            container.addEventListener('touchmove', handleTouchMove);
            container.addEventListener('touchend', handleTouchEnd);
            container.addEventListener('wheel', handleWheel);
    
            return () => {
                container.removeEventListener('touchstart', handleTouchStart);
                container.removeEventListener('touchmove', handleTouchMove);
                container.removeEventListener('touchend', handleTouchEnd);
                container.removeEventListener('wheel', handleWheel);
            };
        };
    
        scrollear();
    }, []);

    return (
        <section className='scroll-container'>
            <Inicio ref={props.refsLista.inicio}></Inicio>
            <Skills
                esDispositivoPequeno={esDispositivoPequeno}
                ref={props.refsLista.skills}
            ></Skills>
            {esDispositivoPequeno ? (
                <SobreMi ref={props.refsLista.sobremi}></SobreMi>
            ) : null}

            <Proyectos ref={props.refsLista.proyectos}></Proyectos>
            <Contacto ref={props.refsLista.contacto}></Contacto>
        </section>
    );
};

export default ContenedorSecciones;