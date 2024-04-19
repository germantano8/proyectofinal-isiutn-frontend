import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import * as utils from './utils/utils'
import Sidebar from './components/Sidebar'
import { 
  Login, 
  Dashboard, 
  Clientes, 
  Proyectos, 
  ProyectoSingle,
  Reparaciones,
  Metricas
} from './pages'

const App = () => {

  const token = utils.cookies.get('token')

	return (
    <div className='container'>
      <br/>
      <div className="row justify-content-center">
        {token && <Sidebar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          {token ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/proyectos" element={<Proyectos />} />
              <Route path="/proyecto/:id" element={<ProyectoSingle />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/reparaciones" element={<Reparaciones />} />
              <Route path="/metricas" element={<Metricas />} />
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