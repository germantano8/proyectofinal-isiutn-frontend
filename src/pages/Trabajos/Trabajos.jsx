import {React} from 'react'
import { deleteData, useGetData } from '../../hooks';
import ModalFormularioTrabajo from '../../components/ModalFormularioTrabajo'
import {Loading} from '../../components/'

const Trabajos = () => {
    const [trabajos, loading] = useGetData('trabajo');

    // Acá se define la estructura del objeto que vamos a estar trabajando en esta página
    const props={
        id_trabajo:'',
        fecha_desde:'',
        fecha_hasta:'',
        kilometraje:0,
        patente:'',
        id_proyecto:0,
        dni_conductor:'',
        cuit_cliente:'',
    }

    const deleteItem = async (id) => {
        await deleteData('trabajo', id);
        window.location.reload();
        console.log(id)
    }

    return (
        <div className='table-responsive col-12 col-md-6 col-lg-9'>
            <h2 className='text-left'>Trabajos</h2>

            {/* Acá se llama al componente ModalFormulario, que se encarga de mostrar un modal con un formulario para agregar un nuevo cliente 
                element: el nombre del elemento que se va a agregar (va a servir para posteriormente hacer los fetch a la URL correspondientes), 
                value: el texto que se va a mostrar en el botón (va a variar según la página en la que estemos trabajando), 
                props: las propiedades del objeto que se va a agregar
            */}
            <ModalFormularioTrabajo value={"Nuevo trabajo"} props={props} mode={'new'}/>

            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Patente</th>
                    <th scope="col">Fecha desde</th>
                    <th scope="col">Fecha hasta</th>
                    <th scope="col">Kilometraje</th>
                    <th scope="col">Tipo trabajo</th>
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
                            <td>{t.cuit_cliente === '11111111111' ? "Propio" : "Alquiler"}</td>
                            <td>
                                <ModalFormularioTrabajo value={<i class="bi bi-pencil"></i>} props={trabajos.find((objeto) => Object.values(objeto)[0] === t.id_trabajo)} mode={'update'} id={t.id_trabajo}/>
                                &ensp;
                                <button className='btn btn-danger' onClick={() => {deleteItem(t.id_trabajo)}}><i class="bi bi-trash3"></i></button>
                            </td>
                        </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Trabajos