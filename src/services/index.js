import axios from "axios";

const generateRvn = `${process.env.REACT_APP_GENERATE_RVN}`;
const getStatusRvn = `${process.env.REACT_APP_GET_STATUS_RVN}`;

const request = {};

request.generateRVN = (requestData, deviceInfo) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${generateRvn}/generateRVN.htm`, {
                msg_id: "1234567890",
                enterprise_id: "istimplenterprise",
                user_id: requestData,
                expires_in: 180,
                notification_msg: {
                    message: "You have a REL-IDverify notification", //detail: ip apa dan device dan browser apa
                    subject: "REL-IDverify notification" //activiti : login/transfer
                },
                msg: [{
                    lng: "English",
                    subject: deviceInfo.status,
                    message: `anda sedang mengakses internet bangking dengan browser: ${deviceInfo.browserName} di ${deviceInfo.osName} dengan ip: ${deviceInfo.ip}`,
                    label: {
                        "Accept": "Approve",
                        "Reject": "Disapprove"
                    }
                },
                ],
                actions: [{
                    label: "Accept",
                    action: "Approved"
                },
                {
                    label: "Reject",
                    action: "Disapproved"
                }
                ]
            })
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error.response);
            });
    });
};

request.getRVNStatus = requestData => {
    let reqData = {};

    return new Promise((resolve, reject) => {
        axios
            .get(`${getStatusRvn}/getRVNStatus.htm/${requestData}`, reqData)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error.response);
            });
    });
};

export default request;
