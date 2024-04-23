import { useState } from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import { insertData, updateData } from '../hooks/';
import { clienteSchema, proyectoSchema } from '../Validations/';

const ModalFormulario = ({element, value, props, mode, id}) => {
    
    // element: el nombre del elemento (objeto) con el que se está trabajando
    // value: el texto que se va a mostrar en el botón
    // props: recibe las propiedades del objeto que se va a agregar desde la página en la que se esté trabajando
    // mode: 'new' o 'update'
    // id: el id del objeto que se va a actualizar

    // Acá se define el estado del formulario
    const [formData, setFormData] = useState({
        ...props,
    });

    const [errors, setErrors] = useState([]);

    // Acá se definen las funciones que se van a encargar de mostrar y ocultar el modal
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setFormData({
            ...props,
        });
        setErrors([]);
    };

    // Esta función se va a encargar de manejar los cambios en el formulario, a medida que el usuario vaya
    // ingresando datos, se van a ir actualizando los valores del formulario a enviar
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Determine input type based on field name and presence of "fecha"
        const isDateInput = name.toLowerCase().includes('fecha');
        const updatedValue = isDateInput ? value : e.target.value;
        setFormData({
            ...formData,
            [name]: updatedValue,
        });
    };

    // Esta función se va a encargar de enviar los datos del formulario a la base de datos
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{

            let isValid;
            switch(element){
                case "cliente":
                    isValid = await clienteSchema.isValid(formData, { abortEarly: false });
                    break;
                case "proyecto":
                    isValid = await proyectoSchema.isValid(formData, { abortEarly: false });
                    break;
                default:
                    break;
            }

            if(isValid){
                if(mode==='new'){
                    await insertData(element, formData);
                }else{
                    await updateData(element, formData, id);
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
                {Object.keys(props).map((p)=>{

                    let isDateInput = p.toLowerCase().includes('fecha');
                    const inputType = isDateInput ? 'date' : 'text';

                    return (
                        <Form.Group className="mb-3" controlId={`formBasic${p}`}>
                            <Form.Label>{p.replace('_', ' ').toUpperCase()}</Form.Label>
                            <Form.Control
                                type={inputType}
                                placeholder={p.replace('_', ' ').toUpperCase()}
                                value={formData[p]}
                                name={p}
                                onChange={handleChange}
                                disabled={p.includes('id')}
                            />
                        </Form.Group>
                    );
                })}
                
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

export default ModalFormulario