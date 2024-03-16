import { useEffect, useState, useCallback } from "react";

export const useGetData = (element) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = useCallback(async () => {
    
        setLoading(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_URL}/api/${element}`, {
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials:'include',
            });
            if (!res.ok) {
                throw new Error('No se pudo obtener la información');
            }
            const data = await res.json();

            if(data){
                setData(data);
            }
            
            setLoading(false);
        }catch (error) {
            console.error('Error al obtener objetos:', error);
        }
    }, []);
    
    useEffect(() => {
        getData();
    }, [getData]);

    return [data, loading];
}