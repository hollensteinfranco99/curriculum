import React from 'react';
import '../css/contacto.css';

const Pdf = () => {


    return (
        <div className='pdf'>
        <object
            data={'/documento.pdf'}
            type="application/pdf"
            width="100%"
            height="100%"
        >
            <br />
        </object>
    </div>
    );
};

export default Pdf;

