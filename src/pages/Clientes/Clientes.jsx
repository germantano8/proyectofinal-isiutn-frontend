import React from 'react'
import Sidebar from '../../components/Sidebar'

const Clientes = () => {
  return (
    <>
        <Sidebar/>
        <table className="table table-striped col-12 col-md-6 col-lg-9">
        <thead>
        <tr>
            <th scope="col">Cuit</th>
            <th scope="col">Razón Social</th>
        </tr>
        </thead>
            {/* <Table path={'cliente'}/> */}
        </table>
    </>
  )
}

export default Clientes