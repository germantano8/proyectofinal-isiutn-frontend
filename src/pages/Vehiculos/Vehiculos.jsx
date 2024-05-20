import {React, useState} from 'react'
import {useGetData,} from '../../hooks/getData'
import {Loading, EditDelete, ModalFormularioVehiculo} from '../../components/index.jsx'

const Vehiculos = () => {

  const [vehiculos, loading] = useGetData('vehiculo');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
      anio: {key: 'anio', direction: 'ascending'},
  });
  
  const props = {
    patente: '',
    estado: 'disponible',
    anio: 0,
    kilometraje: 0,
    id_tipo_vehiculo: 0,
  }

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };
  const filteredVehiculos = vehiculos.filter(vehiculo =>
    vehiculo.patente.toLowerCase().includes(searchTerm.toLowerCase()) || vehiculo.tipo_vehiculo.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedVehiculos = vehiculos.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
       return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
       return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const exportToCSV = (data, filename) => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Patente,Año,Kilometraje,Tipo de vehículo\n"; // Encabezados de las columnas
   
    data.forEach(vehiculo => {
       csvContent += `${vehiculo.patente},${vehiculo.anio},${vehiculo.kilometraje},${vehiculo.tipo_vehiculo.descripcion}\n`;
    });
   
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link); // Requerido para Firefox
   
    link.click(); // Esto descarga el archivo
    document.body.removeChild(link); // Limpiar
  };
  
  return (
    <div className='table-responsive col-12 col-md-6 col-lg-9'>
      <h1 className='text-left' style={{color: '#47525E'}}>Vehículos</h1>
      <br />
      <ModalFormularioVehiculo element={"vehiculo"} value={"Nuevo vehículo"} props={props} mode={'new'}/>
      &nbsp;
      <button className="btn btn-orange" onClick={() => exportToCSV(filteredVehiculos, 'vehiculos.csv')}>
        Exportar a CSV
      </button>
      <br/><br/>

      <input
        type="text"
        className="form-control"
        placeholder="Buscar vehículo por patente o tipo de vehículo"
        value={searchTerm}
        onChange={handleSearch}
      />

      <br/>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Patente</th>
                <th scope="col">
                  Año
                  <a onClick={() => setSortConfig({ key: 'anio', direction: 'ascending' })}><i className="bi bi-arrow-up-short"></i></a>
                  <a onClick={() => setSortConfig({ key: 'anio', direction: 'descending' })}><i className="bi bi-arrow-down-short"></i></a>
                </th>
                <th scope="col">
                  Kilometraje
                  <a onClick={() => setSortConfig({ key: 'kilometraje', direction: 'ascending' })}><i className="bi bi-arrow-up-short"></i></a>
                  <a onClick={() => setSortConfig({ key: 'kilometraje', direction: 'descending' })}><i className="bi bi-arrow-down-short"></i></a>
                  </th>
                <th scope="col">Tipo de vehículo</th>
                <th scope="col">Acciones</th>
          </tr>
        </thead>

        {loading && <Loading/>}

        <tbody>
            {
              filteredVehiculos.map((r) => {
                return (
                  <tr key={r.patente}>
                    <td style={{ fontWeight: 'bold'}}>{r.patente}</td>
                    <td>{r.anio}</td>
                    <td>{r.kilometraje}</td>
                    <td>{r.tipo_vehiculo.descripcion}</td>
                    <EditDelete data={vehiculos} element={"vehiculo"} id={r.patente}/>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
    </div>
  )
}

export default Vehiculos