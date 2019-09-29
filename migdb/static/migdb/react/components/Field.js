import React from "react";

export default class Field extends React.Component {
  render() {
    let { field } = this.props;
    return (
      <div className="card">
        <div className="card-header px-0" role="tab" id="headingTwo1">
          <a
            className="collapsed"
            data-toggle="collapse"
            data-parent="#accordionEx1"
            href="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            <h6 className="mb-0">
              {field.name}
              <i className="fas fa-angle-down rotate-icon"></i>
            </h6>
          </a>
        </div>
        <div
          id="collapseTwo"
          className="collapse"
          role="tabpanel"
          aria-labelledby="headingTwo1"
          data-parent="#accordionEx1"
        >
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="md-form my-0">
                  <select
                    name="form-action"
                    className="mdb-select"
                    editable="true"
                  >
                    <option value="nochange" selected>
                      No Change
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="switch">
                  Primary Key:
                  <label>
                    <input
                      checked
                      id="primary_key_checkbox"
                      className="primary_key_checkbox"
                      checked
                      name="form-primary_key"
                      type="checkbox"
                    />
                    <span className="lever"></span>
                  </label>
                </div>
                <div className="switch">
                  Primary Key:
                  <label>
                    <input
                      id="primary_key_checkbox"
                      className="primary_key_checkbox"
                      name="form-primary_key"
                      type="checkbox"
                    />
                    <span className="lever"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
