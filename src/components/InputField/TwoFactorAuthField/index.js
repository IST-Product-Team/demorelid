import React from 'react';
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import "./TwoFactorAuthField.css";
import NumberFormat from 'react-number-format';

const { useState, useRef } = React;
const TwoFactorAuthField = ({ setTwoFactor }) => {
    const [passwords, setPasswords] = useState(['', '', '', '', '', '']);
    const elementRef = passwords.map(() => useRef());
    const onChangePassword = (value, index) => {
        const passwordx = passwords;
        if (Object.keys(passwords).find((item) => item == index)) {
            passwordx[index] = value;
        }
        setTwoFactor(passwordx.join(''));
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
                        marginRight: 15,
                        width: '50px'
                    }}                    
                    value={item}
                    inputProps={{
                        maxLength: 1,
                    }}
                    onKeyUp={(e) => {
                        if (/[0-9]/.test(e.target.value)){
                            if (elementRef[index + 1] && passwords[index] !== '') {
                                elementRef[index + 1].current.focus();
                            } else {
                                elementRef[index].current.focus();
                            }
                        }else if (e.key === 'Backspace') {
                            if (
                                elementRef[index - 1]                             
                            ) {
                                elementRef[index - 1].current.focus();
                            } else {
                                elementRef[index].current.focus();
                            }
                        }
                          
                    }}
                    inputRef={elementRef[index]}
                    onChange={(e) => onChangePassword(e.target.value, index)}
                    customInput={TextField}
                />
            ))}
        </div>
    );
};

TwoFactorAuthField.propTypes = {
    setTwoFactor: PropTypes.func.isRequired
};

export default TwoFactorAuthField;
