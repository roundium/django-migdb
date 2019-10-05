import React from "react";
import Field from "./Field";
import { Collapse } from "antd";

const { Panel } = Collapse;

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
    return <Collapse accordion>{fields}</Collapse>;
  }
}
