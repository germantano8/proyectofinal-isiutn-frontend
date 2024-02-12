import React from 'react'

const Sidebar = () => {
return (
    <div className="col-3">
        <img src="./logo-controlmaq.png" className='img-thumbnail' alt="logo controlmaq"/>
        <br/>
        <div className="list-group">
            <a href="dashboard" className="list-group-item list-group-item-action">Overview</a>
            <a href="#" className="list-group-item list-group-item-action">Proyectos</a>
            <a href="#" className="list-group-item list-group-item-action">Mantenimiento</a>
            <a href="#" className="list-group-item list-group-item-action">Clientes</a>
            <a href="#" className="list-group-item list-group-item-action">Métricas de uso</a>
        </div>
    </div>
)
}

export default Sidebar