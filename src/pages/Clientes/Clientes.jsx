import React from 'react'
import Sidebar from '../../components/Sidebar'
import {useGetData} from '../../hooks/getData'
import Loading from '../../components/Loading'

const Clientes = () => {

  const [clientes, loading] = useGetData('cliente');

  return (
    <>
        <Sidebar/>
        <div className='col-12 col-md-6 col-lg-9'>
          <h1 className='text-left'>Clientes</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                  <th scope="col">Cuit</th>
                  <th scope="col">Razón Social</th>
                  <th scope="col">Acciones</th>
              </tr>
            </thead>

            {loading && <Loading/>}

            <tbody>
                {
                  clientes.map((c) => {
                    return (
                      <tr key={c.cuit}>
                        <td>{c.cuit}</td>
                        <td>{c.razon_social}</td>
                        <td>
                        <i class="bi bi-building-fill-x"></i>
                          <button className='btn btn-danger'>Eliminar</button>
                        </td>
                      </tr>
                    )
                  })
                }
            </tbody>
          </table>
        </div>
    </>
  )
}

export default Clientes