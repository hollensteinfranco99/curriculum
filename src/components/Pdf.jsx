import React, { useEffect } from 'react';
import '../css/contacto.css';

const Pdf = () => {
    useEffect(() => {
        if (typeof window.orientation !== 'undefined') {
            document.getElementById("enlace-pdf").click();
            window.close();
        }
    }, []);

    return (
        <div className='pdf'>
            <object
                data={require('../pdf/HollensteinFrancoCV.pdf')}
                type="application/pdf"
                width="100%"
                height="100%"
            >
                <br />
                <a
                    href={require('../pdf/HollensteinFrancoCV.pdf')}
                    id='enlace-pdf'
                    download="HollensteinFranco-CV.pdf"
                >
                    Tu dispositivo no puede visualizar los PDF, da click aquí para descargarlo
                </a>
            </object>
        </div>
    );
};

export default Pdf;