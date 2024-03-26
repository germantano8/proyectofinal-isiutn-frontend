import {React} from 'react'
import {useGetData} from '../../hooks/getData'
import Loading from '../../components/Loading'
import EditDelete from '../../components/EditDelete'
import ModalFormulario from '../../components/ModalFormulario'

const Vehiculos = () => {

  // Acá se llama al hook useGetData, que hace el fetch API a la URL 
  // correspondiente (enviada por parámetro) y devuelve un array con los datos y 
  // un booleano que indica si se están cargando los datos
  const [vehiculos, loading] = useGetData('vehiculo');

  // Acá se define la estructura del objeto que vamos a estar trabajando en esta página
   const props = {
       patente: '',
       estado: '',
       anio: '',
       kilometraje: '',
       id_tipo_vehiculo: '',
       tipo_vehiculo: {
                 descripcion: ''
       }
   }

  return (
    <>
        <div className='table-responsive col-12 col-md-6 col-lg-9'>
          <h1 className='text-left'>Vehiculos</h1>

          {/* Acá se llama al componente ModalFormulario, que se encarga de mostrar un modal con un formulario para agregar un nuevo cliente 
            element: el nombre del elemento que se va a agregar (va a servir para posteriormente hacer los fetch a la URL correspondientes), 
            value: el texto que se va a mostrar en el botón (va a variar según la página en la que estemos trabajando), 
            props: las propiedades del objeto que se va a agregar
          
          */}
          <br />
          <ModalFormulario element={"vehiculo"} value={"Nuevo vehiculo"} props={props} mode={'new'}/>
          <br/><br/>

          <table className="table table-striped">
            <thead>
              <tr>
                
                  <th scope="col">Patente</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">kilometraje</th>
              </tr>
            </thead>

            {loading && <Loading/>}

            <tbody>
                {
                  vehiculos.map((c) => {
                    return (
                      <tr key={c.patente}>
                        <td>{c.patente}</td>
                        <td>{c.estado}</td>
                        <td>{c.tipo_vehiculo.descripcion}</td>
                        <td>{c.kilometraje}</td>
                        <EditDelete data={vehiculos} element={"vehiculo"} id={c.patente}/>
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