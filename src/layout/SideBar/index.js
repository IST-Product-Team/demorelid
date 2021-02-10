import React from 'react';
import { Layout } from 'antd';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';

import SideBarMenu from './SideBarMenu';

const { Sider } = Layout;

const SideBar = () => {
    return (
        <I18nextProvider>
            <Sider
                data-test-id="sidebar-menu"
                width={255}
                style={{
                    position: 'fixed',
                    height: '100vh',
                    left: 0,
                    backgroundColor: '#004D6E',
                    overflowY: 'auto',
                    zIndex: 1100
                }}
            >
                <Router>
                    <SideBarMenu />
                </Router>
            </Sider>
        </I18nextProvider>
    );
};

export default SideBar;
