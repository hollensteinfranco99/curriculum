import React, { Component } from 'react';
import '../css/contacto.css';

class Pdf extends Component {
    
    componentDidMount() {

        const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobileDevice) {
            document.getElementById("enlace-pdf").click();
            window.close();
        }
    }

    render() {
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
    }
}

export default Pdf;



