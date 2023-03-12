import axios from 'axios';

const generateRvn = `${process.env.REACT_APP_GENERATE_RVN}`;
const getStatusRvn = `${process.env.REACT_APP_GET_STATUS_RVN}`;

const request = {};

request.generateRVN = (requestData, deviceInfo, position) => {
  console.log(position);
  console.log(requestData);
  return new Promise((resolve, reject) => {
    axios
      .post(`https://rel-id.infosyssolusiterpadu.com:8007/generateRVN.htm`, {
        msg_id: '1234567890',
        enterprise_id: 'istimplenterprise',
        user_id: requestData,
        expires_in: 180,
        notification_msg: {
          message: 'You have a REL-ID verify notification',
          subject: 'REL-IDverify notification',
        },
        msg: [
          {
            lng: 'English',
            subject: deviceInfo.status,
            message: `Anda sedang mengakses internet bangking dengan browser: ${deviceInfo.browserName} di ${deviceInfo.osName} dengan ip: ${deviceInfo.ip} dan latitude ${position.latitude}, longitude ${position.longitude}`,
            label: {
              Accept: 'Approve',
              Reject: 'Disapprove',
            },
          },
        ],
        actions: [
          {
            label: 'Accept',
            action: 'Approved',
          },
          {
            label: 'Reject',
            action: 'Disapproved',
          },
        ],
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

request.getRVNStatus = (requestData) => {
  let reqData = {};

  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://rel-id.infosyssolusiterpadu.com:8007/getRVNStatus.htm/${requestData}`,
        reqData
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export default request;
