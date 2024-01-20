import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dasboard from './pages/Dashboard'

const App = () => {
	return (
    <Routes>
      <Route path="/" element={<Dasboard/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
	)
}

export default App