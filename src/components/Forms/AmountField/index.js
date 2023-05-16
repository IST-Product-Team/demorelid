import React from 'react';
import { Row, Col, Input, Tag } from 'antd';
import PropTypes from 'prop-types';
import AmountCurrencyField from '../../InputField/AmountCurrencyField';
const { TextArea } = Input;
const AmountFields = (props) => {
  const { errors, values, nominal } = props;
  return (
    <div>
      <Row style={{ marginBottom: '20px', marginLeft: '0px' }}>
        <Col span={24}>
          <Row>
            <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Tag
                id="number-label-1"
                color={
                  !errors.account && values.account !== ''
                    ? '#FF7950'
                    : '#e0e0e0'
                }
                className="step-form"
                style={{ marginRight: '5%', borderRadius: '50px' }}
              >
                {1}
              </Tag>
              <span
                style={{
                  fontSize: '15px',
                  color: '#2A324D',
                  marginRight: '10px',
                }}
              >
                Account Number:
              </span>
            </Col>
            <Col span={20}>
              <TextArea
                placeholder="Enter account number"
                autoSize={{ minRows: 1, maxRows: 1 }}
                {...props}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Row>
            <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
              <Tag
                id="number-label-2"
                color={
                  !errors.amount && values.amount !== '' ? '#FF7950' : '#e0e0e0'
                }
                className="step-form"
                style={{ marginRight: '5%', borderRadius: '50px' }}
              >
                {2}
              </Tag>
              <span style={{ fontSize: '15px', color: '#2A324D' }}>
                Amount:
              </span>
            </Col>
            <Col span={20}>
              <AmountCurrencyField
                placeholder="Enter amount"
                value={nominal || values.amount}
                {...props}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

AmountFields.propTypes = {
  errors: PropTypes.shape({
    account: PropTypes.string,
    amount: PropTypes.string,
  }).isRequired,
  values: PropTypes.shape({
    account: PropTypes.string,
    amount: PropTypes.string,
  }).isRequired,
};

export default AmountFields;
