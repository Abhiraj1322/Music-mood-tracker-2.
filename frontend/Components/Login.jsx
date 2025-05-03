import React from 'react'
import { useState } from 'react'
import  axios from "axios"
const Login = () => {
    const[userId,setuserId]=useState('');
    const[password,setpassword]=useState('');

const submitform=async(e)=>{
e.preventDefault();
try{
    const response=await axios.post("http://localhost:8000/api/auth/login",{
        userId,
        password,
    })
    
    localStorage.setItem('token',response.data.token)
    alert("Login successfully")
}
catch(err){
    alert("Invalid user id or passowrd")

}
}

  return (
    <div>
        <h2>Login</h2>
<form onSubmit={submitform}>
    <div>
        <label>User ID:</label>
        <input type="text" value={userId} />
    </div>

</form>

    </div>
  )
}

export default Login