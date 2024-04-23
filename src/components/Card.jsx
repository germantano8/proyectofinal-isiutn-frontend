import React from 'react'

const Card = ({vehiculo}) => {

  // const props = {
  //     patente: '',
  //     estado: '',
  //     anio: '',
  //     kilometraje: '',
  //     id_tipo_vehiculo: '',
  //     tipo_vehiculo: {
  //         descripcion: ''
  //     }
  // }
  
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{vehiculo.tipo_vehiculo.descripcion}</h5>
        <p className="card-text">Patente: {vehiculo.patente}</p>
        <p className="card-text">Km: {vehiculo.kilometraje}</p>
      </div>
    </div>
  )
}
export default Card