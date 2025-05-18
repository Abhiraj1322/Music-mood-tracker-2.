import React from 'react'
import { useState,useEffect  } from 'react'
const LikdePlaylist = () => {
const[liked,setliked]=useState([])
useEffect(()=>{
  const fetchlike=async()=>{
  const response=await fetch("http://localhost:8000/likedplaylist")
  const data=await response.json();
  setliked(data)
  }
fetchlike();
},[])


console.log(liked)
  return (
    <div> 
   <div className="p-6 bg-gray-100 min-h-screen">
  <h2 className="text-2xl font-bold mb-6 text-center mr-20">Your Spotify Playlist Songs</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {liked.map((list, index) => (
      <div key={index} className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
        <img
          src={list.imageUrl}
          alt="Playlist cover"
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
        <p className="text-lg font-semibold mb-2">{list.name}</p>
        <a
          href={list.playlistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:underline"
        >
          Open on Spotify
        </a>
        <p className="text-sm text-gray-600 mt-2">Tracks: {list.tracksTotal}</p>
     
      </div>
    ))}
  </div>
</div>


    </div>
  )
}

export default LikdePlaylist