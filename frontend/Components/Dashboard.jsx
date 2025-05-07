import React from 'react'
import{useNavigate}from "react-router-dom"
const Dashboard = () => {
const navigate=useNavigate();
const handlogout=()=>{
    localStorage.removeItem('token')
    navigate('/login')
}

const userId=localStorage.getItem('userid')
  return (
    <div>
  <h1>Welcome to your Dashboard</h1>
  {userId ? <p>user ID:{userId}</p>:<p>No user data found</p>}

        <button onClick={handlogout}>logout</button>
    </div>
  )
}

export default Dashboard