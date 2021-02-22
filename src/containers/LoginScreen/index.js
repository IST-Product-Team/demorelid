import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Col, Row, Input, Checkbox, Button } from "antd";
import localIpUrl from "local-ip-url";

import LoginBanner from "../../assets/images/LoginBanner.png";
import EmailField from "../../components/InputField/EmailField";
import PasswordField from "../../components/InputField/PasswordField";
import TwoFactorAuthModal from '../../components/Modal/TwoFactorAuthModal';

import "./LoginScreen.css";

let enterprise_id = "istimplenterprise";
let expires_in = 150;
let message = "You have initiated a transaction. Kindly approve the same";
let msg_subject = "Transaction Approval";
let notification_msg_body = "You have a RELIDverify notification";
let notification_msg_subject = "RELIDverify notification";
let base_URL = "https://rel-id.infosyssolusiterpadu.com:8007/DemoVerify/";

// let creds = "ZGVtb3VzZXI6ZGVtb3Bhc3N3b3Jk";
let creds = "aXN0aW1wbGVudGVycHJpc2U6MjM5ajJx";
let ds_required = true;
let notifyCheck = 5000;
let buttons = ["Accept", "Reject"];


const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [, setRememberUser] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(true);
    const [errorEmail, setErrorEmail] = useState(false);
    const [helperTextEmail, setHelperTextEmail] = useState(null);
    const [ip, setIp] = useState("");
    const [visible, setVisible] = useState(false);

    const validateEmail = (value) => {
        // eslint-disable-next-line no-useless-escape
        const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(value) && value.trim().length !== 0) {
            setErrorEmail(true);
            setHelperTextEmail('The format of this email is incorrect.');
        } else {
            setErrorEmail(false);
            setHelperTextEmail(null);
        }
    };

    const handleEmailChange = (value) => {
        validateEmail(value.target.value);
        setEmail(value.target.value);
    };

    const handlePasswordChange = (value) => {
        setPassword(value.target.value);
    };

    useEffect(() => {
        setIp(localIpUrl('public', 'ipv4'));
    }, []);

    useEffect(() => {
        email !== ""
            ? setButtonDisable(false)
            : setButtonDisable(true);
    }, [email, password]);

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
                            <Row style={{ marginTop: "17px" }}>
                                <Col span={12}>
                                </Col>
                                <Col span={12}>
                                    <div className="forgot-password">
                                        Forgot Password?
                                    </div>
                                </Col>
                            </Row>

                            <Button
                                className="login-button"
                                onClick={() => {
                                    setVisible(true);
                                    // window.location.replace(pathname.dashboard);
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
