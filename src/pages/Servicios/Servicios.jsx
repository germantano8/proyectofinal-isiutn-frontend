import {React} from 'react'
import {useGetData} from '../../hooks/getData'
import Loading from '../../components/Loading'
import EditDelete from '../../components/EditDelete'
import ModalFormularioService from '../../components/ModalFormularioService'

const Servicios = () => {

  const [servicios, loading] = useGetData('service');

  const props={
    id_service:'',
    fecha:'',
    kilometraje:0,
    patente:'',
    comentarios_ingreso:'',
    comentarios_salida:''
}

  return (
    <>
        <div className='table-responsive col-12 col-md-6 col-lg-9'>
          <h1 className='text-left'>Services</h1>
          <br />
          <ModalFormularioService element={"service"} value={"Nuevo service"} props={props} mode={'new'}/>
          <br/><br/>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Kilometraje</th>
                    <th scope="col">Patente</th>
                    <th scope="col">Comentarios ingreso</th>
                    <th scope="col">Comentarios salida</th>
              </tr>
            </thead>

            {loading && <Loading/>}

            <tbody>
                {
                  servicios.map((r) => {
                    return (
                      <tr key={r.id}>
                        <td>{r.id}</td>
                        <td>{r.fecha}</td>
                        <td>{r.kilometraje}</td>
                        <td>{r.patente}</td>
                        <td>{r.comentarios_ingreso}</td>
                        <td>{r.comentarios_salida}</td>
                        <EditDelete data={servicios} element={"service"} id={r.id}/>
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

export default Servicios