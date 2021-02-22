import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from "antd";

import pathname from "../../../pathnameCONFIG";
import TwoFactorAuthField from "../../InputField/TwoFactorAuthField";
import "./TwoFactorAuthModal.css";

const { useState } =  React;
const TwoFactorAuthModal = props => {
    const {visible, onClose} = props;
    const [twoFactor, setTwoFactor] = useState('');
    return (
        <Modal
            zIndex={9999}
            centered
            width={500}
            bodyStyle={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#ffffff',
                justifyContent:'center'
            }}
            footer={null}
            closable
            onCancel={onClose}
            visible={visible}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <span className="two-factor-auth-modal-title">
            Two Factor Authentication
                </span>
                <span className="two-factor-auth-modal-subtitle">
            Please input 6 digits code sent to your phone
                </span>
                <TwoFactorAuthField setTwoFactor={setTwoFactor} />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button
                        className="submit-button"
                        type="primary"
                        style={{
                            height: 50,
                            width: 100,
                        }}
                        onClick={() => {
                            window.location.assign(pathname.dashboard);
                        }}
                        disabled={twoFactor.trim().length < 6}
                        size="large"
                    >
              Submit
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

TwoFactorAuthModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default TwoFactorAuthModal;
