import React, { useState } from 'react';
import { useGetData } from '../../hooks/getData';
import Loading from '../../components/Loading';
import '../../components/links.css'
import EditDelete from '../../components/EditDelete';
import ModalFormularioReparacion from '../../components/ModalFormularioReparacion';

const Reparaciones = () => {
  const [reparaciones, loading] = useGetData('reparacion');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    fecha_desde: { key: 'fecha_desde', direction: 'ascending' },
    fecha_hasta: { key: 'fecha_hasta', direction: 'ascending' },
  });

  // Acá se define la estructura del objeto que vamos a estar trabajando en esta página
  const props = {
    id_reparacion: '',
    fecha_desde: '',
    fecha_hasta: '',
    comentarios: '',
    patente: ''
  };

  const exportToCSV = (data, filename) => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Comentarios,Fecha desde,Fecha hasta,Patente\n"; // Encabezados de las columnas

    data.forEach(reparacion => {
      csvContent += `${reparacion.id},${reparacion.comentarios},${reparacion.fecha_desde},${reparacion.fecha_hasta},${reparacion.patente}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link); // Requerido para Firefox

    link.click(); // Esto descarga el archivo
    document.body.removeChild(link); // Limpiar
  };

  const sortedReparaciones = reparaciones.sort((a, b) => {
    const key = sortConfig.key;
    const direction = sortConfig.direction;

    if (a[key] < b[key]) {
      return direction === 'ascending' ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const currentUrl = window.location.href;
  const partes = currentUrl.split("/");
  const codigo = partes[partes.length - 1].toLowerCase();

  const filteredReparaciones = reparaciones.filter(reparacion => {
    if (codigo === 'reparaciones') {
      return reparacion.patente.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return reparacion.patente.toLowerCase() === codigo;
    }
  });

  return (
    <>
      <div className='table-responsive col-12 col-md-6 col-lg-9'>
        <h1 className='text-left'>Reparaciones</h1>
        {codigo !== 'reparaciones' && <h4 className='text-left text-muted'>Patente: {codigo.toUpperCase()}</h4>}
        {codigo !== 'reparaciones' && (
          <a href="/vehiculos" className="hover-link">
          <i className="bi bi-arrow-left"></i> Volver a Vehículos
          </a>
        )}
        <br />
        <br />
        <ModalFormularioReparacion element={"reparacion"} value={<><i className="bi bi-plus"></i> Nueva reparación</>} props={props} mode={'new'} />
        &nbsp;
        <button className="btn btn-orange" onClick={() => exportToCSV(filteredReparaciones, 'reparaciones.csv')}>
          <i className="bi bi-file-earmark-spreadsheet"></i> Exportar a CSV
        </button>
        <br /><br />

        <input
          type="text"
          className="form-control"
          placeholder="Buscar reparacion por patente"
          value={searchTerm}
          onChange={handleSearch}
        />

        <br />

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
              <th scope="col">Acciones</th>
            </tr>
          </thead>

          {loading && <Loading />}

          <tbody>
            {
              filteredReparaciones.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.comentarios}</td>
                  <td>{r.fecha_desde}</td>
                  <td>{r.fecha_hasta}</td>
                  <td>{r.patente}</td>
                  <EditDelete data={reparaciones} element={"reparacion"} id={r.id} />
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Reparaciones;
