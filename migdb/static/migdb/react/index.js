import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppsList from "./components/AppsList";
import ModelsList from "./components/ModelsList";
import FieldsList from "./components/FieldsList";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/migdb/" component={AppsList} />
          <Route exact path="/migdb/:app_name/models/" component={ModelsList} />
          <Route exact path="/migdb/:app_name/:model_name/fields/" component={FieldsList} />
          <Footer />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react"));
