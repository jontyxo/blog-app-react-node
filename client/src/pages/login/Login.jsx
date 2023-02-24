import axios from "axios";
import { useContext, useRef,useState } from "react";
import { Context } from "../../context/Context";
import "./login.css";


export default function Login() {
  const{dispatch,isFetching}=useContext(Context)
  const userRef=useRef();
  const passwordRef=useRef();
  const [errmess,setErrmess]=useState(false);

   const handleSubmit=async (e)=>{
   e.preventDefault();
   dispatch({type:"LOGIN_START"});
   try{
   const res=await axios.post("/api/auth/login",{
    username:userRef.current.value,
    password:passwordRef.current.value
   })
   dispatch({type:"LOGIN_SUCCESS",payload:res.data});

   }catch(err){
    dispatch({type:"LOGIN_FAILURE"});
    
      if(err.response.status===500) {
  setErrmess(true)
      }

   }

   }
   

  return (
    <div className="login" onSubmit={handleSubmit}>
      <span className="loginTitle">Login</span>
      <form className="loginForm">
        <label>Username</label>
        <input className="loginInput" type="text" placeholder="Enter your username..."  ref={userRef}/>
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..." minLength="3" ref={passwordRef}/>
        <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
      </form>
        <button className="loginRegisterButton" onClick={()=>{
          window.location.assign('/register')
        }}>Register</button>
         {  errmess &&

<p className="errormess">There has been an Internal Server Error</p>
}
    </div>
  );
}
