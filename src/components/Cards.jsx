import {React, useState, useEffect} from 'react'
import Card from './Card'

const Cards = () => {

    const [vehiculos, setVehiculos] = useState([]);

    const getVehiculos = async () => {
    
        try {
            const res = await fetch('http://localhost:3000/api/vehiculo', {
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
            setVehiculos(data);
        }catch (error) {
            console.error('Error al obtener objetos:', error);
        }
    };
    
    useEffect(() => {
        getVehiculos();
    }, []);

    return (
        <div className='row'>
            {vehiculos.map((vehiculo, index) => {
                    return <Card key={index} object={vehiculo}/>
                })
            }
        </div>
    )
}

export default Cards