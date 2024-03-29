import React, { forwardRef, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/contacto.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import {  faFilePdf } from '@fortawesome/free-solid-svg-icons';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Contacto = forwardRef((props, ref) => {
    const form = useRef(null);

    const sendEmail = (e) => {
        e.preventDefault();
        let asunto = document.getElementById("asunto");
        let email = document.getElementById("email");
        let nombre = document.getElementById("nombre");
        let mensaje = document.getElementById("mensaje");

        let vasunto = validarCampos(asunto);
        let vmensaje = validarCampos(mensaje);
        let vnombre = validarCampos(nombre);
        let vemail = validarEmail(email);

        if (vasunto === true && vemail === true && vnombre === true && vmensaje === true) {
            emailjs.sendForm('service_drzhtfh', 'template_l3hbyc9', form.current, 'GOv-lfA6Qgik1eJg5').then(() => {
                Swal.fire({
                    text: "Se envio de forma correcta su mensaje",
                    icon: "success"
                });
                limpiarForm();
            }).catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Error al enviar mensaje",
                    text: "Ocurrio un error, intentelo en unos minutos",
                });

            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error al enviar mensaje",
                text: "Los datos ingresados no cumplen con los requisitos",
            });
        }
    };
    const limpiarForm = () => {
        form.current.reset();
        let asunto = document.getElementById("asunto");
        let email = document.getElementById("email");
        let nombre = document.getElementById("nombre");
        let mensaje = document.getElementById("mensaje");

        asunto.className = "form-control";
        mensaje.className = "form-control";
        email.className = "form-control";
        nombre.className = "form-control";
    }
    const validarCampos = (input) => {
        if (input.value.trim() !== '') {
            input.className = 'form-control is-valid';
            return true;
        } else {
            input.className = 'form-control is-invalid';
            return false;
        }
    }
    const validarEmail = () => {
        const emailInput = form.current.elements.email;
        const email = emailInput.value.trim();
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (regexEmail.test(email)) {
            emailInput.className = 'form-control is-valid';
            return true;
        } else {
            emailInput.className = 'form-control is-invalid';
            return false;
        }
    }
    const DescargarPdf = async () => {
        const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobileDevice) {
            try {
                const pdfUrl = "/documento.pdf"; // Ruta relativa desde la raíz del servidor

                const link = document.createElement('a');
                link.href = pdfUrl;
                link.target = '_blank';
                link.rel = "noopener noreferrer";
                link.download = 'HollensteinFrancoCV.pdf'; // Nombre que tendrá el archivo al descargarse
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
    
            } catch (error) {
                console.error('Error al descargar el archivo PDF:', error);
            }
        }else {
            // Abre la página en dispositivos no móviles
            window.open('/pdf', '_blank');
        }
    };
    return (
        <section data-section="contacto" ref={ref} className='scroll-item contenedor-contacto'>
            <div className='titulo-contacto'>
                <h2>Contacto</h2>
                <p>Gracias por llegar hasta aca!</p>
            </div>
            <section className='seccion-contacto row'>
                <article className='contenedor-formulario col-lg-6 col-md-6 col-sm-12' aria-label='formulario'>
                    <form ref={form} onSubmit={sendEmail} className='formulario'>
                        <div>
                            <input id='nombre' name='nombre' onBlur={(e) => validarCampos(e.target)} className='form-control' placeholder='nombre' type="text" required />
                        </div>
                        <div>
                            <input id='email' name='email' onBlur={() => validarEmail()} className='form-control' placeholder='email' type="email" required />
                        </div>
                        <div>
                            <input id='asunto' name='asunto' onBlur={(e) => validarCampos(e.target)} className='form-control' placeholder='asunto' type="text" required />
                        </div>
                        <div>
                            <textarea id='mensaje' name="mensaje" onBlur={(e) => validarCampos(e.target)} className='form-control' placeholder='su mensaje' cols="30" rows="10" required></textarea>
                        </div>
                        <button className='btn btn-success'>Enviar mensaje</button>
                    </form>
                </article>
                <article className='mapa col-lg-6 col-md-6 col-sm-12' aria-label='mapa'>
                    <div>
                        <iframe title="Domicilio" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113927.15975832954!2d-65.30499574754882!3d-26.832835032918194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94223792d6c56903%3A0xf88d5b92b5c56527!2sSan%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1ses!2sar!4v1700632037750!5m2!1ses!2sar" loading="lazy"></iframe>
                    </div>
                </article>
            </section>
            <section className='formas-contacto' aria-label='formas-contacto'>

                <a rel="noopener noreferrer" href='https://wa.me/543815578922' target='_blank' className='btn btn-success'>
                    <FontAwesomeIcon className='me-1' icon={faWhatsapp} />
                    WhatsApp</a>
                <a rel="noopener noreferrer" href='https://www.linkedin.com/in/franco-david-hollenstein-689646161/' target='_blank' className='btn btn-info'>
                    <FontAwesomeIcon className='me-1' icon={faLinkedin} />
                    Linkedin</a>
                <a href="#" className='btn btn-danger' id='enlace-pdf' onClick={() => { DescargarPdf() }}>
                    <FontAwesomeIcon className='me-1' icon={faFilePdf} />
                    Curriculum</a>
            </section>
        </section>
    );
});

export default Contacto;