import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import {Context} from "../../context/Context"
import axios from "axios"
function Login() {
    const userRef= useRef();
    const passRef= useRef();
   
    const {dispatch, isFetching}=useContext(Context)

    const handleSubmit= async (e)=>{
        e.preventDefault();
        dispatch({type:"LOGIN_START"})
        try {
            const res = await axios.post("/auth/login",{
                username: userRef.current.value,
                password: passRef.current.value,
               
            })
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            res.data && window.location.replace("/")
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE" });
        }
    }

  return (
    <div>
      <h1>Login</h1>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <p>
            <label htmlFor="">Username</label>
            <input type="text" ref={userRef}/>
          </p>
         
          <p>
            <label htmlFor="">Password</label>
            <input type="password" ref={passRef}/>
          </p>
          <p>
            <button  disabled={isFetching}>Login</button>
          </p>
        </form>
        <p>
          if u don't have account .Register <Link to="/register">here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
