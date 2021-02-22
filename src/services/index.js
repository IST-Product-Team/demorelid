import axios from "axios";

const baseEndPoint = `${process.env.REACT_APP_BASE_URL}`;

const request = {};

request.generateRVN = requestData => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${baseEndPoint}/generateRVN.htm`, requestData)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

request.getRVNStatus = requestData => {
    let reqData = {};

    return new Promise((resolve, reject) => {
        axios
            .get(`${baseEndPoint}/getRVNStatus.htm/683a2cae-3d06-42b2-ba2c-ae3d0662b216`, reqData)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error);
            });
    });
};

export default request;
