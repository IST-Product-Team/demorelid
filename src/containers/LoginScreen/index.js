import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Col, Row, Input, Checkbox, Button } from "antd";

import LoginBanner from "../../assets/images/banner.svg"

import "./LoginScreen.css"

const LoginScreen = () => {
    return (
        <Row>
            <Col span={12} style={{ height: "100vh" }}>
                <img src={LoginBanner} className="banner" />
            </Col>
            <Col span={12} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div>
                    <div style={{ fontFamily: "Overpass", fontWeight: "800", fontSize: "50px", color: "#2A324D" }}>
                        Log In
                    </div>
                    <div style={{ fontFamily: "Overpass", fontSize: "20px", color: "#2A324D" }}>
                        Please login to your account to continue
                    </div>
                    <div style={{ marginTop: "15px" }}>
                        <div className="input-title">
                            Email
                        </div>
                        <Input
                            id={"email"}
                            className="input-field"
                            // value={budget}
                            placeholder="Enter your email"
                            onChange={e => console.log('nyoo', e)}
                        />
                        <div className="input-title" style={{ marginTop: "25px" }}>
                            Password
                        </div>
                        <Input.Password
                            id={"password"}
                            className="input-field"
                            // value={budget}
                            placeholder="Enter your password"
                            onChange={e => console.log('nyoo', e)}
                        />
                        <Row style={{ marginTop: "17px" }}>
                            <Col span={12}>
                                <Checkbox
                                // onChange={onChangeMemorandum}
                                // checked={props.termAndConditions.memorandum}
                                // disabled={disableMemorandum}
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

                        <Button className="login-button">
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
