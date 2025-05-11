const mongoose=require('mongoose');
const moodschema = new mongoose.Schema({ 
    userId:{
   type:String,
   required:true,
        } ,
    mood:{
        type:String,
       required:true,
      
     },
     date:{
        type:Date,
        default:Date.now
 
    },


});
const Mood=mongoose.model('Mood',moodschema)
module.exports=Mood
