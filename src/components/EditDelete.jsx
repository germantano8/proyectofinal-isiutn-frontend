import React from 'react'
import { deleteData } from '../hooks/deleteData';
import ModalFormulario from './ModalFormulario';

const EditDelete = ({data, element, id}) => {

    // Esta función se encarga de borrar un objeto de la base de datos y recargar la página

    const deleteItem = async (element, id) => {
        await deleteData(element, id);
        window.location.href = `/${element}s`;
    }

    return (
        <td>
            <ModalFormulario element={element} value={<i class="bi bi-pencil"></i>} props={data.find((c) => c.cuit === id)} mode={'update'} id={id}/>
            &ensp;
            <button className='btn btn-danger' onClick={() => {deleteItem(element, id)}}><i class="bi bi-trash3"></i></button>
        </td>
    )
}

export default EditDelete