import React, { forwardRef, Fragment, useEffect } from 'react';
import Inicio from './Inicio';
import Proyectos from './Proyectos';
import Contacto from './Contacto';
import Skills from './Skills';

const ContenedorSecciones = (props) => {

    useEffect(()=>{
        scrollear();
    },[])


const scrollear = () => {
    
    if(window.innerWidth >= 1150){
        const container = document.querySelector('.scroll-container');
        container.addEventListener('wheel', (event) => {
            event.preventDefault();
            const delta = event.deltaY;
            
            container.scrollBy({
                top: delta,
                behavior: 'smooth'
            });
        });
    }
}

    return (
        <section className='scroll-container'>
            <Inicio ref={props.refsLista.inicio}></Inicio>
            <Skills ref={props.refsLista.skills}></Skills>
            <Proyectos ref={props.refsLista.proyectos}></Proyectos>
            <Contacto ref={props.refsLista.contacto}></Contacto>
        </section>
    );
};

export default ContenedorSecciones;