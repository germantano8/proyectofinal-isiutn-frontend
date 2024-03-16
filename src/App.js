import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import {cookies} from './utils/utils'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Clientes from './pages/Clientes/Clientes'
import Trabajos from './pages/Trabajos/Trabajos'

const App = () => {

  const token = cookies.get('token')

	return (
    <div className='container'>
      <br/>
      <div className="row justify-content-center">
        <Routes>
          <Route path="/login" element={<Login />} />
          {token ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/trabajos" element={<Trabajos />} />
              <Route path="/clientes" element={<Clientes />} />
            </>
          ) : 
            <Route path='*' element={<Navigate to='/login'></Navigate>}></Route>
          }
        </Routes>
      </div>
    </div>
	)
}

export default App