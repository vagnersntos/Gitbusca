import axios from 'axios'

const service = axios.create({
    baseURL : "https://api.github.com",
});

export default service;
