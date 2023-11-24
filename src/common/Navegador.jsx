import React, { Fragment, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

const Navegador = (props) => {

    const inidiceBuscar = (elemento) => {
        if(window.innerWidth >= 1150){
        elemento.current.scrollIntoView({
            behavior: 'smooth',
        })
    }
    }
    const desplegarMenu = () => {
        let navegador = document.getElementById("menu-nav");
        if (navegador.classList.contains("visible")) {
            navegador.classList.remove("visible");
        } else {
            navegador.classList.add("visible");
        }
    };

    return (
        <Fragment>
            <section className='navegador'>
                <article id='menu-nav' className='nav-list'>
                    <ul className='lista-opc'>
                        <button onClick={() => desplegarMenu()} className='btn-cerrar-menu'>
                            <FontAwesomeIcon className='me-1' icon={faXmark} />
                        </button>
                        <li onClick={() => inidiceBuscar(props.refsLista.inicio)} className='li-opc'>Inicio</li>
                        <li onClick={() => inidiceBuscar(props.refsLista.skills)} className='li-opc'>Skills</li>
                        <li onClick={() => inidiceBuscar(props.refsLista.proyectos)} className='li-opc'>Proyectos</li>
                        <li onClick={() => inidiceBuscar(props.refsLista.contacto)} className='li-opc'>Contacto</li>
                    </ul>
                </article>

                <button onClick={() => desplegarMenu()} className='btn-abrir-menu'>
                    <FontAwesomeIcon className='me-1' icon={faBars} />
                </button>
            </section>
        </Fragment>
    );
};

export default Navegador;