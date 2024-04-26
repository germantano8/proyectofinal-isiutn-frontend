import {React} from 'react'

const Metricas = () => {

  return (
    <>      
        <div className='table-responsive col-12 col-md-6 col-lg-9'>
          <h1 className='text-left'>Métricas de uso</h1>
            <iframe title="metricas" width="1020" height="600" src="https://app.powerbi.com/reportEmbed?reportId=a0e09203-b40d-4989-9878-808447aedbb0&autoAuth=true&embeddedDemo=true" frameborder="0" allowFullScreen="true"></iframe>
        </div>
    </>
    )
    
}

export default Metricas