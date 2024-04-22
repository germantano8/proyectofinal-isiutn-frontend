import {React} from 'react'
import {useGetData} from '../../hooks/getData'
import Loading from '../../components/Loading'
import EditDelete from '../../components/EditDelete'
import ModalFormularioVehiculo from '../../components/ModalFormularioVehiculo'

const Vehiculos = () => {

  const [vehiculos, loading] = useGetData('vehiculo');
  
  const props = {
    patente: '',
    estado: 'disponible',
    anio: 0,
    kilometraje: 0,
    id_tipo_vehiculo: '',
    tipo_vehiculo: {
              descripcion: ''
    }
}
  return (
    <>
        <div className='table-responsive col-12 col-md-6 col-lg-9'>
          <h1 className='text-left'>Vehículos</h1>
          <br />
          <ModalFormularioVehiculo element={"vehiculo"} value={"Nuevo vehículo"} props={props} mode={'new'}/>
          <br/><br/>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Patente</th>
                    <th scope="col">Año</th>
                    <th scope="col">Kilometraje</th>
                    <th scope="col">Tipo de vehículo</th>
              </tr>
            </thead>

            {loading && <Loading/>}

            <tbody>
                {
                  vehiculos.map((r) => {
                    return (
                      <tr key={r.patente}>
                        <td>{r.patente}</td>
                        <td>{r.anio}</td>
                        <td>{r.kilometraje}</td>
                        <td>{r.tipo_vehiculo.descripcion}</td>
                        <EditDelete data={vehiculos} element={"vehiculo"} id={r.patente}/>
                      </tr>
                    )
                  })
                }
            </tbody>
          </table>
        </div>
    </>
  )
}

export default Vehiculos