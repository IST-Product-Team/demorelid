import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Col, Row, Button, Modal, Spin } from "antd";

import LoginBanner from "../../assets/images/LoginBanner.png";
import EmailField from "../../components/InputField/EmailField";
import requestApi from "../../services/index";
import pathname from "../../pathnameCONFIG";
import secureStorage from "../../helpers/SecureStorage";

import "./LoginScreen.css";

const LoginScreen = () => {
    const [modal, contextHolder] = Modal.useModal();

    const [email, setEmail] = useState("");
    const [buttonDisable, setButtonDisable] = useState(true);
    const [errorEmail, setErrorEmail] = useState(false);
    const [helperTextEmail, setHelperTextEmail] = useState(null);
    const [counterStatus, setCounterStatus] = useState(false);
    const [notifUuid, setNotifUuid] = useState(null);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        if (email !== "") {
            setButtonDisable(false);
            setHelperTextEmail(null);
        } else {
            setButtonDisable(true);
        }
    }, [email]);

    useEffect(() => {
        if (counterStatus === true) {
            handleGetStatus(notifUuid)
            setTimer(setInterval(function () {
                handleGetStatus(notifUuid)
            }, 5000));
        } else {
            clearInterval(timer);
        }
    }, [counterStatus]);

    const handleEmailChange = (value) => {
        setEmail(value.target.value);
    };

    const handleLogin = (value) => {
        setLoading(true);
        requestApi
            .generateRVN(email)
            .then((res) => {
                console.log('nyoo cek response', res)
                if (res.response_code !== 0) {
                    Modal.error({
                        title: res.error_msg
                    });
                } else {
                    setNotifUuid(res.notification_uuid);
                    setCounterStatus(true);
                }
            }).catch((err) => {
                console.log('nyoo cek error', err)
                setLoading(false);
                Modal.error({
                    title: err.data.error_msg
                });
            });
    };

    const handleGetStatus = (value) => {
        requestApi
            .getRVNStatus(value)
            .then((res) => {
                if (res.status === "UPDATED" && res.action_response === "Approved") {
                    secureStorage.setItem("userId", email)
                    window.location.replace(pathname.dashboard);
                } else if (res.status === "UPDATED" && res.action_response === "Disapproved") {
                    setLoading(false);
                    setCounterStatus(false);
                    Modal.error({
                        title: res.action_response
                    });
                } else if (res.status === "ACTIVE" && res.action_response === "NONE") {
                    console.log('nyoo cek waiting', res);
                } else {
                    setLoading(false);
                    setCounterStatus(false);
                    Modal.error({
                        title: res.status
                    });
                }
            }).catch((err) => {
                console.log('nyoo cek error', err);
            });
    };

    return (
        <Spin tip="Loading..." spinning={loading}>
            <Row>
                <Col span={12} style={{ height: "100vh" }}>
                    <img src={LoginBanner} className="banner" alt="Banner Login" />
                </Col>
                <Col span={12} className="login-layout">
                    <div>
                        <div className="login-title">
                            Log In
                        </div>
                        <div className="login-subtitle">
                            Please login to your account to continue
                    </div>
                        <div style={{ marginTop: "15px" }}>
                            <div className="input-title">
                                Username
                        </div>
                            <br />
                            <EmailField
                                id={"email"}
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
                                    // handleGetStatus();
                                }}
                                disabled={buttonDisable}
                            >
                                Sign In
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Spin>
    );
};

function mapStateToProps() {
    return {};
}

export default withRouter(
    connect(mapStateToProps)(withTranslation('translations')(LoginScreen))
);
