import { React, useState } from 'react'
import './login.css'

const Login = () => {

	const [nombre, setNombre] = useState('')
	const [password, setPassword] = useState('')

	const loginUser = async (e) => {
		e.preventDefault()

		await fetch(`${process.env.REACT_APP_URL}/api/usuario/login`, {
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

		window.location.href='/'
	}

	return (
		<div className='container'>
			<div className="row justify-content-center">
				<div className="col-lg-4 col-md-6 col-12">
					<form onSubmit={loginUser}>
						<h1 className='text-center'>ControlMaq</h1>
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
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login