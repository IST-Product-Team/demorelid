import React from 'react';
import { TextField } from "@material-ui/core";
import "./TwoFactorAuthField.css";
import NumberFormat from 'react-number-format';


const { useState, useRef } = React;
const TwoFactorAuthField = () => {
    const [passwords, setPasswords] = useState(['','','','','','']);
    const elementRef = passwords.map(() => useRef());
    const onChangePassword = (value, index) => {
        const passwordx = passwords;
        if (Object.keys(passwords).find((item) => item == index)) {
            passwordx[index] = value;
        }
        setPasswords(passwordx);
    };

    return (
        <div style={{
            padding: '25px',
            display:'flex',
            justifyContent:'center',
        }}>
            {passwords.map((item, index) => (
                <NumberFormat
                    className="two-factor-auth-input"
                    id="standard-basic"
                    defaultValue={item}
                    style={{
                        marginRight: 5,
                        width: '50px'
                    }}
                    value={item}
                    isNumericString
                    inputProps={{
                        maxLength: 1,
                    }}
                    inputRef={elementRef[index]}
                    onChange={(e) => onChangePassword(e.target.value, index)}
                    customInput={TextField}
                />
            ))}
        </div>
    );
};

export default TwoFactorAuthField;
