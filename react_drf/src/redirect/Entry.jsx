import { jwtDecode } from "jwt-decode"
import { useForm } from "react-hook-form"
import { redirect, useNavigate } from "react-router-dom"
import { usersGet, usersPost} from "../js/request_json"
import { useEffect, useState } from "react"

export const Entry = () => {
const navigate = useNavigate()
const [view, setView] = useState(false)
const {handleSubmit, formState: {errors}, register} = useForm()
const [us, setUs] = useState(0) // catch id
const verify = jwtDecode(localStorage.getItem("auth")) // verify token with formules or const inside ENTRY

    useEffect (()=>{
        async function getUsers() {
            const res = await usersGet()
            for (const iterator of res.data) {
                if (iterator.user === verify.user_id){
                    setUs(iterator.user)
                    break
                }  
            } 
        } 
        getUsers()
    }, [])

    const send = handleSubmit( async (data) => {
        try {
            await usersPost(data.usern, verify.user_id)
            navigate("/chat")
        } catch (error) {
            setView(true)
        }
    })

if (verify.token_type === "refresh") {
    
    if (us){
        navigate("/chat")
    }
    else{
        return(
            <div className="div-entry">
                <form className="form-entry" onSubmit={send}>
                    <label htmlFor="usern" className="label-form-entry">USER ID</label>
                    <input defaultValue="User_2" className="input-form-entry" type="text" name="usern" {...register("usern", {required : true})}/>
                    {errors.usern && <span>is neccessary a username for your account!</span>}
                    <button className="btn-form-entry">next</button>
                    {view && <span id="user_error">username already exist!</span>}
                </form>
            </div>
        )
    }
}else{
    navigate("/login")
}
}