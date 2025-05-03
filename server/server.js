const express= require('express')
const mongoose=require('mongoose')
const cors= require("cors")
const Mood=require("./Model/db")
const authRoutes=require("./routes/auth")
require("dotenv").config()
 const app=express();
 app.use(express.json())
 const PORT= process.env.PORT ||8000
 const{searchPlaylists}=require("./src/spotify")
 app.use(cors())


   app.post('/logMood', async(req,res) =>{
      const {userId,mood,songs}=req.body
      try{
   const newMood=  new Mood({userId,mood,songs})
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
 
app.delete("/deleteMood/:id", async (req, res) => {
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
