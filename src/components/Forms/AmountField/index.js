import React from 'react';
import { Row, Col, Tag} from "antd";
import Proptypes from 'prop-types';
import AmountCurrencyField from '../../InputField/AmountCurrencyField';

const AmountField = props => {
    const {errors, values} = props;
    return (
        <Row>
            <Col
                span={4}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Row style={{
                    width: '100%'
                }}>
                    <Col
                        span={6}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent:'center'
                        }}
                    >
                        <Tag
                            id="number-label-1"
                            color={
                                !errors.amount && values.amount !== ''
                                    ? '#FF7950'
                                    : '#e0e0e0'
                            }
                            className="step-form"
                            style={{ marginRight: '5%', borderRadius: '50px' }}
                        >
                            {1}
                        </Tag>
                    </Col>
                    <Col span={12}>
                        <span
                            style={{
                                fontSize: '20px',
                                color: '#2A324D',
                            }}
                        >
                Amount :
                        </span>
                    </Col>
                </Row>
            </Col>
            <Col span={6} />
            <Col span={14}>
                <AmountCurrencyField placeholder="Insert Amount" {...props} />
            </Col>
        </Row>
    );
};

AmountField.propTypes = {
    errors: Proptypes.shape({
        amount: Proptypes.string,
    }).isRequired,
    values: Proptypes.shape({
        amount: Proptypes.string,
    }).isRequired,
};

export default AmountField;
