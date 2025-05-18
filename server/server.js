const express= require('express')
const mongoose=require('mongoose')
const cors= require("cors")
const Mood=require("./models/db")
const Cmood=require("./models/cmoods")
const Likedplaylist=require("./models/likeplaylists")
const authRoutes=require("./routes/auth")
require("dotenv").config()
 const app=express();
 app.use(express.json())
 const PORT= process.env.PORT ||8000
 const{searchPlaylists}=require("./src/spotify")
const likedplaylist = require('./models/likeplaylists')
 app.use(cors())


   app.post('/logMood', async(req,res) =>{
      const {userId,mood,}=req.body
      try{

   const newMood=  new Mood({userId,mood,})
   await newMood.save()
   res.status(201).json(newMood)
      }
      catch(err){
      res.status(500).json({message:"eror in saving log mood",eror:err})
      }
   })
   app.get("/moodhistory/:userId", async(req,res)=>{
   try{
const moods = await Mood.find({ userId:req.params.userId})
res.json(moods) 
 }

   catch(err){
 res.status(500).json({message:"Eror in fetching moode history" ,eror:err})
   }
})

////ADD CUSTOM MOOD
app.get('/cmoods/:userId',async(req,res)=>{
  try{
const CustomMoods= await Cmood.find({userId:req.params.userId})
res.json(CustomMoods.map(m=>m.mood))
  }
  catch(err){
 res.status(500).json({message:"Eror in fetching custom mood",eror:err})
  }
})
app.post('/addcmoods',async(req,res)=>{
  const{userId,mood}=req.body;
  try{
const exist=await Cmood.findOne({userId,mood})
if(exist){
  return res.status(400).json({message:"Custom mood already exists"})
}
const newcustomMood= new Cmood({userId,mood})
 await newcustomMood.save()
 res.status(201).json(newcustomMood)
}
  catch(err){
res.status(500).json({message:"Error in submiting mood",error:err})
  }
})



app.delete("/moodhistory/:id", async (req, res) => {
   try {
     const { id } = req.params;  
     const deleteMood = await Mood.findByIdAndDelete(id); 
 
     if (!deleteMood) {
       return res.status(404).json({ message: "Mood log not found" });
     }
 
     res.status(200).json({ message: "Mood successfully deleted" });
   } 
   catch (err) {
     res.status(500).json({ message: "Error deleting mood", error: err });
   }
 });
 
app.get("/playlist/:mood",async(req,res)=>{
   try{
const mood=req.params.mood
if(!mood){
   res.status(404).json({message:"mood parameter is required"})
}
const playlists=await searchPlaylists(mood)
res.json(playlists)
   } catch(err){
  res.status(500).json({message:"Erorr in fetching playlist",eror:err})

   }
})

////liked playlist

app.post("/saved-playlist", async (req, res) => {
  try {
  const {
      userId,
      playlistId,
      name,
      description,
      imageUrl,
      playlistUrl,
      tracksTotal,
    } = req.body;
    const likedplaylist = new Likedplaylist({
  userId,
  playlistId,
  name,
  description,
  imageUrl,
  playlistUrl,
  tracksTotal
    });

    await likedplaylist.save();

    res.status(201).json({ message: "Playlist saved", likedplaylist });
  } catch (error) {
    console.error("Error in storing playlist:", error);
    res.status(500).json({ message: "Error saving playlist", error });
  }
});

app.get("/likedplaylist",async(req,res)=>{
  try{
    const likeplaylists=await Likedplaylist.find()
    res.json(likeplaylists)
  }catch(eror){
 res.status(500).json({ error:'failed to playlist'})
  }
})


//auntheticaton of routes
app.use("/api/auth",authRoutes)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    console.log("Mongoose is connected")
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
