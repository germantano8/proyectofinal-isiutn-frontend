export const updateData = async (element, data, id) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_URL}/api/${element}/${id}`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials:'include',
            body: JSON.stringify(data)
        });
        console.log(res)
        if (!res.ok) {
            throw new Error('No se pudo actualizar el objeto');
        }
    }catch(error){
        console.error('Error al actualizar objetos:', error);
    }
}