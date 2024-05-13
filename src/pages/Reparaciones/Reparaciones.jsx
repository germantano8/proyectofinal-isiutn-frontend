import {React, useState} from 'react'
import {useGetData} from '../../hooks/getData'
import Loading from '../../components/Loading'
import EditDelete from '../../components/EditDelete'
import ModalFormularioReparacion from '../../components/ModalFormularioReparacion'

const Reparaciones = () => {

  const [reparaciones, loading] = useGetData('reparacion');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    fecha_desde: {key: 'fecha_desde', direction: 'ascending'},
    fecha_hasta: {key: 'fecha_hasta', direction: 'ascending'},
  });
  // Acá se define la estructura del objeto que vamos a estar trabajando en esta página
  const props={
    id_reparacion:'',
    fecha_desde:'',
    fecha_hasta:'',
    comentarios:'',
    patente:''
}
  const sortedReparaciones = reparaciones.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredReparaciones = reparaciones.filter(reparacion => reparacion.patente.toLowerCase().includes(searchTerm));

  return (
    <>
        <div className='table-responsive col-12 col-md-6 col-lg-9'>
          <h1 className='text-left'>Reparaciones</h1>
          <br />
          <ModalFormularioReparacion element={"reparacion"} value={"Nueva reparación"} props={props} mode={'new'}/>
          <br/><br/>

          <input
            type="text"
            className="form-control"
            placeholder="Buscar reparacion por patente"
            value={searchTerm}
            onChange={handleSearch}
          />

          <br/>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                    <th scope="col">Comentarios</th>
                    <th scope="col">Fecha desde
                      <a onClick={() => setSortConfig({ key: 'fecha_desde', direction: 'ascending' })}><i className="bi bi-arrow-up-short"></i></a>
                      <a onClick={() => setSortConfig({ key: 'fecha_desde', direction: 'descending' })}><i className="bi bi-arrow-down-short"></i></a>
                    </th>
                    <th scope="col">Fecha hasta
                      <a onClick={() => setSortConfig({ key: 'fecha_hasta', direction: 'ascending' })}><i className="bi bi-arrow-up-short"></i></a>
                      <a onClick={() => setSortConfig({ key: 'fecha_hasta', direction: 'descending' })}><i className="bi bi-arrow-down-short"></i></a>
                    </th>
                    <th scope="col">Patente</th>
              </tr>
            </thead>

            {loading && <Loading/>}

            <tbody>
                {
                  filteredReparaciones.map((r) => {
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