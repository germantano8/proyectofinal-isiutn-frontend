import {React, useState} from 'react'
import {useGetData} from '../../hooks/getData'
import Loading from '../../components/Loading'
import EditDelete from '../../components/EditDelete'
import ModalFormularioService from '../../components/ModalFormularioService'

const Servicios = () => {

  const [servicios, loading] = useGetData('service');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    fecha: {key: 'fecha', direction: 'ascending'},
  })
  const props={
    id_service:'',
    fecha:'',
    kilometraje:0,
    patente:'',
    comentarios_ingreso:'',
    comentarios_salida:''
}

const exportToCSV = (data, filename) => {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "ID,Fecha desde,Kilometraje,Patente,Comentarios ingreso,Comentarios salida\n"; // Encabezados de las columnas
 
  data.forEach(service => {
     csvContent += `${service.id_service},${service.fecha_desde},${service.kilometraje},${service.patente},,${service.comentarios_ingreso},${service.comentarios_salida}\n`;
  });
 
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link); // Requerido para Firefox
 
  link.click(); // Esto descarga el archivo
  document.body.removeChild(link); // Limpiar
};

const sortedServicios = servicios.sort((a, b) => {
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

const filteredServicios = servicios.filter(service =>
  service.patente.toLowerCase().includes(searchTerm)
);
  return (
    <>
        <div className='table-responsive col-12 col-md-6 col-lg-9'>
          <h1 className='text-left'>Services</h1>
          <div className="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Ver próximos services a realizar
                  </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div class="accordion-body" style={{ padding: '-10px' }}>
                  <iframe title="services" width="900" height="550" src="https://app.powerbi.com/reportEmbed?reportId=fbf42d14-8985-430d-b28f-8f9efa9f03df&autoAuth=true&embeddedDemo=true" frameborder="0" allowFullScreen="true"></iframe>
                  </div>
                </div>
              </div>
            </div>
          <br />
          <ModalFormularioService element={"service"} value={"Nuevo service"} props={props} mode={'new'}/>
          &nbsp;
          <button className="btn btn-orange" onClick={() => exportToCSV(filteredServicios, 'services.csv')}>
                Exportar a CSV
          </button>
            <br/><br/>
          <input
          type="text"
          className="form-control"
          placeholder="Buscar service por patente"
          value={searchTerm}
          onChange={handleSearch}
          />

          <br/>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                    <th scope="col">Fecha
                    <a onClick={() => setSortConfig({ key: 'fecha', direction: 'ascending' })}><i className="bi bi-arrow-up-short"></i></a>
                    <a onClick={() => setSortConfig({ key: 'fecha', direction: 'descending' })}><i className="bi bi-arrow-down-short"></i></a>
                    </th>
                    <th scope="col">Kilometraje</th>
                    <th scope="col">Patente</th>
                    <th scope="col">Comentarios ingreso</th>
                    <th scope="col">Comentarios salida</th>
                    <th scope="col">Acciones</th>
              </tr>
            </thead>

            {loading && <Loading/>}

            <tbody>
                {
                  filteredServicios.map((r) => {
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