import {React, useState} from 'react'
import {useGetData} from '../../hooks/getData'
import Loading from '../../components/Loading'
import { Link } from 'react-router-dom';
import ModalFormulario from '../../components/ModalFormulario';

const Proyectos = () => {

    const [proyectos, loading] = useGetData('proyecto');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({
        anio: {key: 'anio', direction: 'ascending'},
        kilometraje: {key: 'kilometraje', direction: 'ascending'},
    });

    const props={
        id: '',
        ubicacion: '',
        nombre: '',
        fecha_inicio: '',
        fecha_fin_estimada: '',
        fecha_fin_real: null,
        observaciones: ''
    }

    const sortedProyectos = proyectos.sort((a, b) => {
        if (sortConfig.key === 'nombre') {
            if (sortConfig.direction === 'ascending') {
                return a.nombre.localeCompare(b.nombre);
            } else {
                return b.nombre.localeCompare(a.nombre);
            }
        } else {
            if (!a.fecha_fin_real && !b.fecha_fin_real) {
                // Ambos proyectos están "En Curso"
                return 0;
            } else if (!a.fecha_fin_real && b.fecha_fin_real) {
                // 'a' está "En Curso" y 'b' tiene fecha de finalización
                return sortConfig.direction === 'ascending' ? -1 : 1;
            } else if (a.fecha_fin_real && !b.fecha_fin_real) {
                // 'a' tiene fecha de finalización y 'b' está "En Curso"
                return sortConfig.direction === 'ascending' ? 1 : -1;
            } else {
                // Ambos proyectos tienen fechas de finalización
                if (sortConfig.direction === 'ascending') {
                    // Ordenar fechas en orden ascendente
                    if (a.fecha_fin_real < b.fecha_fin_real) return -1;
                    if (a.fecha_fin_real > b.fecha_fin_real) return 1;
                } else {
                    // Ordenar fechas en orden descendente
                    if (a.fecha_fin_real > b.fecha_fin_real) return -1;
                    if (a.fecha_fin_real < b.fecha_fin_real) return 1;
                }
            }
        }
        return 0;
    });
    
    const filteredProyectos = proyectos.filter(proyecto =>
        proyecto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || proyecto.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const exportToCSV = (data, filename) => {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "ID,Año,Kilometraje,Tipo de vehículo, Fecha inicio, Fecha fin estimada, Fecha fin real, Observaciones\n"; // Encabezados de las columnas
       
        data.forEach(proyecto => {
            csvContent += `${proyecto.id},${proyecto.ubicacion},${proyecto.nombre},${proyecto.fecha_inicio},${proyecto.fecha_fin_estimada},${proyecto.fecha_fin_real},${proyecto.observaciones}\n`;
        });
       
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", filename);
        document.body.appendChild(link); // Requerido para Firefox
       
        link.click(); // Esto descarga el archivo
        document.body.removeChild(link); // Limpiar
    };

    function obtenerEstado(p) {
        const hoy = new Date();
        const fechaInicio = new Date(p.fecha_inicio);
        
        if (p.fecha_fin_real) {
            return p.fecha_fin_real;
        } else if (fechaInicio > hoy) {
            return 'Sin Iniciar';
        } else if (hoy > p.fecha_fin_estimada) {
            return 'Atrasado';
        } else {
            return 'En Curso';
        }
    }

    return (
        <div className='table-responsive col-12 col-md-6 col-lg-9'>
            <h1 className='text-left' style={{color: '#47525E'}}>Proyectos</h1>

            <br />
            <ModalFormulario element={'proyecto'} value={<><i className="bi bi-plus"></i> Nuevo proyecto</>}  props={props} mode={'new'}/>
            &nbsp;
            <button className="btn btn-orange" onClick={() => exportToCSV(filteredProyectos, 'proyectos.csv')}>
                <i className="bi bi-file-earmark-spreadsheet"></i> Exportar a CSV
            </button>
            <br/><br/>

            <input
                type="text"
                className="form-control"
                placeholder="Buscar proyecto por nombre o ubicación"
                value={searchTerm}
                onChange={handleSearch}
            />

            <br/>

            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre
                        <a onClick={() => setSortConfig({ key: 'nombre', direction: 'ascending' })}><i className="bi bi-arrow-up-short"></i></a>
                        <a onClick={() => setSortConfig({ key: 'nombre', direction: 'descending' })}><i className="bi bi-arrow-down-short"></i></a>
                    </th>
                    <th scope="col">Ubicacion</th>
                    <th scope="col">
                        Fecha de finalización
                        <a onClick={() => setSortConfig({ key: 'fecha_fin_real', direction: 'ascending' })}><i className="bi bi-arrow-up-short"></i></a>
                        <a onClick={() => setSortConfig({ key: 'fecha_fin_real', direction: 'descending' })}><i className="bi bi-arrow-down-short"></i></a>
                        </th>
                    <th scope="col">Detalles</th>
                </tr>
                </thead>

                {loading && <Loading/>}

                <tbody>
                    {
                        filteredProyectos.map((p)=>{
                            return (
                                <tr key={p.id}>
                                    <td style={{ fontWeight: 'bold'}}>{p.id}</td>
                                    <td style={{ fontWeight: 'bold'}}>{p.nombre}</td>
                                    <td>{p.ubicacion}</td>
                                    <td>{ obtenerEstado(p) }</td>
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