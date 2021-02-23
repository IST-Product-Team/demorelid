import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Col, Row, Button, message } from "antd";

import LoginBanner from "../../assets/images/LoginBanner.png";
import EmailField from "../../components/InputField/EmailField";
import TwoFactorAuthModal from '../../components/Modal/TwoFactorAuthModal';
import requestApi from "../../services/index";
import pathname from "../../pathnameCONFIG"

import "./LoginScreen.css";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [buttonDisable, setButtonDisable] = useState(true);
    const [errorEmail, setErrorEmail] = useState(false);
    const [helperTextEmail, setHelperTextEmail] = useState(null);
    const [visible, setVisible] = useState(false);
    const [counterStatus, setCounterStatus] = useState(false);

    useEffect(() => {
        if (email !== "") {
            setButtonDisable(false);
            setHelperTextEmail(null);
        } else {
            setButtonDisable(true);
        }
    }, [email]);

    useEffect(() => {
        let timer
        if (counterStatus === true) {
            handleGetStatus()
            timer = window.setInterval(function () {
                handleGetStatus()
            }, 5000);

            setTimeout(() => {
                window.clearInterval(timer);
                message.error('request timeout');
            }, 60000);
        } else {
            window.clearInterval(timer);
        }
    }, [counterStatus]);

    const handleEmailChange = (value) => {
        setEmail(value.target.value);
    };

    const handleLogin = (value) => {
        requestApi
            .generateRVN(email)
            .then((res) => {
                console.log('nyoo cek response', res)
                setCounterStatus(true);
            }).catch((err) => {
                message.error(err.data.error_message);
                console.log('nyoo cek error', res)
            });
    };

    const handleGetStatus = (value) => {
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
