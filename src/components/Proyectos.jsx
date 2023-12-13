import React, { Fragment, forwardRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
// import required modules
import { Navigation } from 'swiper/modules';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/proyectos.css';
import { imagenes } from '../imagen/imagenes';

const Proyectos = forwardRef((props, ref) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const tarjetas = document.querySelectorAll(".tarjeta-hover");

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // RESIZE
        window.addEventListener('resize', () => {
            handleResize();
        });

        return () => {
            window.removeEventListener('resize', () => {
                handleResize();
            });
        };
    }, []);

    return (
        <div data-section="proyectos" ref={ref} className='scroll-item contenedor-proyectos'>
            <section>
                <div className='titulo-cont'>
                    <h2>Proyectos</h2>
                </div>
                {isMobile ? (
                    <Swiper
                        autoHeight={true}
                        spaceBetween={20}
                        navigation={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Navigation]}
                        className="galeria-proyectos"
                        allowTouchMove={false}
                        >
                        {/* ======================================================= */}
                        <SwiperSlide>
                            <article className='tarjeta-proyecto'>
                                <section className='tarjeta-hover'>
                                    <div className='contenedor-img-proyecto'>
                                        <img src={imagenes.pelicula} alt="" />
                                    </div>
                                    <div className='informacion-tarjeta'>
                                        <div className='contenedor-img-logo'>
                                            <img src={imagenes.primelogo} alt="" />
                                        </div>
                                        <a href='https://peliculas-primevideo.netlify.app/' target='_blank' className='btn btn-danger'>Ver sitio</a>
                                        <a href='https://github.com/hollensteinfranco99/peliculas-frontend.git' target='_blank' className='px-3 py-1 btn btn-warning btn-codigo'>codigo</a>
                                    </div>
                                </section>
                                <div className='descripcion'>
                                    <p>La pagina sirve para mostrar, buscar y filtrar pelciulas y series que se encuentra en la API MovieDb</p>
                                    <span className='btn btn-dark ms-1'>HTML</span>
                                    <span className='btn btn-dark ms-1'>JAVASCRIPT</span>
                                    <span className='btn btn-dark ms-1'>CSS</span>
                                    <span className='btn btn-dark ms-1'>REACT</span>
                                </div>
                            </article>
                        </SwiperSlide>
                        {/* ======================================================= */}
                        <SwiperSlide>
                            <article className='tarjeta-proyecto'>
                                <section className='tarjeta-hover'>
                                    <div className='contenedor-img-proyecto'>
                                        <img src={imagenes.pixie} alt="" />
                                    </div>
                                    <div className='informacion-tarjeta'>
                                        <div className='contenedor-img-logo'>
                                            <h3 className='pixie-logo'>Pixie Games</h3>
                                        </div>
                                        <a href='https://cosmic-gumdrop-5c7ec3.netlify.app/' target='_blank' className='btn btn-danger'>Ver sitio</a>
                                        <a href='https://github.com/hollensteinfranco99/pixiegames' target='_blank' className='px-3 py-1 btn btn-warning btn-codigo'>codigo</a>
                                    </div>
                                </section>
                                <div className='descripcion'>
                                    <p>Pagina ilustrativa donde muestran los videojuegos mas populares</p>
                                    <span className='btn btn-dark ms-1'>HTML</span>
                                    <span className='btn btn-dark ms-1'>CSS</span>
                                    <span className='btn btn-dark ms-1'>BOOTSTRAP</span>
                                </div>
                            </article>
                        </SwiperSlide>
                    </Swiper>) : (
                    <>
                        <section className="galeria-proyectos">
                            <article className='tarjeta-proyecto'>
                                <section className='tarjeta-hover'>
                                    <div className='contenedor-img-proyecto'>
                                        <img src={imagenes.pelicula} alt="" />
                                    </div>
                                    <div className='informacion-tarjeta'>
                                        <div className='contenedor-img-logo'>
                                            <img src={imagenes.primelogo} alt="" />
                                        </div>
                                        <a href='https://peliculas-primevideo.netlify.app/' target='_blank' className='btn btn-danger'>Ver sitio</a>
                                        <a href='https://github.com/hollensteinfranco99/peliculas-frontend.git' target='_blank' className='px-3 py-1 btn btn-warning btn-codigo'>codigo</a>
                                    </div>
                                </section>
                                <div className='descripcion'>
                                    <p>La pagina sirve para mostrar, buscar y filtrar pelciulas y series que se encuentra en la API MovieDb</p>
                                    <span className='btn btn-dark ms-1'>HTML</span>
                                    <span className='btn btn-dark ms-1'>JAVASCRIPT</span>
                                    <span className='btn btn-dark ms-1'>CSS</span>
                                    <span className='btn btn-dark ms-1'>REACT</span>
                                </div>
                            </article>
                            <article className='tarjeta-proyecto'>
                                <section className='tarjeta-hover'>
                                    <div className='contenedor-img-proyecto'>
                                        <img src={imagenes.pixie} alt="" />
                                    </div>
                                    <div className='informacion-tarjeta'>
                                        <div className='contenedor-img-logo'>
                                            <h3 className='pixie-logo'>Pixie Games</h3>
                                        </div>
                                        <a href='https://cosmic-gumdrop-5c7ec3.netlify.app/' target='_blank' className='btn btn-danger'>Ver sitio</a>
                                        <a href='https://github.com/hollensteinfranco99/pixiegames' target='_blank' className='px-3 py-1 btn btn-warning btn-codigo'>codigo</a>
                                    </div>
                                </section>
                                <div className='descripcion'>
                                    <p>Pagina ilustrativa donde muestran los videojuegos mas populares</p>
                                    <span className='btn btn-dark ms-1'>HTML</span>
                                    <span className='btn btn-dark ms-1'>CSS</span>
                                    <span className='btn btn-dark ms-1'>BOOTSTRAP</span>
                                </div>
                            </article>
                        </section>
                    </>
                )}

            </section>
        </div >
    );
});

export default Proyectos;
