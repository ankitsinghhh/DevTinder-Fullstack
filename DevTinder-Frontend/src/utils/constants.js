//development
// export const BASE_URL =  "http://localhost:7777"

//production
// export const BASE_URL =  "/api"

//making it dynamic so it happens automatically - To host on AWS 
// export const BASE_URL = location.hostname === "localhost" ? "http://localhost:7777" : "/api"
// to host the frontend on vercel and backend on render 
export const BASE_URL = location.hostname === "localhost" ? "https://devtinder-fullstack-backend.onrender.com"