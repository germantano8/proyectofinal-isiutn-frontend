import React from 'react'
import {useGetData} from '../../hooks/getData'
import Loading from '../../components/Loading'
import { Link } from 'react-router-dom';
import ModalFormulario from '../../components/ModalFormulario';

const Proyectos = () => {

    const [proyectos, loading] = useGetData('proyecto');

    const props={
        id: '',
        ubicacion: '',
        nombre: '',
        fecha_inicio: '',
        fecha_fin_estimada: '',
        fecha_fin_real: '',
        observaciones: ''
    }

  return (
    <div className='table-responsive col-12 col-md-6 col-lg-9'>
        <h1 className='text-left'>Proyectos</h1>

        <br />
        <ModalFormulario element={'proyecto'} value={"Nuevo proyecto"} props={props} mode={'new'}/>
        <br/><br/>

        <table className="table table-striped">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Ubicacion</th>
                <th scope="col">Fecha de finalización</th>
                <th scope="col">Detalles</th>
            </tr>
            </thead>

            {loading && <Loading/>}

            <tbody>
                {
                    proyectos.map((p)=>{
                        return (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.nombre}</td>
                                <td>{p.ubicacion}</td>
                                <td>{p.fecha_fin_real ? p.fecha_fin_real : 'En curso'}</td>
                                <td><Link to={{ pathname: `/proyecto/${p.id}`}} className='btn btn-orange'>
                                    Detalles
                                </Link></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default Proyectos