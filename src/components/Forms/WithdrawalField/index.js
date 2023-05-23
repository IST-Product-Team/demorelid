import React from 'react';
import { Row, Col, Input, Tag } from 'antd';
import PropTypes from 'prop-types';
import AmountCurrencyField from '../../InputField/AmountCurrencyField';
import NumberFormat from 'react-number-format';
const { TextArea } = Input;
const TwoInputForm = (props) => {
  const { errors, values, handleChange } = props;
  const handleAmountChange = (event) => {
    const newValue = event.target.value;
    if (!values.amount.includes('&')) {
      handleChange(event);
    } else {
      handleChange({
        ...event,
        target: {
          ...event.target,
          value: parseInt(newValue, 10)
            .toLocaleString('id-ID', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })
            .replace(/,/g, '.'),
        },
      });
    }
  };
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
                name="account"
                autoSize={{ minRows: 1, maxRows: 1 }}
                value={values.account} // Set the value from Formik
                onChange={handleChange}
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
              <NumberFormat
                placeholder="Enter Amount"
                name="amount"
                value={values.amount}
                thousandSeparator="."
                decimalSeparator=","
                autoSize={{ minRows: 1, maxRows: 1 }}
                allowNegative={false}
                isNumericString={true}
                customInput={TextArea}
                onChange={handleChange}
                {...props}
              />
              {/* autoSize={{ minRows: 1, maxRows: 1 }} */}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

TwoInputForm.propTypes = {
  errors: PropTypes.shape({
    account: PropTypes.string,
    amount: PropTypes.string,
  }).isRequired,
  values: PropTypes.shape({
    account: PropTypes.string,
    amount: PropTypes.string,
  }).isRequired,
};

export default TwoInputForm;
