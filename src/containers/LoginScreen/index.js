import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Col, Row, Input, Checkbox, Button } from "antd";

import LoginBanner from "../../assets/images/LoginBanner.png";
import EmailField from "../../components/InputField/EmailField";
import PasswordField from "../../components/InputField/PasswordField";
import pathname from "../../pathnameCONFIG";

import "./LoginScreen.css";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberUser, setRememberUser] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(true);
    const [errorEmail, setErrorEmail] = useState(false);
    const [helperTextEmail, setHelperTextEmail] = useState(null);

    const handleEmailChange = (value) => {
        validateEmail(value.target.value);
        setEmail(value.target.value);
    }

    const validateEmail = value => {
        const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(value) && value.trim().length !== 0) {
            setErrorEmail(true);
            setHelperTextEmail("The format of this email is incorrect.");
        } else {
            setErrorEmail(false);
            setHelperTextEmail(null);
        }
    }

    const handlePasswordChange = (value) => {
        setPassword(value.target.value);
    }

    useEffect(() => {
        email !== ""
            && errorEmail !== true
            && password !== ""
            ? setButtonDisable(false)
            : setButtonDisable(true)
    }, [email, password]);

    return (
        <Row>
            <Col span={12} style={{ height: "100vh" }}>
                <img src={LoginBanner} className="banner" />
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
                            Email
                        </div>
                        <EmailField
                            id={"email"}
                            className="input-field"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmailChange}
                            helperText={helperTextEmail !== null ? helperTextEmail : null}
                            error={errorEmail}
                        />
                        <div className="input-title" style={{ marginTop: "25px" }}>
                            Password
                        </div>
                        <PasswordField
                            className="input-field"
                            value={password}
                            placeholder="Enter your password"
                            onChange={handlePasswordChange}
                        />
                        <Row style={{ marginTop: "17px" }}>
                            <Col span={12}>
                                <Checkbox
                                    onChange={(e) => { setRememberUser(e.target.checked) }}
                                >
                                    Remember me
                                </Checkbox>
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
                                window.location.replace(pathname.dashboard);
                            }}
                            disabled={buttonDisable}
                        >
                            Sign In
                        </Button>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

function mapStateToProps() {
    return {};
}

export default withRouter(
    connect(mapStateToProps)(withTranslation('translations')(LoginScreen))
);
