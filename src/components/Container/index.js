import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Divider } from "@material-ui/core";

import "./Container.css";

const Container = ({ title, subtitle, children }) => {
    return (
        <div style={{
            padding: '25px',
            width: '82vw',
        }}>
            <Paper elevation={2}>
                <div className="transaction-info">
                    <span className="title-transaction">
                        {title}
                    </span>
                    <span className="subtitle-transaction">
                        {subtitle}
                    </span>
                    <Divider />
                </div>
                <div style={{
                    padding: 25
                }}>
                    {children}
                </div>
            </Paper>
        </div>
    )
}


Container.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};



export default Container
