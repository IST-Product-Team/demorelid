import React from 'react';
import { Layout } from 'antd';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';
import PerfectScrollbar from "react-perfect-scrollbar";

import SideBarMenu from './SideBarMenu';

const { Sider } = Layout;

const SideBar = () => {
    return (
        <I18nextProvider>
            <Sider
                data-test-id="sidebar-menu"
                width={255}
                style={{
                    // position: 'fixed',
                    height: 'calc(100vh - 60px)',
                    left: 0,
                    backgroundColor: '#EA5121',
                    overflowY: 'auto',
                    zIndex: 1100
                }}
            >
                <PerfectScrollbar data-test-id={"sidebar-perfectscrollbar"} style={{ opacity: 1 }}>
                    <Router>
                        <SideBarMenu />
                    </Router>
                </PerfectScrollbar>
            </Sider>
        </I18nextProvider>
    );
};

export default SideBar;
