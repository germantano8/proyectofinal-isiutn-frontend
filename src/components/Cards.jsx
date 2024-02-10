import {React} from 'react'
import Card from './Card'
import {useGetVehiculos} from '../hooks/getVehiculos'
import Loading from './Loading'

const Cards = () => {

    const [vehiculos, loading] = useGetVehiculos();

    return (
        <>
            <h1 className='text-left'>Panel general</h1>
            <br/>
            <button className="btn btn-orange">Nuevo trabajo</button>

            <br/><br/>

            {loading && <Loading/>}

            <div className='row'>
                {vehiculos.map((vehiculo, index) => {
                        return (
                            <div className='col-4'>
                                <Card key={index} vehiculo={vehiculo}/>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Cards