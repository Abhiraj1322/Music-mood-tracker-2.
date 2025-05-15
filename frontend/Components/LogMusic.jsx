
import React, { useEffect, useState } from "react";
import { data } from "react-router-dom";


const LogMusic = () => {
  const[userId,setuserId]=useState("");
 const[mood,setmood]=useState([])
useEffect(()=>{
  const storeuserid=localStorage.getItem("userid");
  if(storeuserid){
  setuserId(storeuserid)
  }
  
},[])
useEffect(()=>{
  const fetchmoodhistory=async()=>{
    try{
      const res=await fetch(`http://localhost:8000/moodhistory/${userId}`)
      const data= await res.json();
  setmood(data)


    }
    catch(eror){
      console.error("cant fetch data",eror)
  }

}
console.log(mood)
fetchmoodhistory()
},[userId])

const deleteMood=async(id)=>{
  const confirm=window.confirm(`Are you sure you want to delete`)
  if(!confirm) return;
const res=await fetch(`http://localhost:8000/moodhistory/${id}`,{
  method:'Delete'

}); 
if(res.ok){
 setmood(prev=>prev.filter(item=>item._id !==id))
  console.log(mood)
}
else{
  console.error("failed to delte")
}

}

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-mono font-bold text-green-600 text-center mb-20">
        Mood History
      </h1>

      <div className="max-w-3xl mx-auto space-y-4">
        {mood.map((item, index) => {
          const date = new Date(item.date);
          const formattedDate = date.toLocaleString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });

          return (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-medium text-gray-800">{item.mood}</p>
                <p className="text-sm text-gray-500">{formattedDate}</p>
              </div>
              <div className="text-sm text-gray-400">#{index + 1}</div>
              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 "   onClick={() => deleteMood(item._id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default LogMusic