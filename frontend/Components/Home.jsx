import React from 'react'
import { useEffect,useState } from 'react'
const homepage = () => {  

const [userId,setuserId]=useState("")
const[mood,setmood]=useState("");
const [playlist, setPlaylist] = useState([]);
const [showplaylist, setshowplaylist] = useState(false);




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
setuserId("");
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
  return (
    <div>
  <h1>Log your mood</h1>

  <form onSubmit={handleSubmit}>
    <div>
      <label>User ID:</label>
      <input
        type="text"
        value={userId}
        onChange={(e) => setuserId(e.target.value)}
      />
    </div>

    <div>
      <label>Mood:</label>
      <input
        type="text"
        value={mood}
        onChange={(e) => setmood(e.target.value)}
      />
    </div>

    <button type="submit">Submit Mood</button>
  </form>

 
  {playlist.length === 0 ? (
    <p>Playlist not found</p>
  ) : (
    <div>
      <h2>Your Spotify Playlist Songs</h2>
      {playlist.map((list, index) => (
        <div key={index}>
          <img src={list.images[0]?.url} alt="Playlist cover" />
          <p>{list.name}</p>
          <a href={list.external_urls.spotify} target="_blank" rel="noopener noreferrer">
            Open on Spotify
          </a>
          <p>Tracks: {list.tracks.total}</p>
        </div>
      ))}
    </div>
  )}
</div>
  
  )
}

export default homepage