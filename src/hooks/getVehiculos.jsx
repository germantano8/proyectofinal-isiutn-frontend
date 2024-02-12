import { useEffect, useState, useCallback } from "react";

export const useGetVehiculos = (element) => {
    const [vehiculos, setVehiculos] = useState([]);
    const [loading, setLoading] = useState(true);

    const getVehiculos = useCallback(async () => {
    
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
                setVehiculos(data);
            }
            
            setLoading(false);
        }catch (error) {
            console.error('Error al obtener objetos:', error);
        }
    }, []);
    
    useEffect(() => {
        getVehiculos();
    }, [getVehiculos]);

    return [vehiculos, loading];
}