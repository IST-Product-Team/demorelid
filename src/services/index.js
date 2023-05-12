import axios from 'axios';

const generateRvn = `${process.env.REACT_APP_GENERATE_RVN}`;
const getStatusRvn = `${process.env.REACT_APP_GET_STATUS_RVN}`;

const request = {};

request.generateRVN = (requestData, deviceInfo, position) => {
  console.log(position);
  console.log(requestData);
  const msg_Json = {
    message: `Anda sedang mengakses internet bangking dengan browser: ${deviceInfo.browserName} di ${deviceInfo.osName} dengan ip: ${deviceInfo.ip} dan latitude ${position.latitude}, longitude ${position.longitude}`,
    ip: deviceInfo.ip,
    latitude: position.latitude,
    longitude: position.longitude,
    deviceBrowser: deviceInfo.browserName,
    deviceOs: deviceInfo.osName,
  };
  return new Promise((resolve, reject) => {
    const headers = {
      Authorization: 'Basic ZGV2ZW50ZXJwcmlzZTozZXRqY2Q=',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    };
    axios
      .post(
        `http://localhost:3000/api/v1/relid`,

        {
          msg_id: '1234567890',
          enterprise_id: 'deventerprise',
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
              message: JSON.stringify(msg_Json),
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
        },
        { headers }
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

request.generateRVNTransfer = (
  requestData,
  deviceInfo,
  position,
  formattedAmount
) => {
  console.log(position);
  console.log(requestData);
  const msg_Json = {
    message: `You Have Request Transfer With Amount ${formattedAmount} on browser: ${deviceInfo.browserName} at ${deviceInfo.osName} with ip: ${deviceInfo.ip}and latitude ${position.latitude}, longitude ${position.longitude}`,
    ip: deviceInfo.ip,
    latitude: position.latitude,
    longitude: position.longitude,
    deviceBrowser: deviceInfo.browserName,
    deviceOs: deviceInfo.osName,
    amount: formattedAmount,
  };
  return new Promise((resolve, reject) => {
    const headers = {
      Authorization: 'Basic ZGV2ZW50ZXJwcmlzZTozZXRqY2Q=',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    };
    axios
      .post(
        `http://localhost:3000/api/v1/relid`,

        {
          msg_id: '1234567890',
          enterprise_id: 'deventerprise',
          user_id: requestData,
          expires_in: 180,
          notification_msg: {
            message: 'You have a Transfer  verify notification',
            subject: 'REL-IDverify notification',
          },
          msg: [
            {
              lng: 'English',
              subject: deviceInfo.status,
              message: JSON.stringify(msg_Json),
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
        },
        { headers }
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

request.generateRVNCashWithdrawal = (
  requestData,
  deviceInfo,
  position,
  formattedAmount
) => {
  console.log(position);
  console.log(requestData);
  console.log(formattedAmount);

  const msg_Json = {
    message: `You Have Request Cash WithDrawal Without Using ATM CARD With Amount ${formattedAmount} and browser: ${deviceInfo.browserName} at ${deviceInfo.osName} with ip: ${deviceInfo.ip}and latitude ${position.latitude}, longitude ${position.longitude}`,
    ip: deviceInfo.ip,
    latitude: position.latitude,
    longitude: position.longitude,
    deviceBrowser: deviceInfo.browserName,
    deviceOs: deviceInfo.osName,
    amount: formattedAmount,
  };
  return new Promise((resolve, reject) => {
    const headers = {
      Authorization: 'Basic ZGV2ZW50ZXJwcmlzZTozZXRqY2Q=',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    };
    axios
      .post(
        `http://localhost:3000/api/v1/relid`,

        {
          msg_id: '1234567890',
          enterprise_id: 'deventerprise',
          user_id: requestData,
          expires_in: 180,
          notification_msg: {
            message: 'You have a Transfer  verify notification',
            subject: 'REL-IDverify notification',
          },
          msg: [
            {
              lng: 'English',
              subject: deviceInfo.status,
              message: JSON.stringify(msg_Json),
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
        },
        { headers }
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

request.getRVNStatus = (requestData) => {
  // let reqData = {};

  return new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:3000/api/v1/relid/${requestData}`, {
        headers: {
          Authorization: 'Basic ZGV2ZW50ZXJwcmlzZTozZXRqY2Q=',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export default request;
