import React from 'react';
import { Layout, Button, Row, Col } from "antd";

import Container from "../../components/Container";
import TotalAmountSummary from "../../components/Receipt/TotalAmountSummary";
import pathname from "../../pathnameCONFIG";

const { Footer } = Layout;

const ReceiptScreen = () => {
    return (
        <>
            <Container title="Receipt" subtitle="Summary of your transaction">
                <TotalAmountSummary />
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
                                // width: 100,
                            }}
                            size="large"
                            onClick={() => {
                                window.location.assign(pathname.dashboard);
                            }}
                        >
                            Back to Home
                        </Button>
                    </Col>
                </Row>
            </Footer>
        </>
    );
};

ReceiptScreen.propTypes = {

};

export default ReceiptScreen;
