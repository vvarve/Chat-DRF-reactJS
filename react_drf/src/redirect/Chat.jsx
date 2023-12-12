import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { set, useForm } from "react-hook-form"
import { usersGet, chatsGet, chatsPost, refreshT} from "../js/request_json"

export const Chat = () => {
const Navigate = useNavigate()
const [len, setLen] = useState(0)
const [file, setFile] = useState(false)
const [image, setImage] = useState(false)
const [write, setWrite] = useState(false)
const verify = jwtDecode(localStorage.getItem("auth"))
const [names, setNames] = useState([])
const [ids, setIds] = useState(0)
const [chats, setChats] = useState([])
const {register, handleSubmit} = useForm()
let into = []

const out = () => {
    refreshT()
    localStorage.clear()
    Navigate("/login/")
}


const read = (e) => {
    if (e.target.value.length <= 300){
        setLen(e.target.value.length)
    }      
}

const images = (upload) => {
    if (upload.target.value){
        setImage(true)
        setFile(false)
        document.getElementById("file").value = ""
        document.getElementById("message").value = ""
        setLen(0)
    }      
}

const files = (upload) => {
    if (upload.target.value){
        setImage(false)
        setFile(true)
        document.getElementById("image").value = ""
        document.getElementById("message").value = ""
        setLen(0)
    }      
}


const closeInput = () => {
    setImage(false)
    setWrite(false)
    setFile(false)
    document.getElementById("image").value = ""
    document.getElementById("message").value = ""
    document.getElementById("file").value = ""
    setLen(0)
}


const clUser = async (date) => {
    setIds(date)
    if (verify.id !== date) {
        const res = await (await chatsGet(verify.id, date)).data
        into = into.concat(res)
        const restwo = await (await chatsGet(date, verify.id)).data
        into = into.concat(restwo)
        into.sort(function (a, b) {return a.id - b.id})
        setChats(into)
        
    }else {
        const res = await (await chatsGet(verify.id, date)).data
        setChats(res)
    }
    setIds(date)
    closeInput()
    
} 


const MessageA = ({text, hour}) => {

    return(
            <div className="chat-inside"><p className="p">{text}</p><div className="hour"><p>{hour}</p></div></div>
)}

const MessageB = ({text, hour}) => {
    return(
            <div className="chat-inside2"><p className="p">{text}</p><div className="hour"><p>{hour}</p></div></div>
)}

const MessageFa = ({text, view, hour}) => {

    return(
            <div className="chat-inside-file"><span></span><a href={view}>{text}.exe</a><div className="hour"><p>{hour}</p></div></div>
)}

const MessageIa = ({text, view, hour}) => {

    return(
            <div className="chat-inside-image"><img src={view} alt="photo" /><p>{text}</p><div className="hour"><p>{hour}</p></div></div>
)}


const MessageFb = ({text, view, hour}) => {

    return(
            <div className="chat-inside-file2"><span></span><a href={view}>{text}.exe</a><div className="hour"><p>{hour}</p></div></div>
)}

const MessageIb = ({text, view, hour}) => {

    return(
            <div className="chat-inside-image2"><img src={view} alt="photo" /><p>{text}</p><div className="hour"><p>{hour}</p></div></div>
)}

const User = ({textu, userId}) => {
    return(
                <div onClick={() => {clUser(userId)}} className="User">   
                    <img alt="profile" className="User-image"/>
                    <strong>{textu}</strong>
                </div>)
}

    useEffect (()=>{
        async function getUsers() {
            const res = await usersGet()
            setNames(res.data)
        }
        if(ids > 0) {
            clUser(ids)
        }
        getUsers()

    }, [])

const upForm = handleSubmit(async date => {
    await chatsPost(date.message, date.file[0], date.image[0], verify.id , ids)
    clUser(ids)
})
    
if (verify.token_type == "refresh"){

    

    register("message", { 
        onChange: (e) => 
            setLen(e.target.value.length)
    })

    register("file", { 
        onChange: (e) =>
            files(e)
    })

    register("image", { 
        onChange: (e) =>
            images(e)
    })



    if (ids > 0){
        return (
            <div className="div-chat-1">
                <div className="div-users">    
                    {names.map(name =>(
                        <User key={name.user} userId={name.id} textu={name.username_id}/>
                    ))}
                </div>
    
                <div className="div-chat">
    
                    {
                        image &&   
                        <div className="image-change"> 
                            <span className="image-image"></span>
                            <span className="span-file">image uploaded!</span>
                            <span onClick={closeInput} className="e-x">x</span>
                        </div>
                    }
    
                    {
                        file &&   
                        <div className="folder-change"> 
                            <span className="folder-folder"></span>
                            <span className="span-file">file uploaded!</span>
                            <span onClick={closeInput} className="e-x">x</span>
                        </div>
                    }
    
                    <div className="chats">
                        {chats.map((item) => {
                            if (chats.length > 0) {
                                if (verify.id === item.user_one) {
                                    if (item.files) {
                                        return <MessageFa key={item.id} text={item.text} view={item.files} hour={item.date}/>
                                    } else if (item.images) {
                                        return  <MessageIa  key={item.id} text={item.text} view={item.images} hour={item.date}/> 
                                    } else {
                                        return  <MessageA key={item.id} text={item.text} hour={item.date}/> 
                                    }
                                } else {
                                    if (item.files) {
                                        return <MessageFb key={item.id} text={item.text} view={item.files} hour={item.date}/>
                                    } else if (item.images) {
                                        return  <MessageIb key={item.id} text={item.text} view={item.images} hour={item.date}/> 
                                    } else {
                                        return <MessageB  key={item.id} text={item.text} hour={item.date}/>
                                    }
                                }}
                        })}
                    </div>
    
                    <form onSubmit={upForm} className="form-chat" id="o">
    
                        <div>
                            <span className="ico-file"></span>
                            <input onChange={files} type="file" name="file" id="file" {...register("file")}/>
                            <span className="ico-image"></span>
                            <input onChange={images} type="file" name="image" id="image" accept="image/*" {...register("image")} />
                        </div>
    
                            <textarea onChange={read} disabled={write} name="message" form="o" id="message" cols="30" rows="10" minLength={1} maxLength={300} {...register("message", {required: true})}></textarea>  
                            <p>{len}/300</p>
                            <button className="btn-form">send</button>
                    </form>
                        
    
                </div>

                <div className="logout">
                    <button onClick={out} className="logout-btn">logout</button>
                </div>
    
            </div>)
    } else{
        return (
            <div className="div-chat-1">
                <div className="div-users">    
                    {names.map(name =>(
                        <User key={name.user} userId={name.id} textu={name.username_id}/>
                    ))}
                </div>
    
                <div className="div-chat">
    
                    {
                        image &&   
                        <div className="image-change"> 
                            <span className="image-image"></span>
                            <span className="span-file">image uploaded!</span>
                            <span onClick={closeInput} className="e-x">x</span>
                        </div>
                    }
    
                    {
                        file &&   
                        <div className="folder-change"> 
                            <span className="folder-folder"></span>
                            <span className="span-file">file uploaded!</span>
                            <span onClick={closeInput} className="e-x">x</span>
                        </div>
                    }
    
                    <div className="chats">
                        <MessageA text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."   />
                        <MessageB text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."  />
                        <MessageA text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."   />
                        <MessageB text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."  />
                    </div>
    
                    <form className="form-chat" method="post" id="o">
    
                        <div>
                            <span className="ico-file"></span>
                            <input onChange={files} type="file" name="file" id="file"/>
                            <span className="ico-image"></span>
                            <input onChange={images} type="file" name="file" id="image"/>
                        </div>
    
                            <textarea onChange={read} disabled={write} name="message" form="o" id="message" cols="30" rows="10" minLength={1} maxLength={300}></textarea>  
                            <p>{len}/300</p>
                            <button disabled={true} className="btn-form">send</button>
                    </form>
                </div>
                <div className="logout">
                    <button onClick={out} className="logout-btn">logout</button>
                </div>
            </div>
            
            
)}


} else {
    Navigate("/login/")
}}


