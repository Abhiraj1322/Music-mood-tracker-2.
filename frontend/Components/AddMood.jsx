import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMood = () => {
    const[userId,setuserId]=useState('')
     const[mood,setmood]=useState([])
 const navigate=useNavigate();

const Cmood=async(e)=>{
    
  e.preventDefault();
try{
const response=axios.post("http://localhost:8000/addcmoods",{
    userId,
    mood
})
alert("your mood add succcesfully")
setuserId("")
setmood("");
navigate("/home")
}
catch(error){

}
}
  return (
    <div>

  <form onSubmit={Cmood} className='max-w-sm p-4 bg-white rounded-2xl shadow-md border border-gray-200 m-auto mt-44 font-mono '>
      <h1 className='text-center mb--3 text-2xl  text-amber-950'>Custom Mood</h1>
      
      <div className='pt-[20px]  pb[20px]'>
        <label className=''>User ID</label><br />
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setuserId(e.target.value)}
          required
       className='w-full px-4 py-2 border text-shadow-pink-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  textx-pink-950 mt-2.5' />
      </div>

      <div className='pt-[20px]  pb[25px]'>
        <label htmlFor="mood">Custom Mood</label><br />
        <input
          type="text"
          id="mood"
          value={mood}
          onChange={(e) => setmood(e.target.value)}
          required
          className='w-full px-4 py-2 border text-shadow-pink-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  textx-pink-950 mt-2.5'
        />
      </div>
     <div className='flex justify-center'>
 <button className="mt-11 px-4 py-2 bg-amber-700 text-white rounded hover:bg-amber-900 cursor-pointer " type="submit">Add Mood</button>
     </div>
     
    </form>


    </div>
  )
}

export default AddMood