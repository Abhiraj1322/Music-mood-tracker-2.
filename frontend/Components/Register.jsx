import axios from 'axios';
import React, { useState } from 'react'

const Register = () => {
    const[userId,setuserId]=useState('')
    const [password,setpassword]=useState('');
    const[name,setname]=useState('');


    const handleregister=async(e)=>{
        console.log("sending resgestration",{name,userId,password})
  e.preventDefault();
  try{
    const response= await axios.post("http://localhost:8000/api/auth/register",{
       name,
        userId,
        password,
    })
 
 alert("user resgistered successfully")   
 setname('')
 setuserId('')
 setpassword('')

  }
  catch(error){
    console.error("Regestration Eror",error);
    alert(error.response?.data?.message || 'Something went wrong during registration');
  }
      
    }
   
  return (
<div className="min-h-screen flex items-center justify-center bg-gray-100 font-mono ">
  
  <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
 
    <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Register</h1>

    <form onSubmit={handleregister} className="space-y-4">
      <div>
        <label className="block text-gray-700 font-medium mb-1">Name</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">User ID</label>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setuserId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
      >
        Submit
      </button>
    </form>
  </div>
</div>

  )
}

export default Register