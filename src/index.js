import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import BasicLayouts from './layout';

// import Route from "./router";

import './helpers/Axios/interceptor';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Route component={(props) => <BasicLayouts {...props} />} />
  </BrowserRouter>,
  document.getElementById('root')
);
