import React from 'react'
import{useNavigate,Link}from "react-router-dom"
const Dashboard = () => {
const navigate=useNavigate();
const handlogout=()=>{
    localStorage.removeItem('token')
    navigate('/login')
}

const userId=localStorage.getItem('userid')
const name=localStorage.getItem('name')
  return (
   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
  <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
    <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome to your Dashboard</h1>
    {name ?(
  <p className='text-gray-600 mb-4'>Name: <span className='font-medium'>{name}</span></p>
   ):(
    <p className='text-red-500 mb-4'>No user data found</p>
   )}
    {userId ? (
      <p className="text-gray-600 mb-4">User ID: <span className="font-medium">{userId}</span></p>
    ) : (
      <p className="text-red-500 mb-4">No user data found</p>
    )}
  
    <button 
      onClick={handlogout}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
    >
      Logout
    </button>
      <div className='flex  justify-between items-center mt-20'>
   <Link  to={"/home"}>Go to home</Link>
   
   <Link  to={"/logmusic"}>Log Your mood</Link>
    </div>

  </div>
</div>

  )
}

export default Dashboard