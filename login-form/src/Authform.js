import React, { useState } from "react";
import "./Authform.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from "./utils";



function Authform() {
  const [isLogin, setIsLogin] = useState(true);

  const [loginInfo , setLoginInfo] = useState({
    email:"",
    password:""
  })

  const navigate = useNavigate();

  const [signupInfo , setSignupInfo]= useState({
    email:"",
    password:"",
    confirmPassword:""
  })

  
  const handleChange = (e)=>{
    const {name,value} = e.target;
    console.log(name,value);
    const copyInfo = {...loginInfo};
    copyInfo[name] = value;
    setLoginInfo(copyInfo);

  }
  const handleSignup = async (e)=>{
    e.preventDefault();
    const  {email,password,confirmPassword} = signupInfo;
    
    console.log(email,password,confirmPassword);
    if(!email || !password || !confirmPassword){
      return handleError("All fields are required!");
    }

    try {
      const url= 'https://mern-login-signup-two.vercel.app/signup'
      const response = await fetch(url,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(signupInfo)
      })
      const result = await response.json();
      console.log(result);
      const {success,message,error} = result;
      if(success){
        handleSuccess(message);
        setSignupInfo({ email: "", password: "", confirmPassword: "" });
        navigate("/");
      }else if(error){
        const details = error[0].message;
        handleError(details);
      }else if(!success){
        handleError(message);
      }
      
    } catch (error) {
      handleError(error);
      
    }
  }
  const handleLogin = async (e)=>{
    e.preventDefault();
    const  {email,password} = loginInfo;
    console.log(email,password);
    if(!email || !password ){
      return handleError("All fields are required!");
    }

    try {
      const url= 'https://mern-login-signup-two.vercel.app/login'
      const response = await fetch(url,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(loginInfo)
      })
      const result = await response.json();
      console.log(result);
      const {success,message,error , jwToken} = result;
      
      if(success){
        localStorage.setItem('token' ,jwToken);
        handleSuccess(message);
        setSignupInfo({ email: "", password: "" });
        navigate("/dashboard")
      }else if(error){
        const details = error[0].message;
        handleError(details);
      }else if(!success){
        handleError(message);
      }
      
    } catch (error) {
      handleError(error);
      
    }
  }


  const handleChangeSignup = (e) =>{
    const {name,value} = e.target;
    const copyInfo = {...signupInfo};
    copyInfo[name]=value;
    setSignupInfo(copyInfo);

  }

  

  return (
    <div className="container">
        <ToastContainer position="top-right" autoClose={5000} /> 
      <div className="buttons">
        <button className= {`login ${isLogin ? 'active' : ''}`}  onClick={() => setIsLogin(true)}>
          Login
        </button>
        <button className={`signup ${isLogin ? '' : 'active'}`} onClick={() => setIsLogin(false)}>
          Signup
        </button>
      </div>
      <div className="form">
        {isLogin ? (
          <>
            <h2>Login Form</h2>
            <form action="" onSubmit={handleLogin} >
              <input type="email" placeholder="Email" name="email" autoFocus onChange= {handleChange} value={loginInfo.email}/>
              <input type="password" placeholder="Password" name="password" onChange= {handleChange} value={loginInfo.password} />
              <div className="fp"><a href="#">Forgot Password ?</a></div>
              <button type='submit' className="btn">Login</button>
              <p>
                Do not have account ? <a href="#" onClick={()=>setIsLogin(false)}>Signup</a>
              </p>
            </form>
          </>
        ) : (
          <>
          <h2>Signup Form</h2>
            <form action="" onSubmit = {handleSignup}>
              <input type="email" placeholder="Email" name="email" onChange={handleChangeSignup} value={signupInfo.email} />
              <input type="password" placeholder="Password" name="password" onChange={handleChangeSignup} value={signupInfo.password} />
              <input type="password" placeholder="Confirm password" name="confirmPassword" onChange={handleChangeSignup} value={signupInfo.confirmPassword} />
              <button type='submit' className="btn">Signup</button>
              <p>
                Already have an account ? <a href="#" onClick={()=>setIsLogin(true)}>Login</a>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Authform;
