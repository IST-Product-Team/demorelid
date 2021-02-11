import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { Layout } from "antd";
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';

import Header from "./Header";
import Footer from "./Footer";

import pathname from "../pathnameCONFIG";

import LoginScreen from "../containers/LoginScreen"
import DashboardScreen from "../containers/DashboardScreen"

import i18n from '../helpers/i18n/i18n';
import theme from '../assets/theme/theme';
import store from '../helpers/store/store';

const Layouts = (props) => {
  const location = useLocation();
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Route exact path={pathname.login} component={LoginScreen} />
          <Route exact path={pathname.dashboard} component={DashboardScreen} />
        </Provider >
      </ThemeProvider>
    </I18nextProvider>
  );
};

export default Layouts;
