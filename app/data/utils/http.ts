import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const request = axios.create()

export const setupHttpConfig = () => {
    request.defaults.baseURL = "http://192.168.1.5:8080"
    request.defaults.timeout = 5000
    request.defaults.headers["Content-Type"] = "application/json";
    request.interceptors.request.use(
        async config => {
            const token = await AsyncStorage.getItem("ACCESS_TOKEN")
            if (token) {
                config.headers['Authorization'] = token
                config.headers["Content-Type"] = "application/json";
                config.headers["Accept"] = "application/json";
            }
            return config
        },
        error => {
            return Promise.reject(error)
        }
    );
}