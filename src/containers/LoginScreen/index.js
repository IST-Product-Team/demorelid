import React, { useState, useEffect } from 'react';
import { Col, Row, Button, Modal, Spin } from 'antd';
import LoginBanner from '../../assets/images/LoginBanner.png';
import EmailField from '../../components/InputField/EmailField';
import requestApi from '../../services/index';
import pathname from '../../pathnameCONFIG';
import secureStorage from '../../helpers/SecureStorage';
import localIpUrl from 'local-ip-url';
import { osName, browserName } from 'react-device-detect';
import { geolocated } from 'react-geolocated';

import './LoginScreen.css';

const LoginScreen = (props) => {
  const [email, setEmail] = useState('');
  const [buttonDisable, setButtonDisable] = useState(true);
  const [errorEmail, setErrorEmail] = useState(false);
  const [helperTextEmail, setHelperTextEmail] = useState(null);
  const [counterStatus, setCounterStatus] = useState(false);
  const [notifUuid, setNotifUuid] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState({});

  useEffect(() => {
    fetch('https://api.ipify.org/?format=json')
      .then((response) => {
        return response.json();
      }, 'jsonp')
      .then((res) => {
        console.log(res.ip);
        setDeviceInfo({
          ip: res.ip,
          osName: osName,
          browserName: browserName,
          status: 'Login',
        });
      })
      .catch((err) => {
        console.log(err);
        setDeviceInfo({
          ip: localIpUrl('public', 'ipv4'),
          osName: osName,
          browserName: browserName,
          status: 'Login',
        });
      });
  }, []);

  useEffect(() => {
    if (email !== '') {
      setButtonDisable(false);
      setHelperTextEmail(null);
    } else {
      setButtonDisable(true);
    }
  }, [email]);

  useEffect(() => {
    if (counterStatus === true) {
      handleGetStatus(notifUuid);
      setTimer(
        setInterval(function () {
          handleGetStatus(notifUuid);
        }, 5000)
      );
    } else {
      clearInterval(timer);
    }
  }, [counterStatus]);

  const handleEmailChange = (value) => {
    setEmail(value.target.value);
  };
  const handleLoginPortal = () => {
    if (email !== '') {
      // Redirect to portal page
      window.location.replace(pathname.portal);
    } else {
      alert('Please enter your email');
    }
  };
  const handleLogin = (value) => {
    setLoading(true);
    requestApi
      .generateRVN(email, deviceInfo, props.coords)
      .then((res) => {
        console.log('nyoo cek response', res);
        if (res?.data?.response_code !== 0) {
          Modal.error({
            title: res.error_msg,
          });
        } else {
          setNotifUuid(res?.data?.notification_uuid);
          setCounterStatus(true);
        }
      })
      .catch((err) => {
        console.log('nyoo cek error', err);
        setLoading(false);
        Modal.error({
          title: err?.data?.error_msg,
        });
      });
  };

  const handleGetStatus = (value) => {
    requestApi
      .getRVNStatus(value)
      .then((res) => {
        if (
          res?.data?.status === 'UPDATED' &&
          res?.data?.action_response === 'Approve'
        ) {
          secureStorage.setItem('userId', email);
          window.location.replace(pathname.dashboard);
        } else if (
          res?.data?.status === 'UPDATED' &&
          res?.data?.action_response === 'Disapprove'
        ) {
          setLoading(false);
          setCounterStatus(false);
          Modal.error({
            title: res?.data?.action_response,
          });
        } else if (
          res?.data?.status === 'ACTIVE' &&
          res?.data?.action_response === 'NONE'
        ) {
          console.log('nyoo cek waiting', res);
        } else {
          setLoading(false);
          setCounterStatus(false);
          Modal.error({
            title: res?.data?.status,
          });
        }
      })
      .catch((err) => {
        console.log('nyoo cek error', err);
      });
  };

  return !props.isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
  ) : !props.isGeolocationEnabled ? (
    <div>Geolocation is not enabled</div>
  ) : props.coords ? (
    <Spin tip="Loading..." spinning={loading}>
      <Row>
        <Col span={12} style={{ height: '100vh' }}>
          <img src={LoginBanner} className="banner" alt="Banner Login" />
        </Col>
        <Col span={12} className="login-layout">
          <div>
            <div className="login-title">Log In</div>
            <div className="login-subtitle">
              Please login to your account to continue
            </div>
            <div style={{ marginTop: '15px' }}>
              <div className="input-title">Username</div>
              <br />
              <EmailField
                id={'email'}
                className="input-field"
                placeholder="Enter username"
                value={email}
                onChange={handleEmailChange}
                helperText={helperTextEmail !== null ? helperTextEmail : null}
                error={errorEmail}
              />

              <Button
                className="login-button"
                onClick={() => {
                  handleLogin();
                  //handleGetStatus();
                }}
                disabled={buttonDisable}
              >
                Sign In
              </Button>

              <Button
                className="dashboard-button"
                onClick={() => {
                  handleLoginPortal();
                }}
                disabled={buttonDisable}
              >
                Login to Portal MFA
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Spin>
  ) : (
    <div>Getting the location data&hellip; </div>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 50000,
})(LoginScreen);
