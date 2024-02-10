import {cookies} from '../../utils/utils'
import Card from '../../components/Card'
import {useState, useEffect} from 'react'
import Sidebar from '../../components/Sidebar'

const Dashboard = () => {
    
    if(!cookies.get('token')){
        window.location.href = "/login"
    }

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
        <div className='container'>
            <div className="row justify-content-center">
                <Sidebar/>
                <div className="col-9">
                    <h1 className='text-left'>Panel general</h1>
                    <br/>
                    <button className="btn btn-orange">Nuevo trabajo</button>

                    <br/><br/>

                    <div className='row'>
                        {vehiculos.map((vehiculo, index) => {
                            return <Card key={index} object={vehiculo}/>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard