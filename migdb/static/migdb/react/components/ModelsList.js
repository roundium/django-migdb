import React from "react";
import Item from "./Item";

export default class ModelsList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      models: [],
      app_name: "",
      new_app_name: ""
    };
  }
  componentDidMount() {
    fetch("models/" + this.props.match.params.app_name)
      .then(res => res.json())
      .then(data => {
        this.setState({
          models: data.models,
          app_name: data.app_name,
          new_app_name: data.new_app_name
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    let models = this.state.models.map((model, i) => <Item itemType="model" item={model} key={i} />);
    return (
      <main>
        <div className="container-fluid">
          <section>
            <div className="row">
              <div className="col-lg-4 col-md-12 mb-lg-0 mb-4"></div>
              <div className="col-lg-4 col-md-12 mb-lg-0 mb-4">
                <form action="" method="POST">
                  <div className="md-form input-group mb-4">
                    <input
                      type="text"
                      className="form-control"
                      name="app_name"
                      placeholder="New App Name. Default is current app name"
                      aria-label="New App Name. default is current app name"
                      aria-describedby="MaterialButton-addon2"
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-md btn-primary m-0 px-3"
                        type="submit"
                        id="MaterialButton-addon2"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-lg-4 col-md-12 mb-lg-0 mb-4"></div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-12 mb-lg-0 mb-4"></div>
              <div className="col-lg-4 col-md-12 mb-md-0 mb-4">
                <div className="card">
                  <div className="card-header white-text primary-color">
                    Choose a Model
                  </div>
                  <div className="card-body text-center px-4 mb-3">
                    <div className="list-group list-panel">{models}</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 mb-lg-0 mb-4"></div>
            </div>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <form method="POST" action="">
                  <button
                    className="btn btn-primary mx-0 mt-3 float-right"
                    type="submit"
                  >
                    Dump Data
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }
}
