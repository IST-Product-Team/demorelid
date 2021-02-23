import axios from "axios";
import SecureStorage from "../SecureStorage";

axios.interceptors.request.use(
    request => {
        try {
            // const token = SecureStorage.getItem("credentials").access_token;
            // if (token !== null) {
            //     request.headers.Authorization = `Bearer ${token}`;
            // request.headers.Authorization = `Basic aXN0aW1wbGVudGVycHJpc2U6MjM5ajJx`;
            // request.timeout = 60 * 1000;
            // request.headers.ReferrerPolicy = `origin-when-cross-origin`;
            // request.headers.Access-Control - Allow - Origin: *
            request.headers = {
                'Authorization': `Basic aXN0aW1wbGVudGVycHJpc2U6MjM5ajJx`,
                'ReferrerPolicy': `origin-when-cross-origin`,
                'Access-Control-Allow-Origin': `*`
            }
            // }
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
