import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { message } from "./js/request_json";
import { jwtDecode } from "jwt-decode";
import "./styles/one.css"
import { useState } from "react";


export const LogIn = () => {
localStorage.clear()
const [view, setView] = useState(false)
const navigate = useNavigate()
const {register, handleSubmit, formState: {errors}} = useForm()

    //Here submit and redirect to other page
const send = handleSubmit( async (data)=>{
 
  try {
    
      if (data){
          await message(data.username, data.password)
          const parse = jwtDecode(localStorage.getItem("auth"))
          
          if (parse.token_type == "refresh"){
            navigate("/entry")
          }else{
          localStorage.clear()
          navigate("/")
          }
    }
  } catch(error){
    setView(true)
  }

})
    return(
        <main className="main">
        <div className="div-login">
          
          <div className="div-login-2">
            <h1 className="h1-login">Sign in</h1>
            <form className="div-login-form" onSubmit={send}>

              <label htmlFor="username">Username</label>

              <input className="input-username" type="text" name="username" {...register("username", {required : true})}/>
              {errors.username && <span>username required</span>}
              <label  htmlFor="password">Password</label>

              <input className="input-pass" type="password" name="password" {...register("password", {required : true})}/>
              {errors.password && <span>password required</span>}
              
              <button className="btn-login">Sign in</button>
              {view && <span id="login_error">username or password invalid!</span>}
            </form>
          </div>
        </div>
      </main>
    )
} 