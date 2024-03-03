import React from 'react'
import Sidebar from '../../components/Sidebar'
import {useGetData} from '../../hooks/getData'
import Loading from '../../components/Loading'
import EditDelete from '../../components/EditDelete'

const Clientes = () => {

  const [clientes, loading] = useGetData('cliente');

  return (
    <>
        <Sidebar/>
        <div className='table-responsive col-12 col-md-6 col-lg-9'>
          <h1 className='text-left'>Clientes</h1>

          <br />
          <button className="btn btn-orange">Nuevo cliente</button>
          <br/><br/>

          <table className="table table-striped">
            <thead>
              <tr>
                  {/* {clientes && Object.keys(clientes[0]).map((k)=>{return <th scope="col">{k.replace('_', ' ').toLocaleUpperCase()}</th>})} */}
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
                        <EditDelete element={"cliente"} id={c.cuit}/>
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