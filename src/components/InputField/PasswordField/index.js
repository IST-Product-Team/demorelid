import React from "react";
import { Form, Input } from "antd";


const PasswordField = props => {
    const { className, onChange } = props

    return (
        <Form.Item>
            <Input.Password
                id={"password"}
                className={className}
                placeholder="Enter your password"
                onChange={onChange}
            />
        </Form.Item>
    )
}

export default PasswordField;