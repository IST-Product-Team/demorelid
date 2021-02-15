import React from 'react';
import { Layout, Row, Col, Button } from 'antd';

import Container from "../../components/Container";
import TwoFactorAuthField from "../../components/InputField/TwoFactorAuthField";

const { Footer } = Layout;

const TwoFactorAuthScreen = () => {
    return (
        <>
            <Container
                title="Two-Factor Authentification"
                subtitle="Please enter 6 digits code sent to your phone"
            >
                <TwoFactorAuthField />
            </Container>
            <Footer
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 255,
                    right: 0,
                    backgroundColor: '#ffffff',
                    height: 64,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Row>
                    <Col span={12} />
                    <Col
                        span={12}
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Button
                            className="submit-button"
                            type="primary"
                            style={{
                                height: 50,
                                width: 100,
                            }}
                            disabled={false}
                            size="large"
                        >
                Submit
                        </Button>
                    </Col>
                </Row>
            </Footer>
        </>
    );
};

TwoFactorAuthScreen.propTypes = {

};

export default TwoFactorAuthScreen;
