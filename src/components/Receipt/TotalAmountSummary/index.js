import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Tag, Divider } from "antd";

import './TotalAmountSummary.css';

const TotalAmountSummary = props => {
    return (
        <div style={{
            margin: 5
        }}>
            <Row>
                <Col span={8}>
                    <div className="account-info-container">
                        <span className="account-info-title">Source of Fund</span>
                        <span className="account-info-detail">
                TEST-ACCOUNT *********123
                        </span>
                    </div>
                </Col>
                <Col span={8}>
                    <div className="invoice-info-container">
                        <span className="invoice-info-title">Payment for</span>
                        <span className="invoice-info-detail">X Product</span>
                    </div>
                </Col>
                <Col
                    span={8}
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <div className="invoice-summary-container">
                        <span
                            className="invoice-summary-title"
                            style={{
                                textAlign: 'end',
                            }}
                        >
                Total
                        </span>
                        <Row>
                            <Col span={12} />
                            <Col
                                span={12}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <span className="invoice-summary-amount">IDR 200,000.-</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Tag color="#FF7950"> + admin fee </Tag>
                            </Col>
                            <Col
                                span={12}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <span className="invoice-summary-amount">IDR 2,000.-</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Tag color="#FF7950"> + registration fee </Tag>
                            </Col>
                            <Col
                                span={12}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <span className="invoice-summary-amount">IDR 1,000.-</span>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col span={8} />
                <Col span={8}>
                    <span className="invoice-summary-title">Total</span>
                </Col>
                <Col
                    span={8}
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <span className="invoice-summary-amount">IDR 203,000.-</span>
                </Col>
            </Row>
        </div>
    );
};

TotalAmountSummary.propTypes = {

};

export default TotalAmountSummary;
