import React from 'react'

const Card = ({vehiculo}) => {
  return (
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{vehiculo.tipo_vehiculo.descripcion}</h5>
        <p class="card-text">Patente: {vehiculo.patente}</p>
        <p class="card-text">Estado: {vehiculo.estado}</p>
        <p class="card-text">Km: {vehiculo.kilometraje}</p>
        <a href={`/vehiculo/${vehiculo.patente}`} class="btn btn-primary">Ver detalles</a>
      </div>
    </div>
  )
}
export default Card