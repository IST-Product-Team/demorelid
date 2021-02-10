import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Layout } from "antd";

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        height: '60px',
        left: '0px',
        right: '0px',
        bottom: '-50px',
        textAlign: 'center',
        background: '#FFFFFF',
    },
    footerText:{
        fontFamily: 'Overpass',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '12px',
        lineHeight: '18px',
        textAlign: 'center',
        textTransform: 'capitalize',
        color: '#2A324D'
    }
});
const { Footer } = Layout;
const LayoutFooter = () => {
    const classes = useStyles();
    return (
        <Footer className={classes.root}><span className={classes.footerText}>&copy; 2019 All Rights Reserved. Terms of Use and Privacy Policy</span></Footer>
    );
};

export default LayoutFooter;
