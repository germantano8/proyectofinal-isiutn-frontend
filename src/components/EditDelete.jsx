import React from 'react';
import { deleteData } from '../hooks/deleteData';
import ModalFormulario from './ModalFormulario';
import ModalFormularioReparacion from './ModalFormularioReparacion';
import ModalFormularioVehiculo from './ModalFormularioVehiculo';
import ModalFormularioService from './ModalFormularioService'; // Importar el formulario para service

const EditDelete = ({ data, element, id }) => {
    // Esta función se encarga de borrar un objeto de la base de datos y recargar la página
    const deleteItem = async (element, id) => {
        await deleteData(element, id);
        window.location.reload();
    };

    return (
        <td>
            {element === 'reparacion' ? (
                <>
                    <ModalFormularioReparacion
                        element={element}
                        value={<i className="bi bi-pencil"></i>}
                        props={data.find((objeto) => Object.values(objeto)[0] === id)}
                        mode={'update'}
                        id={id}
                    />
                    &ensp;
                    <button className='btn btn-danger' onClick={() => { deleteItem(element, id) }}><i className="bi bi-trash3"></i></button>
                </>
            ) : element === 'vehiculo' ? (
                <>
                    <ModalFormularioVehiculo
                        element={element}
                        value={<i className="bi bi-pencil"></i>}
                        props={data.find((objeto) => Object.values(objeto)[0] === id)}
                        mode={'update'}
                        id={id}
                    />
                    &ensp;
                    <button className='btn btn-danger' onClick={() => { deleteItem(element, id) }}><i className="bi bi-trash3"></i></button>
                </>
            ) : element === 'service' ? ( 
                <>
                    <ModalFormularioService
                        element={element}
                        value={<i className="bi bi-pencil"></i>}
                        props={data.find((objeto) => Object.values(objeto)[0] === id)}
                        mode={'update'}
                        id={id}
                    />
                    &ensp;
                    <button className='btn btn-danger' onClick={() => { deleteItem(element, id) }}><i className="bi bi-trash3"></i></button>
                </>
            ) : (
                <>
                    <ModalFormulario
                        element={element}
                        value={<i className="bi bi-pencil"></i>}
                        props={data.find((objeto) => Object.values(objeto)[0] === id)}
                        mode={'update'}
                        id={id}
                    />
                    &ensp;
                    <button className='btn btn-danger' onClick={() => { deleteItem(element, id) }}><i className="bi bi-trash3"></i></button>
                </>
            )}
        </td>
    );
};

export default EditDelete;
