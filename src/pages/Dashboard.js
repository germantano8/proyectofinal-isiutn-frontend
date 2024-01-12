import React from 'react'
import Cookies from 'universal-cookie';
const cookies = new Cookies(null, { path: '/' });

const Dashboard = () => {
    
    async function req (e) {
        e.preventDefault()
        const token = cookies.get('token')
        
        if(token){
            cookies.remove('token')
        }

        const response2 = await fetch('http://localhost:3000/api/vehiculo',{
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials:'include',
        })

        const data2 = await response2.json()
        console.log(data2)
    }

    return (
    <button type="submit" onClick={req}>holsa</button>
    )
}

export default Dashboard