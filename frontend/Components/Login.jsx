import React from 'react'
import { useState } from 'react'
import  axios from "axios"
import { Link ,useNavigate} from 'react-router-dom';

const Login = () => {
   const[userId,setuserId]=useState('')
    const[password,setpassword]=useState('');
    const navigate=useNavigate();
const submitform=async(e)=>{
e.preventDefault();
try{
    const response=await axios.post("http://localhost:8000/api/auth/login",{
        userId,
        password,
    })

    localStorage.setItem('token',response.data.token)
    localStorage.setItem('userid',userId)

    alert("Login successfully")
      navigate("/Home")
}
catch(err){
    alert("Invalid user id or passowrd")

}
}

  return (
    <div className="flex flex-col items-center min-h-screen bg-white font-mono" >
    <div className="text-center mt-6">
      <h1 className="text-3xl font-mono font-bold text-green-600 p-4">Music Mood Tracker</h1>
    </div>
  
    <div className="w-full max-w-md bg-white mt-6 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-pink-950 mb-6">Login</h2>
  
      <form onSubmit={submitform} className="space-y-4">
        <div>
          <label className="block font-medium mb-1 text-pink-950">User ID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setuserId(e.target.value)}
            className="w-full px-4 py-2 border text-shadow-pink-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  textx-pink-950"
            placeholder="Enter your user ID"
          />
        </div>  
  
        <div>
          <label className="block    font-medium mb-1 text-shadow-pink-950">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>
  
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign In
        </button>
  
        <div className="text-center mt-4">
          <Link to="/register" className="text-pink-950 hover:underline">
            Don't have an account? Register
          </Link>
        </div>
      </form>
    </div>
  </div>
  
  )
}

export default Login