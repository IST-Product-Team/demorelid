import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import background from '../../assets/images/logoIST2.png';

import './DashboardScreen.css';

const DashboardScreen = () => {
    return (
        <div className="layout">
            <div style={{ width: "100%", textAlign: "center" }}>
                <img src={background} style={{ width: "25%" }} alt="IST-Logo" />
            </div>
            <div className="title">Welcome in IST Rel ID</div>
        </div>
    );
};

function mapStateToProps() {
    return {};
}

export default withRouter(
    connect(mapStateToProps)(withTranslation('translations')(DashboardScreen))
);
