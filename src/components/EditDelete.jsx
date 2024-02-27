import React from 'react'

const EditDelete = ({id}) => {

    const editItem = (id) => {
        console.log('Editando el cliente con cuit: ', id);
    }

    const deleteItem = (id) => {
        console.log('Borrando el cliente con cuit: ', id);
    }

    return (
        <td>
            <button className='btn btn-warning' onClick={() => {editItem(id)}}><i class="bi bi-pencil"></i></button>
            &ensp;
            <button className='btn btn-danger' onClick={() => {deleteItem(id)}}><i class="bi bi-trash3"></i></button>
        </td>
    )
}

export default EditDelete