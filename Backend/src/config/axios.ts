import axios from "axios";
import http from 'http'
import https from 'https'

const axiosInstance=axios.create({
    baseURL:process.env.NODE_ENV === "production" ? "https://ml-engineers-salaries.onrender.com/" : "http://localhost:3000",


    httpAgent:new http.Agent({
        keepAlive : true,
        maxSockets:10,
        maxFreeSockets:5,
    }),

    httpsAgent:new https.Agent({
        keepAlive : true,
        maxSockets:10,
        maxFreeSockets:5,
    }),

    timeout:10000,
})

axiosInstance.get("/").then((res)=>{
    console.log(res.data)
} ).catch((err)=>{
    console.log(err)
})