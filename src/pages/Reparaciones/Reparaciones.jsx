import {React} from 'react'
import {useGetData} from '../../hooks/getData'
import Loading from '../../components/Loading'
import EditDelete from '../../components/EditDelete'
import ModalFormularioReparacion from '../../components/ModalFormularioReparacion'

const Reparaciones = () => {

  const [reparaciones, loading] = useGetData('reparacion');

  // Acá se define la estructura del objeto que vamos a estar trabajando en esta página
  const props={
    id_reparacion:'',
    fecha_desde:'',
    fecha_hasta:'',
    comentarios:'',
    patente:''
}

  return (
    <>
        <div className='table-responsive col-12 col-md-6 col-lg-9'>
          <h1 className='text-left'>Reparaciones</h1>
          <br />
          <ModalFormularioReparacion element={"reparacion"} value={"Nueva reparación"} props={props} mode={'new'}/>
          <br/><br/>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                    <th scope="col">Comentarios</th>
                    <th scope="col">Fecha desde</th>
                    <th scope="col">Fecha hasta</th>
                    <th scope="col">Patente</th>
              </tr>
            </thead>

            {loading && <Loading/>}

            <tbody>
                {
                  reparaciones.map((r) => {
                    return (
                      <tr key={r.id}>
                        <td>{r.id}</td>
                        <td>{r.comentarios}</td>
                        <td>{r.fecha_desde}</td>
                        <td>{r.fecha_hasta}</td>
                        <td>{r.patente}</td>
                        <EditDelete data={reparaciones} element={"reparacion"} id={r.id}/>
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

export default Reparaciones