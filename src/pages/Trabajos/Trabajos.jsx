import {React, useState, useEffect} from 'react'
import EditDelete from '../../components/EditDelete'
import ModalFormulario from '../../components/ModalFormulario'

const Trabajos = ({id_proyecto}) => {

    const [trabajos, setTrabajo] = useState([]);

    useEffect(() => {
        const fetchTrabajo = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_URL}/api/trabajo`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                
                });
                if (!response.ok) {
                    throw new Error('Error al obtener los detalles del proyecto');
                }
                const data = await response.json();
                setTrabajo(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTrabajo();
    }, []);

    // Acá se define la estructura del objeto que vamos a estar trabajando en esta página
    const props={
        id_trabajo:'',
        fecha_desde:'',
        fecha_hasta:'',
        kilometraje:'',
        patente:'',
        id_proyecto:id_proyecto,
        dni_conductor:'',
        cuit_cliente:'',
    }

    return (
        <>
            <h2 className='text-left'>Trabajos</h2>

            {/* Acá se llama al componente ModalFormulario, que se encarga de mostrar un modal con un formulario para agregar un nuevo cliente 
                element: el nombre del elemento que se va a agregar (va a servir para posteriormente hacer los fetch a la URL correspondientes), 
                value: el texto que se va a mostrar en el botón (va a variar según la página en la que estemos trabajando), 
                props: las propiedades del objeto que se va a agregar
            
            */}
            <ModalFormulario element={"trabajo"} value={"Nuevo trabajo"} props={props} mode={'new'}/>

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

                <tbody>
                    {
                    trabajos.filter(t => t.id_proyecto == id_proyecto)
                        .map((t) => {
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
        </>
    )
}

export default Trabajos