import {React, useEffect, useState} from 'react'
import { deleteData, useGetData } from '../../hooks';
import ModalFormularioTrabajo from '../../components/ModalFormularioTrabajo'
import {Loading} from '../../components/'

const Trabajos = () => {
    const [trabajos, loadingTrabajos] = useGetData('trabajo');
    const [clientes] = useGetData('cliente'); // Suponiendo que 'cliente' es la ruta correcta
    const [proyectos] = useGetData('proyecto'); // Suponiendo que 'proyecto' es la ruta correcta
    const [clienteMap, setClienteMap] = useState({});
    const [proyectoMap, setProyectoMap] = useState({});

    useEffect(() => {
        const clienteMap = {};
        clientes.forEach(cliente => {
            clienteMap[cliente.cuit] = cliente.razon_social;
        });
        setClienteMap(clienteMap);

        const proyectoMap = {};
        proyectos.forEach(proyecto => {
            proyectoMap[proyecto.id] = proyecto.nombre;
        });
        setProyectoMap(proyectoMap);
    }, [clientes, proyectos]);

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
            <h1 className='text-left'>Trabajos</h1>
            <br />

            <ModalFormularioTrabajo value={"Nuevo trabajo"} props={props} mode={'new'}/>
            <br /><br />

            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Patente</th>
                    <th scope="col">Fecha desde</th>
                    <th scope="col">Fecha hasta</th>
                    <th scope="col">Kilometraje</th>
                    <th scope="col">Tipo trabajo</th>
                    <th scope="col">Cliente/Proyecto</th> {/* Añade esta línea */}
                </tr>
                </thead>

                {loadingTrabajos && <Loading/>}

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
                                <td>{t.cuit_cliente === '00000000000' ? "Propio" : "Alquiler"}</td>
                                <td>{t.cuit_cliente === '00000000000' ? "Proyecto: " + proyectoMap[t.id_proyecto] : clienteMap[t.cuit_cliente]}</td> 
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