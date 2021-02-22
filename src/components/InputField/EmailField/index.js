import React from "react";
import PropTypes from 'prop-types';
import { Form, Input } from "antd";
import "./EmailField.css";

const EmailField = props => {
    const { error, helperText, className } = props;

    return (
        <Form.Item
            validateStatus={error ? 'error' : 'validating'}
            help={helperText !== '' ? helperText : ''}
            style={{ textAlign: 'left', marginBottom: 0 }} >
            <Input
                className={className}
                maxLength={100}
                {...props}
            />
        </Form.Item>
    );
};

EmailField.propTypes = {
    error: PropTypes.bool,
    helperText: PropTypes.string,
    className: PropTypes.string
};

EmailField.defaultProps = {
    className: '',
    helperText: '',
    error: false,
};

export default EmailField;