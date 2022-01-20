import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function Register() {
  
  const [username,setUsername]= useState("");
  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
  const [error,setError]= useState(false)
  

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const res = await axios.post("/auth/register",{
        username,
        email,
        password
      })      
      res.data && window.location.replace("/login")
    } catch (error) {
      
      console.log(error);
      setError(true)
    }

  }
  return (
    <div>
      <h1>Register</h1>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <p>
            <label htmlFor="">Username</label>
            <input type="text"  required
          onChange={(e)=>setUsername(e.target.value)}/>
          </p>
          <p>
            <label htmlFor="">Email</label>
            <input type="email" required onChange={(e)=>setEmail(e.target.value)}/>
          </p>
          <p>
            <label htmlFor="">Password</label>
            <input type="password" required onChange={(e)=>setPassword(e.target.value)}/>
          </p>
          <p>
            <button>Sign up</button>
            {error &&  <p style={{color:"red"}} >Something wrong in somewhere !!!</p>}
          </p>
        </form>
        <p>
          if u have account .Login <Link to="/login">here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
