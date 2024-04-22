import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { trabajoSchema } from '../Validations';
import { insertData, updateData, useGetData } from '../hooks/';

const ModalFormularioTrabajo = ({ value, props, mode, id }) => {
    const conductores = useGetData('conductor');
    const clientes = useGetData('cliente');
    const vehiculos = useGetData('vehiculo');
    const proyectos = useGetData('proyecto');

    const [formData, setFormData] = useState({ ...props });
    const [errors, setErrors] = useState([]);
    const [show, setShow] = useState(false);
    const [tipoTrabajo, setTipoTrabajo] = useState('');

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setFormData({ ...props });
        setErrors([]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res;
            let isValid = await trabajoSchema.validate(formData, { abortEarly: false });
            if (isValid) {
                if (mode === 'new') {
                    res = await insertData('trabajo', formData);
                } else {
                    res = await updateData('trabajo', formData, id);
                }
                if (!res.ok) {
                    e.errors = ['Error al intentar agregar un nuevo elemento'];
                    setErrors(e.errors || []);
                }
                setShow(false);
                window.location.reload();
            }
        } catch (e) {
            setErrors(e.errors || []);
        }
    };

    const handleTipoTrabajoChange = (e) => {
        setTipoTrabajo(e.target.value);
        // Resetear el campo correspondiente al cambiar el tipo de trabajo
        setFormData({
            ...formData,
            id_proyecto: '',
            cuit_cliente: '',
        });
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
                        <Form.Group className="mb-3">
                            <Form.Check
                                type="radio"
                                label="Propio"
                                name="tipoTrabajo"
                                value="PROPIO"
                                checked={tipoTrabajo === 'PROPIO'}
                                onChange={handleTipoTrabajoChange}
                            />
                            <Form.Check
                                type="radio"
                                label="Alquiler"
                                name="tipoTrabajo"
                                value="ALQUILER"
                                checked={tipoTrabajo === 'ALQUILER'}
                                onChange={handleTipoTrabajoChange}
                            />
                        </Form.Group>

                        {tipoTrabajo === 'PROPIO' && (
                            <Form.Group className="mb-3" name="id_proyecto">
                                <Form.Label>PROYECTO</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="ID PROYECTO"
                                    value={formData['id_proyecto']}
                                    name="id_proyecto"
                                    onChange={handleChange}
                                    disabled={!tipoTrabajo}
                                />
                            </Form.Group>
                        )}

                        {tipoTrabajo === 'ALQUILER' && (
                            <Form.Group className="mb-3" name="cuit_cliente">
                                <Form.Label>CLIENTE</Form.Label>
                                <Form.Select
                                    title="Seleccionar cliente"
                                    onChange={handleChange}
                                    value={formData.cuit_cliente}
                                    name="cuit_cliente"
                                    disabled={!tipoTrabajo}
                                >
                                    {clientes[0].map((c) => (
                                        <option key={c.cuit} value={c.cuit}>
                                            {c.cuit} - {c.razon_social}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        )}

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

                    <Form.Group className="mb-3" name="patente">
                        <Form.Label>PATENTE</Form.Label>
                        <Form.Select
                            title="Seleccionar patente"
                            onChange={(e)=>{handleChange(e, 'patente')}}
                            value={formData.patente}>
                            {vehiculos[0].map((v) => (
                                <option key={v.patente} value={v.patente}>{v.patente}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" name="id_proyecto">
                        <Form.Label>ID PROYECTO</Form.Label>
                        <Form.Control type="number" 
                            placeholder="ID PROYECTO"
                            value={formData['id_proyecto']}
                            name={'id_proyecto'}
                            onChange={handleChange}
                            disabled />
                    </Form.Group>

                    <Form.Group className="mb-3" name="dni_conductor">
                        <Form.Label>CONDUCTOR</Form.Label>
                        <Form.Select
                            title="Seleccionar conductor"
                            onChange={(e)=>{handleChange(e, 'dni_conductor')}}
                            value={formData.dni_conductor}>
                            {conductores[0].map((c) => (
                                <option key={c.dni} value={c.dni}>{c.nombre} {c.apellido}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
		
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
