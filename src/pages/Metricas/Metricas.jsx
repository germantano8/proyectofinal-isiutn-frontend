import {React} from 'react'

const Metricas = () => {

  return (
    <>      
        <div className='table-responsive col-12 col-md-6 col-lg-9'>
          <h1 className='text-left'>Métricas de uso</h1>
          <iframe title="Sales & Returns Sample v201912" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=727d2b95-e887-4511-9814-e12aae70d6ae&autoAuth=true&embeddedDemo=true" frameborder="0" allowFullScreen="true"></iframe>
        {/* La linea de arriba se obtiene desde el archivo PWBI (versiòn online, archivo publicado). 
        Cambiarla luego por el PWBI definitivo una vez construido el mismo */}
        </div>
    </>
    )
    
}

export default Metricas