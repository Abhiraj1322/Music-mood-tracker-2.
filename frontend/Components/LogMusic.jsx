
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

fetchmoodhistory()
},[userId])


console.log(mood)


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-mono font-bold text-green-600">
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
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default LogMusic