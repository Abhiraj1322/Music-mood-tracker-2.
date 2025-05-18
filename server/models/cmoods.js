const mongoose=require('mongoose')
const moodschema = new mongoose.Schema({
userId:{
type:String,
required:true,
},
mood:{
 type:String,
 required:true,  
}

}) 
const Cmood=mongoose.model('cmood',moodschema)
module.exports=Cmood