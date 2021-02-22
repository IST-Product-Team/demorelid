import React from "react";
import PropTypes from 'prop-types';
import { Form, Input } from "antd";

const PasswordField = props => {
    const { className, onChange } = props;

    return (
        <Form.Item>
            <Input.Password
                id="password"
                className={className}
                placeholder="Enter your password"
                onChange={onChange}
            />
        </Form.Item>
    );
};

PasswordField.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

PasswordField.defaultProps = {
    className: '',
};

export default PasswordField;