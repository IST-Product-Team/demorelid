import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@material-ui/styles';

import theme from './assets/theme/theme';
import i18n from './helpers/i18n/i18n';
import store, { history } from './helpers/store/store';

import Layouts from './layout';

let currentPathname = "";

history.listen((newLocation, action) => {
  document.documentElement.scrollTop = 0;
  if (action === "PUSH") {
    if (newLocation.pathname !== currentPathname) {
      currentPathname = newLocation.pathname;
      history.push({
        ...newLocation
      });
    }
  } else {
    history.go(1);
  }
});

const Router = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={theme}>
            <Switch>
              <Route exact path="/" component={Layouts} />
            </Switch>
          </ThemeProvider>
        </I18nextProvider>
      </ConnectedRouter>
    </Provider >
  );
};

export default Router;
