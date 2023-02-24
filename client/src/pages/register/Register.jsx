import { useState } from "react"
import "./register.css"
import axios from "axios"

export default function Register() {
  const [username,setUsername]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [errmess,setErrmess]=useState(false);
  
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{

      const res=await axios.post("/api/auth/register",{
        username,
        email,
        password
      })
      res.data && window.location.replace("/login")
    }
   catch(err){
    if(err.response.status===500) {
setErrmess(true)
    }
   }
  }

    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="registerInput" type="text" placeholder="Enter your username..." 
          onChange={e=>setUsername(e.target.value)}
        />
        <label>Email</label>
        <input className="registerInput" type="text" placeholder="Enter your email..." 
          onChange={e=>setEmail(e.target.value)}

        />
        <label>Password</label>
        <input className="registerInput" type="password" placeholder="Enter your password..." 
          onChange={e=>setPassword(e.target.value)}

        />
        <button className="registerButton" type="submit">Register</button>
      </form>
        <button className="registerLoginButton" onClick={()=>{
          window.location.assign('/login')
        }}>Login</button>

        {  errmess &&

        <p className="errormess">There has been an Internal Server Error</p>
        }
    </div>
    )
}
