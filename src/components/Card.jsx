import React from 'react'

const Card = ({vehiculo}) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{vehiculo.tipo_vehiculo.descripcion}</h5>
        <p className="card-text">Patente: {vehiculo.patente}</p>
        <p className="card-text">Estado: {vehiculo.estado}</p>
        <p className="card-text">Km: {vehiculo.kilometraje}</p>
        <a href={`/vehiculo/${vehiculo.patente}`} className="btn btn-orange">Ver detalles</a>
      </div>
    </div>
  )
}
export default Card