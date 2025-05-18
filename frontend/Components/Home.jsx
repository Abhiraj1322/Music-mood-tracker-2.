import React from 'react'
import { useEffect,useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom';

const homepage = () => {  

const [userId,setuserId]=useState("")
const[mood,setmood]=useState("");
const [playlist, setPlaylist] = useState([]);
const[customMood,setcustomMood]=useState([]);
useEffect(()=>{
  const storeuserid=localStorage.getItem("userid")
  if(storeuserid){
    setuserId(storeuserid)
  }
},[])
const users= localStorage.getItem("userid")

 const handleSubmit= async(e)=>{
 

  e.preventDefault();
  const moodData={ 
  userId,
  mood,
}

if(!mood){
     alert("Please fill the mood")
 return 
 }
try{
const response=await fetch('http://localhost:8000/logMood',{
  method:'POST',
  headers:{
     'Content-type':'application/json'

  },
  body:JSON.stringify(moodData)
})
const result= await response.json()

alert("Mood loged successfully");

setmood("");

}

catch(eror){
console.error(`Eror`,eror)
alert("eror in adding data somthing went")
}
if (mood) {
  const getsongs = async () => {

    const fetchsongs = await fetch(`http://localhost:8000/playlist/${mood}`);
    const data = await fetchsongs.json(); 

    const validplaylists= data.filter(item=>item!==null)
    setPlaylist(validplaylists);

  };
  getsongs();

} 



} 
useEffect(()=>{

const fetchCustomMood= async()=>{
const fetchmood = await fetch(`http://localhost:8000/cmoods/${users}`)
const data =await fetchmood.json();

setcustomMood(data)

}
fetchCustomMood()

},[])

const likePlaylist=async(list)=>{
  try{
const playlistdata = {
    userId: userId, 
    playlistId: list.id,
    name: list.name,
    description: list.description || "",
    imageUrl: list.images?.[0]?.url || "",
    playlistUrl: list.external_urls?.spotify || "",
    tracksTotal: list.tracks?.total || 0,
  };
fetch("http://localhost:8000/saved-playlist",{
  method:'POST',
  headers:{
   "Content-Type": "application/json",

  },
  body:JSON.stringify(playlistdata)
})
alert("plalistliked")

  }
  catch(error){

console.error("Error saving playlist:", error);
  }


}
  return (

    <div className='font-mono flex flex-col items-center min-h-screen'>
      <div>
      <h1 className="text-3xl font-mono font-bold text-green-600 mr-[132px] mt-3.5 p-5 ">Flow State</h1>
      </div>

    
    <ul className="flex gap-[25px] ml-[75%]">
      <li><Link to={"/dashboard"}>Dashboard</Link></li>
      <li><Link to={"/logmusic"}>Vibe check</Link></li>
       <li><Link to={"/customMood"}>Add Mood</Link></li>
      <li></li>
    </ul>

    
     
  <div>


  </div>
<div className='w-full p-24 rounded-lg shadow-cyan-50'>
<form onSubmit={handleSubmit}>

<div className='flex gap-5'>
  <label className='text-shadow-2xs'>Userid</label>
  <p className='text-pink-900'>{userId}</p>
</div>
<div className='mt-7 flex flex-col gap-3'>

  <label>Mood</label>
  <select
  value={mood}
  onChange={(e) => setmood(e.target.value)}
  className="w-full border-2 border-amber-700  p-2 rounded-md "
>
  <option value="" className=''>Select a mood</option>
  {/* General Moods */}
{customMood.map((moods, index) => (
  <option key={index}>{moods}</option>
))}

  {/* Coding Moods */}
  <option value="In the zone">In the zone (coding)</option>
  <option value="Debugging nightmare">Debugging nightmare</option>
  <option value="Code confident">Code confident</option>
  <option value="Stack Overflowing">Stack Overflowing</option>

</select>


</div>
<div className='flex justify-center mr-[129px] mt-[57px]'>
<button className='bg-amber-800 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded ' type="submit">Submit Mood</button>
</div>

</form>

</div>


 
  {playlist.length === 0 ? (
    <p className='mr-[119px] font-bold'>Playlist not found</p>
  ) : (
   <div className="p-6 bg-gray-100 min-h-screen">
  <h2 className="text-2xl font-bold mb-6 text-center mr-20">Your Spotify Playlist Songs</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {playlist.map((list, index) => (
      <div key={index} className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
        <img
          src={list.images[0]?.url}
          alt="Playlist cover"
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
        <p className="text-lg font-semibold mb-2">{list.name}</p>
        <a
          href={list.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:underline"
        >
          Open on Spotify
        </a>
        <p className="text-sm text-gray-600 mt-2">Tracks: {list.tracks.total}</p>
       <button onClick={()=>likePlaylist(list)}>Like</button>
      </div>
    ))}
  </div>
</div>

  )}
</div>
  
  )
}

export default homepage