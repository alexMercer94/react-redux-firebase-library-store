import React from 'react';

const SubscriberTicket = ({ student }) => {
    return (
        <div className="card my-3 mb-4">
            <h3 className="card-header bg-primary text-white">Datos Solicitante</h3>
            <div className="card-body">
                <p className="font-weiht-bold">
                    Nombre: {''}
                    <span className="font-weight-normal">{student.name}</span>
                </p>
                <p className="font-weiht-bold">
                    Código: {''}
                    <span className="font-weight-normal">{student.code}</span>
                </p>
                <p className="font-weiht-bold">
                    Carrera: {''}
                    <span className="font-weight-normal">{student.career}</span>
                </p>
            </div>
        </div>
    );
};

export default SubscriberTicket;
