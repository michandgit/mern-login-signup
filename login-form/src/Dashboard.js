import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Dashboard.css"

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem("Token");
        navigate("/");
    }
  return (
    <div className='dashboard'>
        <h1>Welcome to the Dashboard</h1>
        <button onClick={handleLogout} className='btn-logout'>Logout</button>
      
    </div>
  )
}

export default Dashboard
