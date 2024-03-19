import {React} from 'react'
import Card from './Card'
import {useGetData} from '../hooks/getData'
import Loading from './Loading'

const Cards = () => {

    const [vehiculos, loading] = useGetData('vehiculo');

    return (
        <>
            <h1 className='text-left'>Panel general</h1>
            <br/>

            {loading && <Loading/>}

            <div className='row'>
                {vehiculos.map((vehiculo) => {
                        return (
                            <div className='col-12 col-lg-4'>
                                <Card key={vehiculo.patente} vehiculo={vehiculo}/>
                                <br />
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Cards