import {cookies} from '../../utils/utils'
import Cards from '../../components/Cards'
import Sidebar from '../../components/Sidebar'

const Dashboard = () => {
    
    if(!cookies.get('token')){
        window.location.href = "/login"
    }

    return (
        <div className='container'>
            <div className="row justify-content-center">
                <Sidebar/>
                <div className="col-9">
                    <Cards/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard