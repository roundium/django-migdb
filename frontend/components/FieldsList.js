import React from "react";
import Field from "./Field";
import Accordion from "react-bootstrap/Accordion";

export default class FieldsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      model_name: "",
      app_name: "",
    };
    this.save_new_model_name = this.save_new_model_name.bind(this);
    this.dump_data_btn = this.dump_data_btn.bind(this);
  }

  componentDidMount() {
    fetch("")
      .then(res => res.json())
      .then(data => {
        this.setState({
          fields: data.fields,
          model_name: data.model_name,
          app_name: data.app_name,
        });
      })
      .catch(err => console.log(err));
  }

  dump_data_btn(e) {
    e.preventDefault();
    // TODO: read the state and send it to server to dump data.
  }

  save_new_model_name(e) {
    this.setState({
      new_model_name: e.target.value,
    });
  }

  render() {
    let fields = this.state.fields.map((field, i) => (
      <Field field={field} id={i} key={i} />
    ));
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
                              placeholder="New Model Name"
                              defaultValue={this.state.model_name}
                              onChange={this.save_new_model_name}
                            />
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
                        <Accordion>{fields}</Accordion>
                      </div>
                      <hr className="hr-light my-3" />
                      <div className="row">
                        <div className="col-md-4">
                          <button
                            onClick={this.dump_data_btn}
                            className="btn btn-primary mx-0"
                          >
                            Dump Data
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
