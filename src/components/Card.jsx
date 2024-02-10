import React from 'react'

const Card = (vehiculo) => {
  return (
    <div className='col-3'>
      <p>Patente: {vehiculo.patente}</p>
    </div>
  )
}
export default Card