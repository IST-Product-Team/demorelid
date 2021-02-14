import React from "react";
import PropTypes from "prop-types";
import { Form, Input } from "antd";

import "./CommonInputField.css";

const CommonInputField = props => {
    const { className, helperText, error} = props;

    return (
        <Form.Item
            validateStatus={error ? 'error' : 'validating'}
            help={helperText !== '' ? helperText : ''}
            style={{ textAlign: 'left', marginBottom: 0 }}
        >
            <Input className={className} maxLength={100} {...props} />
        </Form.Item>
    );
};

CommonInputField.propTypes = {
    className: PropTypes.string,
    helperText: PropTypes.string,
    error: PropTypes.bool,
};

CommonInputField.defaultProps = {
    className: '',
    helperText: '',
    error: false
};

export default CommonInputField;