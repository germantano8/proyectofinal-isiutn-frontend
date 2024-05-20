import React from 'react'
import { useLocation } from "react-router-dom";
import image from './logo-controlmaq.png'
import calendar from './calendar_icon_243178.png'
import repair from './auto-repair_39384.png'
import graph from './graph_106420.png'
import grua from './crane3_122401.png'
import service from './service.png'
import clientes from './clientes.png'

import * as utils from '../utils/utils'

const Sidebar = () => {

const location = useLocation();
const {pathname} = location;
const className = "list-group-item list-group-item-action"

const handleLogout = () => {
    utils.cookies.remove('token');
  };

return (
    <div className="col-12 col-md-6 col-lg-3">
        <img src={image} className='img-thumbnail' alt="logo controlmaq"/>
        <br/><br />
        <div className="list-group">
            <a href="/" className={pathname === "/" ? `${className} active` : className}>Overview</a>
            <a href="/proyectos" className={pathname === "/proyectos" ? `${className} active` : className}>Proyectos</a>
            <a href="/trabajos" className={pathname === "/trabajos" ? `${className} active` : className}>Trabajos</a>
            <a href="/calendario" className={pathname === "/calendario" ? `${className} active` : className} style={{display: 'flex'}}>
                <div style={{width: '100%'}}>Calendario</div>
                <img src={calendar}  style={{width: '10%'}}className='' alt=""/>
            </a>
            <a href="/reparaciones" className={pathname === "/reparaciones" ? `${className} active` : className} style={{display: 'flex'}}>
                <div style={{width: '100%'}}>Reparaciones</div>
                <img src={repair}  style={{width: '10%'}}className='' alt=""/>            
            </a>
            <a href="/servicios" className={pathname === "/servicios" ? `${className} active` : className}  style={{display: 'flex'}}>
                <div style={{width: '100%'}}>Services</div>
                <img src={service}  style={{width: '10%'}}className='' alt=""/>            
            </a>
            <a href="/vehiculos" className={pathname === "/vehiculos" ? `${className} active` : className}style={{display: 'flex'}}>
                <div style={{width: '100%'}}>Vehículos</div>
                <img src={grua}  style={{width: '10%'}}className='' alt=""/>                
            </a>
            <a href="/clientes" className={pathname === "/clientes" ? `${className} active` : className} style={{display: 'flex'}}>
                <div style={{width: '100%'}}>Clientes</div>
                <img src={clientes}  style={{width: '10%'}}className='' alt=""/>
            </a>
            <a href="/metricas" className={pathname === "/metricas" ? `${className} active` : className} style={{display: 'flex'}}>
                <div style={{width: '100%'}}>Metricas de uso</div>
                <img src={graph}  style={{width: '8%'}}className='' alt=""/>
            </a>
            <a href="/" onClick={handleLogout} className={` ${className} list-group-item-danger `}>Cerrar sesión</a>
        </div>
    </div>
)
}

export default Sidebar