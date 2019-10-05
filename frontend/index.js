import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "antd/dist/antd.css";

import {
  Header,
  Footer,
  AppsList,
  ModelsList,
  FieldsList,
} from "./components";

const App = () => {
  const base_url = window.location.pathname;
  return (
    <Router basename={base_url}>
      <div>
        <Header />
        <Route exact path="/" component={AppsList} />
        <Route exact path="/:app_name/models/" component={ModelsList} />
        <Route
          exact
          path="/:app_name/:model_name/fields/"
          component={FieldsList}
        />
        <Footer />
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("react"));
