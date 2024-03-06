export const insertData = async (element, data) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_URL}/api/${element}`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials:'include',
            body: JSON.stringify(data)
        });
        console.log(res)
        if (!res.ok) {
            throw new Error('No se pudo insertar el objeto');
        }
    }catch (error) {
        console.error('Error al insertar objetos:', error);
    }
}