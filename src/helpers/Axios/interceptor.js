import axios from "axios";
import SecureStorage from "../SecureStorage";

axios.interceptors.request.use(
    request => {
        try {
            const token = SecureStorage.getItem("credentials").access_token;
            if (token !== null) {
                request.headers.Authorization = `Bearer ${token}`;
                request.timeout = 60 * 1000;
            }
        } catch (e) {
            return Promise.reject(e);
        }

        return request;
    },
    error => {
        return error;
    }
);

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);
