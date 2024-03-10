import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { insertData } from '../hooks/insertData';
import { updateData } from '../hooks/updateData';

const ModalFormulario = ({element, value, props, mode, id=null}) => {
    
    // element: el nombre del elemento (objeto) con el que se está trabajando
    // value: el texto que se va a mostrar en el botón
    // props: recibe las propiedades del objeto que se va a agregar desde la página en la que se esté trabajando

    // Acá se define el estado del formulario
    const [formData, setFormData] = useState({
        ...props,
    });

    // Acá se definen las funciones que se van a encargar de mostrar y ocultar el modal
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // Esta función se va a encargar de manejar los cambios en el formulario, a medida que el usuario vaya
    // ingresando datos, se van a ir actualizando los valores del formulario a enviar
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Esta función se va a encargar de enviar los datos del formulario a la base de datos
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(mode==='new'){
            await insertData(element, formData);
        }else{
            await updateData(element, formData, id);
        }
        setShow(false);
        window.location.href = `/${element}s`;
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
                
                {Object.keys(props).map((p)=>{ return(
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>{p.replace('_', ' ').toUpperCase()}</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder={p.replace('_', ' ').toUpperCase()}
                    value={formData[p]}
                    name={p}
                    onChange={handleChange}
                    />
                    </Form.Group>
                    )
                })}

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