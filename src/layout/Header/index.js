import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

import LogoIST from '../../assets/images/LogoIST.png'

const useStyles = makeStyles({
    root: {
        height: '60px',
        background: '#FFFFFF',
        boxShadow: '0px 6px 20px rgba(188, 200, 231, 0.4)',
        paddingLeft: '50px'
    },

});

const Header = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <img src={LogoIST} />
        </div>
    );
};

export default Header;
