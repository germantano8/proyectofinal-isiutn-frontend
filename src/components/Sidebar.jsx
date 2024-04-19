import React from 'react'
import { useLocation } from "react-router-dom";
import image from './logo-controlmaq.png'

const Sidebar = () => {

const location = useLocation();
const {pathname} = location;
const className = "list-group-item list-group-item-action"

return (
    <div className="col-12 col-md-6 col-lg-3">
        <img src={image} className='img-thumbnail' alt="logo controlmaq"/>
        <br/><br />
        <div className="list-group">
            <a href="/" className={pathname === "/" ? `${className} active` : className}>Overview</a>
            <a href="#" className="list-group-item list-group-item-action">Vehículos</a>
            <a href="/proyectos" className={pathname === "/proyectos" ? `${className} active` : className}>Proyectos</a>
            <a href="/reparaciones" className={pathname === "/reparaciones" ? `${className} active` : className}>Reparaciones</a>
            <a href="/clientes" className={pathname === "/clientes" ? `${className} active` : className}>Clientes</a>
            <a href="/metricas" className={pathname === "/metricas" ? `${className} active` : className}>Metricas de uso</a>
        </div>
    </div>
)
}

export default Sidebar