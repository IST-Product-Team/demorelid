import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { Layout } from "antd";

import Header from "./Header";
import Footer from "./Footer";

import pathname from "../pathnameCONFIG";

import LoginScreen from "../containers/LoginScreen"

const { Content } = Layout;

const Layouts = (props) => {
  const location = useLocation();
  return (
    <>
      <Layout style={{ background: '#fff', position: 'relative' }}>
        <Content>
          <Switch>
            <Route exact path={pathname.dashboard} component={LoginScreen} />
          </Switch>
        </Content>
      </Layout>
    </>
  );
};

export default Layouts;
