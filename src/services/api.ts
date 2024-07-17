import axios from "axios";

const api = axios.create({
    baseURL: 'https://node-user-register-api.onrender.com'
})

export default api;