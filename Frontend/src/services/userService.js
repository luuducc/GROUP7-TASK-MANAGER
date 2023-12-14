
import axios from 'axios';

const loginAPI = (email, password)  => {
    return axios.post("http://localhost:3001/auth/login", { email, password})
}

const registerAPI = ( username, email, password) => {
    return axios.post("http://localhost:3001/auth/register", {email, username, password})
}

export { loginAPI, registerAPI }