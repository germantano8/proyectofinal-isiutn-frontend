import {React, useState} from 'react';
import {Button, Form, Modal, Dropdown} from 'react-bootstrap';
import { serviceSchema } from '../Validations';
import { insertData, updateData, useGetData } from '../hooks';

const ModalFormularioService = ({element, value, props, mode, id}) => {

    const vehiculos = useGetData('vehiculo');
    const [formData, setFormData] = useState({
        ...props,
    });

    const [errors, setErrors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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
            isValid = await serviceSchema.validate(formData, { abortEarly: false });
            if(isValid){
                if(mode==='new'){
                    await insertData('service', formData);
                }else{
                    await updateData('service', formData, id);
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

                    <Form.Group className="mb-3" name="id_service">
                        <Form.Label>ID SERVICE</Form.Label>
                        <Form.Control type="number"
                            placeholder="ID" 
                            value={formData['id_service']}
                            name={'id_service'}
                            onChange={handleChange}
                            disabled />
                    </Form.Group>

                    <Form.Group className="mb-3" name="patente">
                        <Form.Label>PATENTE DEL VEHÍCULO</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary">
                                {formData.patente ? formData.patente : 'Seleccionar'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Form.Control
                                    type="text"
                                    placeholder="Buscar patente"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                />
                                {vehiculos[0]
                                    .filter((v) =>
                                        v.patente.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .map((v) => (
                                        <Dropdown.Item
                                            key={v.patente}
                                            onClick={() => {
                                                setFormData({ ...formData, patente: v.patente });
                                            }}
                                            className="dropdown-item"
                                        >
                                            {v.patente}
                                        </Dropdown.Item>
                                    ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>


                    <Form.Group className="mb-3" name="fecha">
                        <Form.Label>FECHA</Form.Label>
                        <Form.Control type="date" 
                            placeholder="FECHA"
                            value={formData['fecha']}
                            name={'fecha'}
                            onChange={(e)=>{handleChange(e, 'fecha')}} />
                    </Form.Group>

                    <Form.Group className="mb-3" name="kilometraje">
                        <Form.Label>KILOMETRAJE</Form.Label>
                        <Form.Control type="number" 
                            placeholder="KILOMETRAJE"
                            value={formData['kilometraje']}
                            name={'kilometraje'}
                            onChange={(e)=>{handleChange(e, 'kilometraje')}} />
                    </Form.Group>

                    <Form.Group className="mb-3" name="comentarios_ingreso">
                        <Form.Label>COMENTARIOS DE INGRESO</Form.Label>
                        <Form.Control type="text" 
                            placeholder="COMENTARIOS INGRESO"
                            value={formData['comentarios_ingreso']}
                            name={'comentarios_ingreso'}
                            onChange={(e)=>{handleChange(e, 'comentarios_ingreso')}} />
                    </Form.Group>

                    <Form.Group className="mb-3" name="comentarios_salida">
                        <Form.Label>COMENTARIOS DE SALIDA</Form.Label>
                        <Form.Control type="text" 
                            placeholder="COMENTARIOS SALIDA"
                            value={formData['comentarios_salida']}
                            name={'comentarios_salida'}
                            onChange={(e)=>{handleChange(e, 'comentarios_salida')}} />
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

export default ModalFormularioService