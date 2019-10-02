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
      base_url: "/migdb/",
    };
  }
  componentDidMount() {
    fetch("", { method: "POST" })
      .then(res => res.json())
      .then(res => {
        this.setState({
          base_url: res.base_url,
        });
      });
  }
  render() {
    let base_url = this.state.base_url;
    let models_url = base_url + ":app_name/models/";
    let fields_url = base_url + ":app_name/:model_name/fields/";

    return (
      <Router>
        <div>
          <Header />
          <Route exact path={base_url} component={AppsList} />
          <Route exact path={models_url} component={ModelsList} />
          <Route exact path={fields_url} component={FieldsList} />
          <Footer />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react"));
