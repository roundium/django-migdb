import React from "react";
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

  render() {
    let fields = this.state.fields.map((field, i) => (
      <Panel header={field.name} key={i}>
        <p>{field.name}</p>
      </Panel>
    ));
    return <Collapse accordion>{fields}</Collapse>;
  }
}
