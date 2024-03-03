import React from 'react'
import { deleteData } from '../hooks/deleteData';

const EditDelete = ({element, id}) => {

    const editItem = (id) => {
        console.log('Editando el cliente con cuit: ', id);
    }

    const deleteItem = (element, id) => {
        deleteData(element, id);
        console.log(`Borrando el elemento ${element} con id ${id}`);
    }

    return (
        <td>
            <button className='btn btn-warning' onClick={() => {editItem(id)}}><i class="bi bi-pencil"></i></button>
            &ensp;
            <button className='btn btn-danger' onClick={() => {deleteItem(element, id)}}><i class="bi bi-trash3"></i></button>
        </td>
    )
}

export default EditDelete