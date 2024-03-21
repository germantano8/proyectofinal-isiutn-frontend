import { insertData, useGetData } from '../../hooks/';
import { React, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {DropdownButton, Dropdown} from 'react-bootstrap';

const NuevoTrabajo = () => {
    const conductores = useGetData('conductor');
    const clientes = useGetData('cliente');
    const vehiculos = useGetData('vehiculo');
    const proyectos = useGetData('proyecto');
    const trabajos = useGetData('trabajo');

    const [selectedConductor, setSelectedConductor] = useState();
    const [selectedCliente, setSelectedCliente] = useState();
    const [selectedVehiculo, setSelectedVehiculo] = useState();
    const [selectedProyecto, setSelectedProyecto] = useState();
    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [fechaFin, setFechaFin] = useState();

    const handleSelectConductor = (eventKey) => {
        setSelectedConductor(eventKey);
    };
    const handleSelectCliente = (eventKey) => {
        setSelectedCliente(eventKey);
    };
    const handleSelectVehiculo = (eventKey) => {
        setSelectedVehiculo(eventKey);
    };

    const handleSelectProyecto = (eventKey) => {
        setSelectedProyecto(eventKey);
    };

    const handleFechaInicioChange = (date) => {
        setFechaInicio(date);
    };

    const handleFechaFinChange = (date) => {
        setFechaFin(date);
    };

    const guardarCambios = async () => {
        const props={
            id_trabajo:'',
            fecha_desde:'',
            fecha_hasta:'',
            kilometraje:'',
            patente:'',
            id_proyecto:id_proyecto,
            dni_conductor:'',
            cuit_cliente:'',
        }

        try {
            await insertData('trabajo', props);
        } catch (error) {
            console.error('Error al intentar agregar un nuevo trabajo:', error);
        }
    };

    return (
        <div className="col-12 col-md-6 col-lg-9">
                <h1 className='text-left'>Nuevo Trabajo</h1>
                    <div className="row">   
                        <div className="col">   
                                <div >
                                <label>Fecha de inicio</label>
                                <input type="date"/>
                                </div>
                        </div>
                        <div className="col">   
                                <div >
                                <div>Fecha de Fin</div>{fechaFin.toISOString().split('T')[0]}
                                <Calendar onChange={handleFechaFinChange} value={fechaFin} />
                        </div>                                 
                    </div>
                <div className="row">
                        <div className="row">   
                                <div className="col">   

                                        <div style={{ display : 'flex', alignItems:'center'}}>                               
                                                <DropdownButton
                                                id="dropdown-conductor"
                                                title="Seleccionar conductor"
                                                onSelect={handleSelectConductor}
                                                variant = ''                                    
                                                >
                                                {conductores[0].map((c) => (
                                                        <Dropdown.Item key={c.dni} eventKey={c.dni}>
                                                                {c.nombre} {c.apellido} - {c.licencias} 
                                                        </Dropdown.Item>
                                                ))}
                                                </DropdownButton>
                                                <div> - {selectedConductor}</div>
                                        </div>
                                        <div style={{  display : 'flex', alignItems:'center'}}>
                                                <DropdownButton
                                                id="dropdown-vehiculo"
                                                title="Seleccionar vehículo"
                                                onSelect={handleSelectVehiculo}
                                                variant = ''
                                                >
                                                {vehiculos[0].map((v) => (
                                                        <Dropdown.Item key={v.patente} eventKey={v.patente}>{v.patente} - {v.estado}</Dropdown.Item>
                                                ))}
                                                </DropdownButton>
                                                <div>{selectedVehiculo}</div>
                                        </div>
                                </div>
                                <div className='col'>
                                        <div style={{ display : 'flex', alignItems:'center'}}>
                                                <DropdownButton
                                                id="dropdown-proyecto"
                                                title="Seleccionar proyecto"
                                                onSelect={handleSelectProyecto}
                                                variant = '' 
                                                >
                                                {proyectos[0].map((p) => (
                                                        <Dropdown.Item key={p.id} eventKey={p.id}>{p.id} - {p.nombre}</Dropdown.Item>
                                                ))}
                                                </DropdownButton>
                                                <div>{selectedProyecto}</div>
                                        </div>
                                        <div style={{ display : 'flex', alignItems:'center'}}>
                                                <DropdownButton
                                                id="dropdown-cliente"
                                                title="Seleccionar cliente"
                                                onSelect={handleSelectCliente}
                                                variant = ''
                                                >
                                                {clientes[0].map((c) => (
                                                        <Dropdown.Item key={c.cuit} eventKey={c.cuit}>{c.razon_social}</Dropdown.Item>
                                                ))}
                                                </DropdownButton>
                                                <div>{selectedCliente}</div>
                                        </div>
                                </div>                  
                        </div>                  
                </div>                  
                </div>                  
                <br/>
                <div className=''>
                        <button className="btn btn-orange" onClick={guardarCambios}>
                                Guardar Cambios
                        </button>
                </div>
              
        </div>
    )
}

export default NuevoTrabajo;