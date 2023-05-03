import React from 'react';
import { Switch, Route, Router, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';

import Header from './Header';
import SideBar from './SideBar';

import pathname from '../pathnameCONFIG';
import LoginScreen from '../containers/LoginScreen';
import DashboardScreen from '../containers/DashboardScreen';
import TransferScreen from '../containers/TransferScreen';
import PurchaseScreen from '../containers/PurchaseScreen';
import PaymentScreen from '../containers/PaymentScreen';
import ReceiptScreen from '../containers/ReceiptScreen';

import i18n from '../helpers/i18n/i18n';
import theme from '../assets/theme/theme';
import store from '../helpers/store/store';
import PortalScreen from '../containers/PortalScreen';
import SideBarPortal from './SidebarPortal';
import CodeScreen from '../containers/codeActivationScreen';

const Layouts = (props) => {
  const location = useLocation();
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          {location.pathname === '/' ||
          location.pathname === '/portal' ||
          location.pathname === '/codeScreen' ? null : (
            <Header />
          )}
          <Layout style={{ height: '100%' }}>
            {location.pathname === '/' ||
            location.pathname === '/codeScreen' ||
            location.pathname === '/portal' ? null : (
              <SideBar />
            )}
            {location.pathname === '/portal' ||
            location.pathname === '/codeScreen' ? (
              <SideBarPortal />
            ) : null}

            <Route exact path={pathname.login} component={LoginScreen} />
            <Route exact path={pathname.portal} component={PortalScreen} />
            <Route exact path={pathname.codeScreen} component={CodeScreen} />
            <Route
              exact
              path={pathname.dashboard}
              component={DashboardScreen}
            />

            <Route exact path={pathname.transfer} component={TransferScreen} />
            <Route exact path={pathname.purchase} component={PurchaseScreen} />
            <Route exact path={pathname.payment} component={PaymentScreen} />
            <Route exact path={pathname.receipt} component={ReceiptScreen} />
          </Layout>
        </Provider>
      </ThemeProvider>
    </I18nextProvider>
  );
};

export default Layouts;
