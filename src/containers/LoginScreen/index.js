import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Col, Row, Button, message } from "antd";
import Countdown from "react-countdown-now";

import LoginBanner from "../../assets/images/LoginBanner.png";
import EmailField from "../../components/InputField/EmailField";
import TwoFactorAuthModal from '../../components/Modal/TwoFactorAuthModal';
import requestApi from "../../services/index";

import "./LoginScreen.css";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [buttonDisable, setButtonDisable] = useState(true);
    const [errorEmail, setErrorEmail] = useState(false);
    const [helperTextEmail, setHelperTextEmail] = useState(null);
    const [visible, setVisible] = useState(false);

    const validateEmail = (value) => {
        const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(value) && value.trim().length !== 0) {
            setErrorEmail(true);
            setHelperTextEmail('The format of this email is incorrect.');
            setButtonDisable(true);
        } else {
            setErrorEmail(false);
            setHelperTextEmail(null);
            setButtonDisable(false);
        }
    };

    const handleEmailChange = (value) => {
        validateEmail(value.target.value);
        setEmail(value.target.value);
    };

    const handleLogin = (value) => {
        requestApi
            .generateRVN(email)
            .then((res) => {
                <Countdown
                    id={"countdown-checkStatus"}
                    data-test-id="check-status-countdown"
                    date={Date.now() + 5}
                    onComplete={() => {
                        handleGetStatus();
                    }}
                />
                // handleGetStatus();
            }).catch((err) => {
                console.log('nyoo cek error', err);
                message.error(err.data.error_msg);
            });
    };

    const handleGetStatus = (value) => {
        console.log('nyoo sini')
        requestApi
            .getRVNStatus()
            .then((res) => {
                window.location.replace(pathname.dashboard);
            }).catch((err) => {
                console.log('nyoo cek error', err);
            });
    };

    return (
        <>
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
            <TwoFactorAuthModal visible={visible} onClose={() => setVisible(false)} />
        </>
    );
};

function mapStateToProps() {
    return {};
}

export default withRouter(
    connect(mapStateToProps)(withTranslation('translations')(LoginScreen))
);
