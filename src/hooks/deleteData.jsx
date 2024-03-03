export const deleteData = async (element, id) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_URL}/api/${element}/${id}`, {
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials:'include',
        });
        console.log(res)
        if (!res.ok) {
            throw new Error('No se pudo borrar el objeto');
        }
    }catch (error) {
        console.error('Error al obtener objetos:', error);
    }
}