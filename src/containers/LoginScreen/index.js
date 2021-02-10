import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

const LoginScreen = () => {
    return (
        <div>
            Login
        </div>
    );
};

function mapStateToProps() {
    return {};
}

export default withRouter(
    connect(mapStateToProps)(withTranslation('translations')(LoginScreen))
);
