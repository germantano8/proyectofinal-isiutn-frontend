import {React, useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import { trabajoSchema } from '../Validations';
import { insertData, updateData, useGetData } from '../hooks/';

const ModalFormularioTrabajo = ({value, props, mode, id}) => {

    const conductores = useGetData('conductor');
    const clientes = useGetData('cliente');
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
        const { value } = e.target;
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try{
            let res;
            let isValid = trabajoSchema.validate(formData, { abortEarly: false });
            if(isValid){
                if(mode==='new'){
                    res = insertData('trabajo', formData);
                }else{
                    res = updateData('trabajo', formData, id);
                }
                if(!res.ok){
                    e.errors = ['Error al intentar agregar un nuevo elemento'];
                    setErrors(e.errors || []);
                    console.log("no es valida porque dio error aca", res)
                }
                setShow(false);
                // window.location.reload();
            }
        }catch(err){
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
                            // onSelect={handleSelectVehiculo}
                            onChange={(e)=>{handleChange(e, 'patente')}}
                            value={formData.patente}>
                            {vehiculos[0].map((v) => (
                                <option key={v.patente} value={v.patente}>{v.patente} - {v.estado}</option>
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
                                <option key={c.dni} value={c.dni}>
                                        {c.nombre} {c.apellido} - {c.licencias} 
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" name="cuit_cliente">
                        <Form.Label>CLIENTE</Form.Label>
                        <Form.Select
                            title="Seleccionar cliente"
                            onChange={(e)=>{handleChange(e, 'cuit_cliente')}}
                            value={formData.cuit_cliente}>
                            {clientes[0].map((c) => (
                                <option key={c.cuit} value={c.cuit}>{c.cuit} - {c.razon_social}</option>
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

export default ModalFormularioTrabajo