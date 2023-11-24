import React, { Fragment, forwardRef, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/contacto.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faFilePdf, faSquarePhone } from '@fortawesome/free-solid-svg-icons';
import emailjs from '@emailjs/browser';

const Contacto = forwardRef((props, ref) => {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_drzhtfh', 'template_l3hbyc9', form.current, 'GOv-lfA6Qgik1eJg5')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <section data-section="contacto" ref={ref} className='scroll-item contenedor-contacto'>
            <div className='titulo-contacto'>
                <h2>Contacto</h2>
                <p>Gracias por llegar hasta aca!</p>
            </div>
            <section className='seccion-contacto'>
                <article className='contenedor-formulario' aria-label='formulario'>
                    <form ref={form} onSubmit={sendEmail} className='formulario'>
                        <input name='nombre' className='form-control' placeholder='nombre' type="text" />
                        <input name='email' className='form-control' placeholder='email' type="email"/>
                        <input name='asunto' className='form-control' placeholder='asunto' type="text" />
                        <textarea name="mensaje" className='form-control' placeholder='su mensaje' cols="30" rows="10"></textarea>
                        <button className='btn btn-success'>Enviar mensaje</button>
                    </form>
                </article>
                <article className='mapa' aria-label='mapa'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113927.15975832954!2d-65.30499574754882!3d-26.832835032918194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94223792d6c56903%3A0xf88d5b92b5c56527!2sSan%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1ses!2sar!4v1700632037750!5m2!1ses!2sar" loading="lazy"></iframe>
                </article>
            </section>
            <section className='formas-contacto' aria-label='formas-contacto'>

                <a href='https://w.app/rvkGfM' target='_blank' className='btn btn-success'>
                    <FontAwesomeIcon className='me-1' icon={faWhatsapp} />
                    WhatsApp</a>
                <a className='btn btn-info'>
                    <FontAwesomeIcon className='me-1' icon={faLinkedin} />
                    Linkedin</a>
                <a href='mailto:hollensteinfranco99@gmail.com' target='_blank' className='btn btn-warning'>
                    <FontAwesomeIcon className='me-1' icon={faEnvelope} />
                    Gmail</a>
                <a className='btn btn-danger'>
                    <FontAwesomeIcon className='me-1' icon={faFilePdf} />
                    Curriculum</a>
            </section>
        </section>
    );
});

export default Contacto;