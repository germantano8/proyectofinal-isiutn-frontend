import {cookies} from '../../utils/utils'
import Card from '../../components/Card'
import {useState, useEffect} from 'react'

// const getVehiculos = async () => {
//     const res = await fetch('http://localhost:3000/api/vehiculo',{
//         method:'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         credentials:'include',
//     })
//     const vehiculos = await vehiculos.json()
//     return vehiculos;
// }

// const getVehiculos = async () => {
//     const [vehiculos, setVehiculos] = useState([])

//     useEffect(() => {
//         fetch('http://localhost:3000/api/vehiculo',{
//                 method:'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials:'include',
//             })
//             const vehiculos = await res.json()
//             setVehiculos(vehiculos)
//     }, [])
// }

const Dashboard = () => {
    
    if(!cookies.get('token')){
        window.location.href = "/login"
    }

    return (
        <div className='container'>
            <div className="row justify-content-center">
                <div className="col-3">
                    <img src="./logo-controlmaq.png" className='img-thumbnail' alt="logo controlmaq"/>
                    <br/>
                    <div className="list-group">
                        <a href="dashboard" className="list-group-item list-group-item-action">Overview</a>
                        <a href="#" className="list-group-item list-group-item-action">Proyectos</a>
                        <a href="#" className="list-group-item list-group-item-action">Mantenimiento</a>
                        <a href="#" className="list-group-item list-group-item-action">Clientes</a>
                        <a href="#" className="list-group-item list-group-item-action">Métricas de uso</a>
                    </div>
                </div>
                <div className="col-9">
                    <h1 className='text-left'>Panel general</h1>
                    <br/>
                    <button className="btn btn-orange">Nuevo trabajo</button>

                    <br/><br/>

                    <div className='row'>
                        <Card/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard