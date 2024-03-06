import React from 'react'
import { deleteData } from '../hooks/deleteData';

const EditDelete = ({data, element, id}) => {

    const editItem = (id) => {
        console.log('Editando el cliente con cuit: ', id);
    }

    const deleteItem = async (element, id) => {
        await deleteData(element, id);
        window.location.href = `/${element}s`;
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