import {React} from 'react'
import Sidebar from '../../components/Sidebar'
import {useGetData} from '../../hooks/getData'
import Loading from '../../components/Loading'
import EditDelete from '../../components/EditDelete'
import ModalFormulario from '../../components/ModalFormulario'

const Trabajos = () => {

    // Acá se llama al hook useGetData, que hace el fetch API a la URL 
    // correspondiente (enviada por parámetro) y devuelve un array con los datos y 
    // un booleano que indica si se están cargando los datos
    const [trabajos, loading] = useGetData('trabajo');

    // Acá se define la estructura del objeto que vamos a estar trabajando en esta página
    const props={
        id_trabajo:'',
        fecha_desde:'',
        fecha_hasta:'',
        kilometraje:'',
        patente:'',
        id_proyecto:'',
        dni_conductor:'',
        cuit_cliente:'',
    }

    return (
        <>
            <Sidebar/>
            <div className='table-responsive col-12 col-md-6 col-lg-9'>
            <h1 className='text-left'>Trabajos</h1>

            {/* Acá se llama al componente ModalFormulario, que se encarga de mostrar un modal con un formulario para agregar un nuevo cliente 
                element: el nombre del elemento que se va a agregar (va a servir para posteriormente hacer los fetch a la URL correspondientes), 
                value: el texto que se va a mostrar en el botón (va a variar según la página en la que estemos trabajando), 
                props: las propiedades del objeto que se va a agregar
            
            */}
            <br />
            <ModalFormulario element={"trabajo"} value={"Nuevo trabajo"} props={props} mode={'new'}/>
            <br/><br/>

            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Patente</th>
                    <th scope="col">Fecha desde</th>
                    <th scope="col">Fecha hasta</th>
                    <th scope="col">Kilometraje</th>
                </tr>
                </thead>

                {loading && <Loading/>}

                <tbody>
                    {
                    trabajos.map((t) => {
                        return (
                        <tr key={t.id_trabajo}>
                            <td>{t.id_trabajo}</td>
                            <td>{t.patente}</td>
                            <td>{t.fecha_desde}</td>
                            <td>{t.fecha_hasta}</td>
                            <td>{t.kilometraje}</td>
                            <EditDelete data={trabajos} element={"trabajo"} id={t.id_trabajo}/>
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

export default Trabajos