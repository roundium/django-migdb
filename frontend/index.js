import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout } from "antd";

import {
  Header as OurHeader,
  Footer as OutFooter,
  AppsList,
  ModelsList,
  FieldsList,
} from "./components";

const { Header, Footer, Content } = Layout;
import "antd/dist/antd.css";

const App = () => {
  const base_url = window.location.pathname;
  return (
    <Router basename={base_url}>
      <Layout hasSider={false} style={{ backgroundColor: "#f0f2f5" }}>
        <Header style={{ backgroundColor: "#f0f2f5" }}>
          <OurHeader />
        </Header>
        <Content align="center">
          <Route exact path="/" component={AppsList} />
          <Route exact path="/:app_name/models/" component={ModelsList} />
          <Route
            exact
            path="/:app_name/:model_name/fields/"
            component={FieldsList}
          />
        </Content>
        <Footer align="center">
          <OutFooter />
        </Footer>
      </Layout>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("react"));
