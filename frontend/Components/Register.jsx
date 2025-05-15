import axios from 'axios';
import React, { useState } from 'react'

const Register = () => {
    const[userId,setuserId]=useState('')
    const [password,setpassword]=useState('');
    const[name,setname]=useState('');


    const handleregister=async(e)=>{

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
localStorage.setItem("name",name)
  }
  catch(error){
    console.error("Regestration Eror",error);
    alert(error.response?.data?.message || 'Something went wrong during registration');
  }
      
    }
   
  return (
<div className="flex flex-col items-center min-h-screen bg-white font-mono" >
<div className="text-center p-5">
      <h1 className="text-3xl font-mono font-bold text-green-600 p-4 ">Music Mood Tracker</h1>
    </div>
  
  <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">

    <h1 className="text-2xl font-semibold text-center text-pink-950 mb-6">Register</h1>

    <form onSubmit={handleregister} className="space-y-4">
      <div>
        <label className="block font-medium mb-1 text-pink-950">Name</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block font-medium mb-1 text-pink-950">User ID</label>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setuserId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="">Password</label>
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
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Submit
      </button>
    </form>
  </div>
</div>

  )
}

export default Register