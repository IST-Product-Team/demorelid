import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { makeStyles } from '@material-ui/core/styles';

import path from "../../../pathnameCONFIG";

const useStyles = makeStyles((theme) => ({
    icon: {
        position: 'relative',
        top: '4px',
    },
    title: {
        marginLeft: '10px',
        fontFamily: 'Overpass',
        color: '#fff',
        fontWeight: '600',
    },
}));

const SideBarMenu = (props) => {
    const classes = useStyles();
    const [activeButton, setActiveButton] = React.useState('0');

    async function activeButtonHighlight() {
        const { pathname } = window.location;
        switch (pathname) {
        case path.dashboard:
            return '0';
        case path.transfer:
            return '1';
        case path.purchase:
            return '2';
        case path.payment:
            return '3';
        default:
            return '';
        }
    }

    useEffect(() => {
        activeButtonHighlight().then((value) => {
            setActiveButton(value);
        });
    }, []);

    return (
        <div>
            <Menu
                defaultSelectedKeys={[activeButton]}
                selectedKeys={[activeButton]}
                style={{
                    backgroundColor: '#EA5121',
                    paddingTop: '10px',
                    width: '100%',
                }}
                mode="inline"
                theme="dark"
            >
                <Menu.Item key="0">
                    <a
                        style={{ cursor: 'pointer' }}
                        href={path.dashboard}
                        onClick={() => window.location.assign(path.dashboard)}
                    >
                        <span className={classes.title}>Dashboard</span>
                    </a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a
                        style={{ cursor: 'pointer' }}
                        href={path.transfer}
                        onClick={() => window.location.assign(path.transfer)}
                    >
                        <span className={classes.title}>Transfer</span>
                    </a>
                </Menu.Item>
                <Menu.Item key="2">
                    <a
                        style={{ cursor: 'pointer' }}
                        href={path.purchase}
                        onClick={() => window.location.assign(path.purchase)}
                    >
                        <span className={classes.title}>Purchase</span>
                    </a>
                </Menu.Item>
                <Menu.Item key="3">
                    <a
                        style={{ cursor: 'pointer' }}
                        href={path.payment}
                        onClick={() => window.location.assign(path.payment)}
                    >
                        <span className={classes.title}>Payment</span>
                    </a>
                </Menu.Item>
            </Menu>
        </div>
    );
};

export default SideBarMenu;
