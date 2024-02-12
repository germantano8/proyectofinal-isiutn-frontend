import {cookies} from '../../utils/utils'
import Cards from '../../components/Cards'
import Sidebar from '../../components/Sidebar'

const Dashboard = () => {
    
    if(!cookies.get('token')){
        window.location.href = "/login"
    }

    return (
        <>
            <Sidebar/>
            <div className="col-12 col-md-6 col-lg-9">
                <Cards/>
            </div>
        </>
    )
}

export default Dashboard