import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { vehiculoSchema } from '../Validations/vehiculoSchema';
import { insertData, updateData, useGetData } from '../hooks';

const ModalFormularioVehiculo = ({ element, value, props, mode, id }) => {
    const tipo_vehiculos = useGetData('tipovehiculo');
    const [formData, setFormData] = useState({
        ...props,
    });
    const [errors, setErrors] = useState([]);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setFormData({ ...props });
        setErrors([]);
    };

    const handleChange = (e, fieldName) => {
        setFormData({
            ...formData,
            [fieldName || e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let isValid;
            isValid = await vehiculoSchema.isValid(formData, { abortEarly: false });
            if (isValid) {
                if (mode === 'new') {
                    await insertData('vehiculo', formData);
                } else {
                    await updateData('vehiculo', formData, id);
                }
                setShow(false);
                window.location.reload();
            } else {
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
                        <Form.Group className="mb-3" name="patente">
                            <Form.Label>PATENTE</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Patente"
                                value={formData['patente']}
                                name={'patente'}
                                onChange={(e) => {
                                    handleChange(e, 'patente');
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" name="anio">
                            <Form.Label>AÑO</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Año"
                                value={formData['anio']}
                                name={'anio'}
                                onChange={(e) => {
                                    handleChange(e, 'anio');
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" name="kilometraje">
                            <Form.Label>KILOMETRAJE</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Kilometraje"
                                value={formData['kilometraje']}
                                name={'kilometraje'}
                                onChange={(e) => {
                                    handleChange(e, 'kilometraje');
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" name="tipo_vehiculo">
                            <Form.Label>TIPO</Form.Label>
                            <Form.Select
                                title="Seleccionar tipo de vehículo"
                                onChange={(e) => {
                                    handleChange(e, 'tipo_vehiculo');
                                }}
                                value={formData.tipo_vehiculo}
                            >
                                {tipo_vehiculos[0].map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.descripcion}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        {errors.length > 0 && (
                            <div className="alert alert-danger">
                                {errors.map((e) => (
                                    <div key={e}>{e}</div>
                                ))}
                            </div>
                        )}

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

export default ModalFormularioVehiculo;
