import React, { useState } from 'react';
import { deleteData, useGetData } from '../../hooks';
import '../../components/links.css'
import { ModalFormularioTrabajo, Loading } from '../../components';

const Trabajos = () => {
  const [trabajos, loadingTrabajos] = useGetData('trabajo');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'fecha_desde',
    direction: 'ascending'
  });

  // Acá se define la estructura del objeto que vamos a estar trabajando en esta página
  const props = {
    id_trabajo: '',
    fecha_desde: '',
    fecha_hasta: '',
    kilometraje: 0,
    patente: '',
    id_proyecto: 0,
    dni_conductor: '',
    cuit_cliente: '',
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const currentUrl = window.location.href;
  const partes = currentUrl.split("/");
  const codigo = partes[partes.length - 1].toLowerCase();

  const filteredTrabajos = trabajos.filter(trabajo => {
    if (codigo === 'trabajos') {
      return (
        trabajo.patente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trabajo.cliente.razon_social.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trabajo.proyecto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return trabajo.patente.toLowerCase() === codigo;
    }
  });

  const exportToCSV = (data, filename) => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Patente,Fecha desde,Fecha hasta,Tipo trabajo,Cliente/Proyecto\n"; // Encabezados de las columnas

    data.forEach(trabajo => {
      csvContent += `${trabajo.id_trabajo},${trabajo.patente},${trabajo.fecha_desde},${trabajo.fecha_hasta},${trabajo.cuit_cliente === '00000000000' ? "Propio" : "Alquiler"},${trabajo.cuit_cliente === '00000000000' ? "Proyecto: " + trabajo.proyecto.nombre : trabajo.cliente.razon_social}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link); // Requerido para Firefox

    link.click(); // Esto descarga el archivo
    document.body.removeChild(link); // Limpiar
  };

  const deleteItem = async (id) => {
    await deleteData('trabajo', id);
    window.location.reload();
    console.log(id);
  };

  const sortedTrabajos = filteredTrabajos.sort((a, b) => {
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

  return (
    <div className='table-responsive col-12 col-md-6 col-lg-9'>
      <h1 className='text-left'>Trabajos</h1>
      {codigo !== 'trabajos' && <h4 className='text-left text-muted'>Patente: {codigo.toUpperCase()}</h4>}
      {codigo !== 'trabajos' && (
          <a href="/vehiculos" className="hover-link">
          <i className="bi bi-arrow-left"></i> Volver a Vehículos
          </a>
        )}
        <br />
      <br />

      <ModalFormularioTrabajo value={<><i className="bi bi-plus"></i> Nuevo trabajo</>} props={props} mode={'new'} />
      &nbsp;
      <button className="btn btn-orange" onClick={() => exportToCSV(sortedTrabajos, 'trabajos.csv')}>
        <i className="bi bi-file-earmark-spreadsheet"></i> Exportar a CSV
      </button>
      <br /><br />

      <input
        type="text"
        className="form-control"
        placeholder="Buscar trabajo por patente, cliente o proyecto"
        value={searchTerm}
        onChange={handleSearch}
      />

      <br />

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Patente</th>
            <th scope="col">Fecha desde
              <a onClick={() => setSortConfig({ key: 'fecha_desde', direction: 'ascending' })}><i className="bi bi-arrow-up-short"></i></a>
              <a onClick={() => setSortConfig({ key: 'fecha_desde', direction: 'descending' })}><i className="bi bi-arrow-down-short"></i></a>
            </th>
            <th scope="col">Fecha hasta
              <a onClick={() => setSortConfig({ key: 'fecha_hasta', direction: 'ascending' })}><i className="bi bi-arrow-up-short"></i></a>
              <a onClick={() => setSortConfig({ key: 'fecha_hasta', direction: 'descending' })}><i className="bi bi-arrow-down-short"></i></a>
            </th>
            <th scope="col">Tipo trabajo</th>
            <th scope="col">Cliente/Proyecto</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>

        {loadingTrabajos && <Loading />}

        <tbody>
          {
            sortedTrabajos.map((t) => (
              <tr key={t.id_trabajo}>
                <td>{t.id_trabajo}</td>
                <td>{t.patente}</td>
                <td>{t.fecha_desde}</td>
                <td>{t.fecha_hasta}</td>
                <td>{t.cuit_cliente === '00000000000' ? "Propio" : "Alquiler"}</td>
                <td>{t.cuit_cliente === '00000000000' ? "Proyecto: " + t.proyecto.nombre : t.cliente.razon_social}</td>
                <td>
                  <ModalFormularioTrabajo value={<i className="bi bi-pencil"></i>} props={trabajos.find((objeto) => Object.values(objeto)[0] === t.id_trabajo)} mode={'update'} id={t.id_trabajo} />
                  &ensp;
                  <button className='btn btn-danger' onClick={() => { deleteItem(t.id_trabajo) }}><i className="bi bi-trash3"></i></button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Trabajos;
