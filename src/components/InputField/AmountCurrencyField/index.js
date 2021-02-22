import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import NumberFormat from 'react-number-format';
import "./AmountCurrencyField.css";

const { useState ,useEffect } = React;

const AmountCurrencyField = (props) => {
    const { className, errors, setFieldValue } = props;
    const [amount, setAmount] = useState('');

    useEffect(() => {
        setFieldValue('amount', amount.split(',').join(''));
    },[amount]);

    return (
        <Form.Item
            validateStatus={errors.amount ? 'error' : 'validating'}
            help={errors.amount !== '' ? errors.amount : ''}
            style={{ textAlign: 'left', marginBottom: 0 }}
        >
            <NumberFormat
                value={amount}
                thousandSeparator
                className={className}
                maxLength={100}
                onChange={(e) => {
                    setAmount(e.target.value);
                }}
                customInput={Input}
                {...props}
            />
        </Form.Item>
    );
};

AmountCurrencyField.propTypes = {
    className: PropTypes.string,
    values: PropTypes.shape({
        amount: PropTypes.string.isRequired,
    }).isRequired,
    errors: PropTypes.shape({
        amount: PropTypes.string.isRequired,
    }).isRequired,
    setFieldValue: PropTypes.func.isRequired,
};

AmountCurrencyField.defaultProps = {
    className: '',
};

export default AmountCurrencyField;
