import {React, useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import { reparacionSchema } from '../Validations';
import { insertData, updateData, useGetData } from '../hooks';

const ModalFormularioReparacion = ({element, value, props, mode, id}) => {

    const vehiculos = useGetData('vehiculo');
    const [formData, setFormData] = useState({
        ...props,
    });

    const [errors, setErrors] = useState([]);

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setFormData({
            ...props,
        });
        setErrors([]);
    };

    const handleChange = (e, fieldName) => {
        setFormData({
            ...formData,
            [fieldName || e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{

            let isValid;
            isValid = await reparacionSchema.validate(formData, { abortEarly: false });

            if(isValid){
                if(mode==='new'){
                    await insertData('reparacion', formData);
                }else{
                    await updateData('reparacion', formData, id);
                }
                setShow(false);
                window.location.reload();
            }else{
                setErrors(e.errors || []);
            }
        }catch(e){
            setErrors(e.errors || []);
        }
    }

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

                    <Form.Group className="mb-3" name="id_reparacion">
                        <Form.Label>ID REPARACION</Form.Label>
                        <Form.Control type="text" 
                            placeholder="ID" 
                            value={formData['id_reparacion']}
                            name={'id_reparacion'}
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

                    <Form.Group className="mb-3" name="comentarios">
                        <Form.Label>COMENTARIOS</Form.Label>
                        <Form.Control type="text" 
                            placeholder="COMENTARIOS DE LA REPARACIÓN"
                            value={formData['comentarios']}
                            name={'comentarios'}
                            onChange={(e)=>{handleChange(e, 'comentarios')}} />
                    </Form.Group>

                    <Form.Group className="mb-3" name="patente">
                        <Form.Label>PATENTE DEL VEHÍCULO</Form.Label>
                        <Form.Select
                            title="Seleccionar patente"
                            name={'patente'}
                            onChange={(e)=>{handleChange(e, 'patente')}}
                            value={formData.patente}>
                            {vehiculos[0].map((v) => (
                                <option key={v.patente} value={v.patente}>{v.patente}</option>
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
    )
}

export default ModalFormularioReparacion