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
    let { app_name, model_name } = this.props.match.params;
    fetch("models/" + app_name + "/" + model_name)
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
        <div class="container-fluid">
          <section>
            <div class="row">
              <div class="col-lg-12 col-md-12 mb-lg-0 mb-4"></div>
            </div>
            <div class="row">
              <div class="col-lg-12 col-md-12 mb-md-0 mb-4">
                <div class="card">
                  <div class="card-header white-text primary-color">
                    Migrate {this.state.model_name} Model
                  </div>
                  <div class="card-body text-left px-4 mb-3">
                    <form action="" method="POST">
                      <div class="row">
                        <div class="col-md-4 px-3">
                          <div class="md-form my-0">
                            <input
                              type="text"
                              id="model-name"
                              name="new_model_name"
                              class="form-control"
                            />
                            <label for="model-name">New Model Name</label>
                          </div>
                        </div>
                      </div>
                      <hr class="hr-light" />
                      <div
                        class="accordion md-accordion"
                        id="accordionEx1"
                        role="tablist"
                        aria-multiselectable="true"
                      >
                        {fields}
                      </div>
                      <hr class="hr-light my-3" />
                      <div class="row">
                        <div class="col-md-4">
                          <button type="submit" class="btn btn-primary mx-0">
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
