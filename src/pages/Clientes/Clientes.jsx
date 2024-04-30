import {React, useState} from 'react'
import {useGetData} from '../../hooks/getData'
import {Loading, EditDelete, ModalFormulario} from '../../components'

const Clientes = () => {

  // Acá se llama al hook useGetData, que hace el fetch API a la URL 
  // correspondiente (enviada por parámetro) y devuelve un array con los datos y 
  // un booleano que indica si se están cargando los datos
  const [clientes, loading] = useGetData('cliente');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    anio: {key: 'razon_social', direction: 'ascending'},
  });

  // Acá se define la estructura del objeto que vamos a estar trabajando en esta página
  const props={
    cuit:'',
    razon_social:''
  }

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };
  const filteredClientes = clientes.filter(cliente =>
    cliente.razon_social.toLowerCase().includes(searchTerm.toLowerCase()) || cliente.cuit.includes(searchTerm)
  );

  const sortedClientes = clientes.sort((a, b) => {
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
    csvContent += "Cuit,Razon Social\n"; // Encabezados de las columnas
   
    data.forEach(cliente => {
       csvContent += `${cliente.cuit},${cliente.razon_social}\n`;
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
      <h1 className='text-left'>Clientes</h1>

      {/* Acá se llama al componente ModalFormulario, que se encarga de mostrar un modal con un formulario para agregar un nuevo cliente 
        element: el nombre del elemento que se va a agregar (va a servir para posteriormente hacer los fetch a la URL correspondientes), 
        value: el texto que se va a mostrar en el botón (va a variar según la página en la que estemos trabajando), 
        props: las propiedades del objeto que se va a agregar
      
      */}
      <br />
      <ModalFormulario element={"cliente"} value={"Nuevo cliente"} props={props} mode={'new'}/>
      &nbsp;
      <button className="btn btn-orange" onClick={() => exportToCSV(clientes, 'clientes.csv')}>
        Exportar a CSV
      </button>
      <br/><br/>

      <input
        type="text"
        className="form-control"
        placeholder="Buscar cliente por razón social o CUIT"
        value={searchTerm}
        onChange={handleSearch}
      />

      <br/>

      <table className="table table-striped">
        <thead>
          <tr>
              <th scope="col">Cuit</th>
              <th scope="col">
                Razón Social
                <a onClick={() => setSortConfig({ key: 'razon_social', direction: 'ascending' })}><i className="bi bi-arrow-up-short"></i></a>
                <a onClick={() => setSortConfig({ key: 'razon_social', direction: 'descending' })}><i className="bi bi-arrow-down-short"></i></a>
              </th>
              <th scope="col">Acciones</th>
          </tr>
        </thead>

        {loading && <Loading/>}

        <tbody>
            {
              filteredClientes.map((c) => {
                return (
                  <tr key={c.cuit}>
                    <td>{c.cuit}</td>
                    <td>{c.razon_social}</td>
                    <EditDelete data={clientes} element={"cliente"} id={c.cuit}/>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
    </div>
  )
}

export default Clientes