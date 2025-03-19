import { useState } from "react"
import React from "react"
import { useNavigate } from 'react-router-dom'
import './Signup.css'
const Signup=()=> {
    
    const [inputMessage,setInputMessage]=useState({
        email:"",
        name:"",
        password:"",
        address:"",
        
    });
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const[isDisabled,SetDisabled]=useState(false);
    
    const navigate = useNavigate();
    const handleExplore = ()=>{
        navigate("/login")
    }
    const HandleSignup =(e)=>{
        e.preventDefault()
        console.log(inputMessage)
    }
    const ValidSignup = ()=>{
         if(inputMessage){

         }
        
    }
    return (
      <>
        <div>
            <h1>Sign Up for a Account</h1>
         <form
         onSubmit={HandleSignup} 
         
         >
            <input
            type="email"
            value={inputMessage.email} 
            required={true}
            onChange={(e)=> setInputMessage((prev=>({...prev,email:e.target.value})))}/>
            
           
            
             <input
             type="text"
             value={inputMessage.name} 
             required={true}
             onChange={(e)=> setInputMessage((prev=>({...prev,name:e.target.value})))}
             />
            <input
             type="password"
             value={inputMessage.password} 
             required={true}
             onChange={(e)=> setInputMessage((prev=>({...prev,password:e.target.value})))}
            />
            <input type="address"
             value={inputMessage.address} 
             required={true}
             onChange={(e)=> { setIsDropdownVisible(e.target.value.length > 0);setInputMessage((prev=>({...prev,address:e.target.value})))}}
             onBlur={() => setTimeout(() => setIsDropdownVisible(false), 100)} // Optional: hide dropdown on blur
          onFocus={() => inputMessage.address.length > 0 && setIsDropdownVisible(true)} // Show on focus if there is input
        />
        {isDropdownVisible && (
          <ul>
              <li>
                {"something"}
              </li>
          </ul>
        )}
            
            <input type="submit" disabled={isDisabled} value="sign up"/>
            <button  onClick={handleExplore}> Click here if you already have a account</button>
         </form>
        </div>
      </>
    )
  }
  
  export default Signup