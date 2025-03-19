import { useState } from "react"
import React from "react"
import { useNavigate } from 'react-router-dom'
import './Signup.css'
const Signup=()=> {
    const [message,setMessage]=useState("");
    const handlechange =(e)=>{
        e.preventDefault();
        alert("here")
        
    }
    const navigate = useNavigate();
    const handleExplore = ()=>{
        navigate("/home")
    }

    return (
      <>
        <div>
            <h1>Sign Up for a Account</h1>
         <form>
            <input
            type="text"
            value={message} 
            onChange={(e)=> setMessage(e.target.value)}></input>
            <button onClick={handlechange}></button>
           <div className="login">
            <input
            type="text" 
            ></input>
            <button onClick={handleExplore}>If you already have an account</button>
            </div>
         </form>
        </div>
      </>
    )
  }
  
  export default Signup