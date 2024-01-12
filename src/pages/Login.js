import { useState } from 'react'

function App() {
	const [nombre, setNombre] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(e) {
		e.preventDefault()

		const response = await fetch('https://controlmaq.onrender.com/api/usuario/login', {
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

		const response2 = await fetch('https://controlmaq.onrender.com/api/vehiculo')

		const data2 = await response2.json()
		console.log(data2)
	}

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={loginUser}>
				<input
					value={nombre}
					onChange={(e) => setNombre(e.target.value)}
					type="text"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
				/>
				<br />
				<input type="submit" value="Login" />
			</form>
		</div>
	)
}

export default App