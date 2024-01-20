import { useState } from 'react'
import { Container } from 'react-bootstrap'

const Login = () => {
	const [nombre, setNombre] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(e) {
		e.preventDefault()

		const response = await fetch('http://localhost:3000/api/usuario/login', {
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

		const data = await response.json()

        console.log(data)
	}

	return (
		<Container>
			<div className="row justify-content-center">
				<div className="col-6">
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
						<button className="btn btn-primary" type="submit" value="Login">Ingresar</button>
					</form>
				</div>
			</div>
		</Container>
	)
}

export default Login