import axios from "axios";

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1",
    timeout: 1000,
    headers: { "Content-Type": "application/json" },
});

export default API;
