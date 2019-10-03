import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppsList from "./components/AppsList";
import ModelsList from "./components/ModelsList";
import FieldsList from "./components/FieldsList";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base_url: window.location.pathname,
    };
  }
  render() {
    return (
      <Router basename={this.state.base_url}>
        <div>
          <Header/>
          <Route exact path="/" component={AppsList} />
          <Route exact path="/:app_name/models/" component={ModelsList} />
          <Route exact path="/:app_name/:model_name/fields/" component={FieldsList} />
          <Footer />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react"));
