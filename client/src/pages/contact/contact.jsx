import React, { useRef, useState } from 'react'
import "./contact.css"
import axios from "axios";




function Contact() {
    const inputref=useRef();
    const messageref=useRef();
    const [sent,setSent]=useState(false);
    const handleSubmit=async(e)=>{
      e.preventDefault();
      try{await axios.post("/api/contact",{
        email:inputref.current.value,
        message:messageref.current.value
       })
      setSent(true)
      }
       catch(err){

       }

    }
  return (
    <div className="contact">
     {sent && 
        <span className="ack">
          Your response has been recorded! <br></br> Thank You!
        </span>}
        <form className="formcontact" onSubmit={handleSubmit} >
            <label>Your Email</label>
            <input type="email" placeholder="Your Email..." ref={inputref}></input><br/>
            <label>Your Message</label>
            <textarea  rows="4" cols="50" placeholder='Your Message...' ref={messageref}></textarea>
            <button className="contactSubmit">Send Message</button>
        </form>
       
    </div>
  )
}

export default Contact