import React from 'react'
import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });

const getVehiculos = async () => {
    const response = await fetch('http://localhost:3000/api/vehiculo',{
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials:'include',
    })

    const data = await response.json()
    console.log(data)
}

const Dashboard = () => {
    
    if(!cookies.get('token')){
        window.location.href = "/login"
    }

    return (
        <div>Dashboard</div>
    )
}

export default Dashboard