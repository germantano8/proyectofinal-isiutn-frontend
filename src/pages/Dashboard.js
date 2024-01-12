import React from 'react'

const Dashboard = () => {

    async function req (e) {
        e.preventDefault()
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