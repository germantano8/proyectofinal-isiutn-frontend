import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { trabajoSchema } from '../Validations';
import { insertData, updateData, useGetData } from '../hooks/';
import axios from 'axios';

const ModalFormularioTrabajo = ({ value, props, mode, id }) => {
    const [conductores, setConductores] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const tipoVehiculo = useGetData('tipovehiculo');
    const clientes = useGetData('cliente');
    const proyectos = useGetData('proyecto');

    const [formData, setFormData] = useState({ ...props });
    const [errors, setErrors] = useState([]);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setFormData({ ...props });
        setErrors([]);
        setVehiculos([]);
        setConductores([]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleTipoMaquinaChange = async (e) => {
        const tipoMaquina = e.target.value;
        try {
            // Realizar una solicitud a la API para obtener las patentes correspondientes al tipo de máquina seleccionado
            const response = await axios.get(`${process.env.REACT_APP_URL}/api/trabajo/filtrar?tipo_vehiculo=${tipoMaquina}&fecha_desde=${formData.fecha_desde}&fecha_hasta=${formData.fecha_hasta}`,
                { withCredentials: true ,
                headers:{'Content-Type': 'application/json'}});
            const data = response.data; // Suponiendo que la respuesta de la API es un arreglo de patentes
            setVehiculos(data.patentes); // Actualizar el estado de patentes con los datos obtenidos
            setConductores(data.conductores);
        } catch (error) {
            console.error('Error al obtener las patentes:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            let isValid;
            isValid = await trabajoSchema.validate(formData, { abortEarly: false });
            if(isValid){
                if(mode==='new'){
                    await insertData('trabajo', formData);
                }else{
                    await updateData('trabajo', formData, id);
                }
                setShow(false);
                window.location.reload();
            }else{
                setErrors(e.errors || []);
            }
        } catch (e) {
            setErrors(e.errors || []);
        }
    };

    return (
        <>
            <Button className="btn btn-orange" onClick={handleShow}>
                {value}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{value}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" name="id_trabajo">
                            <Form.Label>ID TRABAJO</Form.Label>
                            <Form.Control type="text" 
                                placeholder="ID" 
                                value={formData['id_trabajo']}
                                name={'id_trabajo'}
                                onChange={handleChange}
                                disabled />
                        </Form.Group>

                        <Form.Group className="mb-3" name="fecha_desde">
                            <Form.Label>FECHA DESDE</Form.Label>
                            <Form.Control type="date" 
                                placeholder="FECHA DESDE"
                                value={formData['fecha_desde']}
                                name={'fecha_desde'}
                                onChange={(e)=>{handleChange(e, 'fecha_desde')}} />
                        </Form.Group>

                        <Form.Group className="mb-3" name="fecha_hasta">
                            <Form.Label>FECHA HASTA</Form.Label>
                            <Form.Control type="date" 
                                placeholder="FECHA HASTA"
                                value={formData['fecha_hasta']}
                                name={'fecha_hasta'}
                                onChange={(e)=>{handleChange(e, 'fecha_hasta')}} />
                        </Form.Group>

                        <Form.Group className="mb-3" name="kilometraje">
                            <Form.Label>KILOMETRAJE</Form.Label>
                            <Form.Control type="number" 
                                placeholder="KILOMETRAJE"
                                value={formData['kilometraje']}
                                name={'kilometraje'}
                                onChange={(e)=>{handleChange(e, 'kilometraje')}} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>TIPO DE VEHÍCULO</Form.Label>
                            <Form.Select
                                title="Seleccionar tipo de vehículo"
                                onChange={(e) => { handleTipoMaquinaChange(e) }}
                            >
                                <option value="" disabled hidden>Seleccionar</option>
                                {tipoVehiculo[0].map((tv) => (
                                    <option key={tv.id} value={tv.id}>{tv.descripcion}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" name="patente">
                            <Form.Label>PATENTE DEL VEHÍCULO</Form.Label>
                            <Form.Select
                                title="Seleccionar patente"
                                name={'patente'}
                                onChange={(e) => { handleChange(e, 'patente') }}
                                value={formData.patente}
                            >
                                {vehiculos && vehiculos.length > 0 ? (
                                    <option value="" disabled hidden>Seleccionar</option>
                                ) : (
                                    <option value="" disabled selected>No disponibles en ese rango de fechas</option>
                                )}
                                {vehiculos && vehiculos.map((v) => (
                                    <option key={v} value={v}>{v}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" name="dni_conductor">
                            <Form.Label>CONDUCTOR</Form.Label>
                            <Form.Select
                                title="Seleccionar conductor"
                                name={'dni_conductor'}
                                onChange={(e) => { handleChange(e, 'dni_conductor') }}
                                value={formData.dni_conductor}
                            >
                                <option value="" disabled hidden>Seleccionar</option>
                                {conductores && conductores.length > 0 ? (
                                    <option value="" disabled hidden>Seleccionar</option>
                                ) : (
                                    <option value="" disabled selected>No disponibles en ese rango de fechas</option>
                                )}
                                {conductores && conductores.map((c, index) => (
                                    <option key={index} value={c.dni}>{c.nombre} {c.apellido}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" name="cuit_cliente">
                            <Form.Label>CLIENTE</Form.Label>
                            <Form.Select
                                title="Seleccionar proyecto"
                                name={'cuit_cliente'}
                                onChange={(e) => { handleChange(e, 'cuit_cliente') }}
                                value={formData.cuit_cliente}
                            >
                                <option value="" disabled hidden>Seleccionar</option>
                                {clientes[0].map((v) => (
                                    <option key={v.cuit} value={v.cuit}>{v.razon_social}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" name="id_proyecto">
                            <Form.Label>PROYECTO</Form.Label>
                            <Form.Select
                                title="Seleccionar conductor"
                                name={'id_proyecto'}
                                onChange={(e) => { handleChange(e, 'id_proyecto') }}
                                value={formData.id_proyecto}
                            >
                                <option value="" disabled hidden>Seleccionar</option>
                                {proyectos[0].map((v) => (
                                    <option key={v.id} value={v.id}>{v.nombre}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        {errors.length>0 &&
                            <div className="alert alert-danger">
                                { errors.map((e) => (
                                        <div>
                                            {e}
                                        </div>
                                    ))}
                            </div>
                        }
		
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        &ensp;
                        <Button variant="primary" type="submit">
                            Guardar cambios
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalFormularioTrabajo;
