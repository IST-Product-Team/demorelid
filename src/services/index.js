import axios from "axios";

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

const request = {};

request.generateRVN = requestData => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${baseUrl}/generateRVN.htm`, {
                msg_id: "1234567890",
                enterprise_id: "istimplenterprise",
                user_id: requestData,
                expires_in: 180,
                notification_msg: {
                    message: "You have a REL-IDverify notification",
                    subject: "REL-IDverify notification"
                },
                msg: [{
                    lng: "English",
                    subject: "Login Attempt",
                    message: "You are attempting to login to Netbanking Retail",
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
            .get(`${baseUrl}/getRVNStatus.htm/${requestData}`, reqData)
            .then(res => {
                resolve(res.data);
            })
            .catch(error => {
                reject(error.response);
            });
    });
};

export default request;
