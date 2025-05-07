const express=require("express");
const router=express.Router();
const  { registereduser }=require('../controllers/authControllers')
const {loginUser}=require('../controllers/loginControllers')


router.post('/register',registereduser)
router.post('/login',loginUser)

module.exports=router