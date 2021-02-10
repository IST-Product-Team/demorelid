import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        height: '60px',
        position: 'relative',
        zIndex: 100
    }
});

const Header = () => {
    const classes = useStyles();
    return (
        <>
            <AppBar className={classes.root} />
        </>
    );
};

export default Header;
