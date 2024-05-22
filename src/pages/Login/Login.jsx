import { React, useState } from 'react'
import './login.css'
import {loginSchema} from '../../Validations'
import image from './logo-controlmaq.png'

const Login = () => {

	const [nombre, setNombre] = useState('')
	const [password, setPassword] = useState('')
	const [errors, setErrors] = useState([]);

	const loginUser = async (e) => {
		e.preventDefault();

		const res = await fetch(`${process.env.REACT_APP_URL}/api/usuario/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials:'include',
			body: JSON.stringify({
				nombre,
				password,
			}),
		})
		
		if(res.ok){
			window.location.href='/'
		}else{
			setErrors(['Usuario o contraseña incorrectos'])
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try{
			let isValid = await loginSchema.validate({nombre, password}, {abortEarly: false});
			if(isValid){
				loginUser(e);
				setErrors([]);
			}
		}catch(e){
			setErrors(e.errors)
		}
	}

	return (
		<div className='containerLogin'>
			<div className="row justify-content-center">
				<div className="col-lg-4 col-md-6 col-12">
					<form onSubmit={handleSubmit}>
					<img src={image} className='img-thumbnail' alt="logo controlmaq" style={{ width: '350px', height: '350px', border: 'none', display: 'block', margin: 'auto' }} />
						<h2 className='text-center'>Iniciar sesión</h2>
						<br/>

						<label className='form-label'>Nombre</label>
						<input className='form-control' type="text" value={nombre}
							onChange={(e) => setNombre(e.target.value)}/>
						
						<br/>

						<label className='form-label'>Contraseña</label>
						<input className='form-control' type="password" value={password}
							onChange={(e) => setPassword(e.target.value)}/>
						
						<br/>
						<button className="btn btn-orange" type="submit" value="Login">Ingresar</button>
						<br /><br />

						{errors.length>0 &&
							<div className="alert alert-danger">
								{ errors.map((e) => (
										<div>
											{e}
										</div>
									))}
							</div>
						}
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login