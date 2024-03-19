import {React} from 'react'
import {useGetData} from '../../hooks/getData'
import Loading from '../../components/Loading'
import EditDelete from '../../components/EditDelete'
import ModalFormulario from '../../components/ModalFormulario'

const Clientes = () => {

  // Acá se llama al hook useGetData, que hace el fetch API a la URL 
  // correspondiente (enviada por parámetro) y devuelve un array con los datos y 
  // un booleano que indica si se están cargando los datos
  const [clientes, loading] = useGetData('cliente');

  // Acá se define la estructura del objeto que vamos a estar trabajando en esta página
  const props={
    cuit:'',
    razon_social:''
  }

  return (
    <>
        <div className='table-responsive col-12 col-md-6 col-lg-9'>
          <h1 className='text-left'>Clientes</h1>

          {/* Acá se llama al componente ModalFormulario, que se encarga de mostrar un modal con un formulario para agregar un nuevo cliente 
            element: el nombre del elemento que se va a agregar (va a servir para posteriormente hacer los fetch a la URL correspondientes), 
            value: el texto que se va a mostrar en el botón (va a variar según la página en la que estemos trabajando), 
            props: las propiedades del objeto que se va a agregar
          
          */}
          <br />
          <ModalFormulario element={"cliente"} value={"Nuevo cliente"} props={props} mode={'new'}/>
          <br/><br/>

          <table className="table table-striped">
            <thead>
              <tr>
                  {/* {clientes && Object.keys(clientes[0]).map((k)=>{return <th scope="col">{k.replace('_', ' ').toLocaleUpperCase()}</th>})} */}
                  <th scope="col">Cuit</th>
                  <th scope="col">Razón Social</th>
                  <th scope="col">Acciones</th>
              </tr>
            </thead>

            {loading && <Loading/>}

            <tbody>
                {
                  clientes.map((c) => {
                    return (
                      <tr key={c.cuit}>
                        <td>{c.cuit}</td>
                        <td>{c.razon_social}</td>
                        <EditDelete data={clientes} element={"cliente"} id={c.cuit}/>
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

export default Clientes