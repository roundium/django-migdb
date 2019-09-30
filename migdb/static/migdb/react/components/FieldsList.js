import React from "react";
import Field from "./Field";

export default class FieldsList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      fields: []
    };
  }
  componentDidMount() {
    fetch("")
      .then(res => res.json())
      .then(data => {
        this.setState({
          fields: data.fields,
          model_name: data.model_name,
          app_name: data.app_name
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    let fields = this.state.fields.map((field, i) => <Field field={field} key={i} />);
    return (
      <main>
        <div className="container-fluid">
          <section>
            <div className="row">
              <div className="col-lg-12 col-md-12 mb-lg-0 mb-4"></div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 mb-md-0 mb-4">
                <div className="card">
                  <div className="card-header white-text primary-color">
                    Migrate {this.state.model_name} Model
                  </div>
                  <div className="card-body text-left px-4 mb-3">
                    <form action="" method="POST">
                      <div className="row">
                        <div className="col-md-4 px-3">
                          <div className="md-form my-0">
                            <input
                              type="text"
                              id="model-name"
                              name="new_model_name"
                              className="form-control"
                            />
                            <label htmlFor="model-name">New Model Name</label>
                          </div>
                        </div>
                      </div>
                      <hr className="hr-light" />
                      <div
                        className="accordion md-accordion"
                        id="accordionEx1"
                        role="tablist"
                        aria-multiselectable="true"
                      >
                        {fields}
                      </div>
                      <hr className="hr-light my-3" />
                      <div className="row">
                        <div className="col-md-4">
                          <button type="submit" className="btn btn-primary mx-0">
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }
}
