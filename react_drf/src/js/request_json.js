import axios from "axios";

export const message = async (username, password) => {
await axios.post("http://localhost:8000/login/", {
    username: String(username),
    password: String(password)
  })
  .then(function (response) {
    localStorage.setItem("auth", response.data.refresh)
    localStorage.setItem("auth0", response.data.access)
  })
}

export const refreshT = async () => {
await axios.post("http://localhost:8000/refresh/", {
    refresh: localStorage.getItem('auth')
  })
}

export const usersGet = () => {
  return axios.get("http://localhost:8000/api/users/", {headers: {
    Authorization: 'Bearer ' + localStorage.getItem('auth0'), 
    'Content-Type': 'application/json' 
  }}
)}

export const usersPost = async (username_id, user) => {
  await axios.post("http://localhost:8000/api/users/", {
  username_id: username_id,
  active: null,
  user: user
  },
  {headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('auth0'), 
    'Content-Type': 'application/json'
  }}
)}


export const chatsGet = async (user_one, user_two) => {
  return await axios.get(`http://localhost:8000/api/chats/?user_one=${user_one}&user_two=${user_two}`,
  {headers: {
    Authorization: 'Bearer ' + localStorage.getItem('auth0'), 
    'Content-Type': 'application/json' 
  }}
)} 

export const chatsPost = async (text, files, images, user_one, user_two) => {
      await axios.post("http://localhost:8000/api/chats/", {
      text: text,
      files: files,
      images: images,
      user_one: user_one,
      user_two: user_two
    },
    {headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('auth0'), 
      'Content-Type': 'multipart/form-data'
    }}
)}