import {React, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {updateData} from '../../hooks/updateData';
import {deleteData} from '../../hooks/deleteData';
import Loading from '../../components/Loading';
import Trabajos from '../Trabajos/Trabajos';
import {proyectoSchema} from '../../Validations/proyectoSchema';

const ProyectoSingle = () => {

    const { id } = useParams();
    const [proyecto, setProyecto] = useState({});
    const [initialProyecto, setInitialProyecto] = useState({});
    const [loading, setLoading] = useState(true);
    const [editable, setEditable] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const fetchProyecto = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_URL}/api/proyecto/${id}`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                
                });
                if (!response.ok) {
                    throw new Error('Error al obtener los detalles del proyecto');
                }
                const data = await response.json();
                setProyecto(data);
                setInitialProyecto(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchProyecto();
    }, [id]);

    const deleteitem = async () => {
        await deleteData('proyecto', id);
        window.location.href = '/proyectos';
    }

    const handleEdit = () =>{
        setEditable(true);
    }
    
    const handleCancel = () => {
        setEditable(false);
        setProyecto(initialProyecto);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        const isDateInput = name.toLowerCase().includes('fecha');
        const updatedValue = isDateInput ? value : e.target.value;
        setProyecto({
            ...proyecto,
            [name]: updatedValue,
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try{
            let isValid = await proyectoSchema.validate(proyecto, { abortEarly: false });
            if(isValid){
                await updateData('proyecto', proyecto, id);
                setEditable(false);
                setErrors([]);
            }
        }catch(e){
            setErrors(e.errors);
        }
    };

    return (
        <div className='col-12 col-md-6 col-lg-9'>
            <h1>Proyecto {proyecto.nombre}</h1>
            {loading && <Loading/>}
            <form>
                {Object.entries(proyecto).map(([k, value], index)=> {
                    const isDateInput = k.toLowerCase().includes('fecha');
                    const inputType = isDateInput ? 'date' : 'text';
                    const isDisabled = index === 0;
                    return (
                        <div className="mb-3">
                            <label for={k} className="form-label">{k.replace('_', ' ').replace('_', ' ').toUpperCase()}</label>
                            <input type={inputType} 
                            className='form-control'
                            id={k} name={k} 
                            value={proyecto[k]} 
                            onChange={handleChange}
                            disabled={isDisabled || !editable}/>
                        </div>
                    )
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

                {editable ? (
                    <>
                        <button type="button" className="btn btn-orange" onClick={handleSave}>Guardar</button>
                        &nbsp;
                        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                    </>
                ) : (
                    <button type="button" className="btn btn-orange" onClick={handleEdit}>Editar</button>
                )}
                &nbsp;
                <button type="button" className="btn btn-danger" onClick={deleteitem}>Eliminar</button>
            </form>
            <br />
            <Trabajos id_proyecto={id}/>
        </div>
    )
}

export default ProyectoSingle