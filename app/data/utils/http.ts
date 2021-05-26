import axios from "axios";

export const request = axios.create()

export const setupHttpConfig = () => {
    request.defaults.baseURL = "http://192.168.43.125:8080"
    request.defaults.timeout = 5000
    axios.defaults.headers["Content-Type"] = "application/json";
}