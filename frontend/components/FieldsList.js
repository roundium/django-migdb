import React, { Fragment } from "react";
import { Collapse, Input, Row, Col, Select, Button } from "antd";
import { setTimeout } from "timers";

const { Panel } = Collapse;
const InputGroup = Input.Group;
const { Option } = Select;

export default class FieldsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      model_name: "",
      app_name: "",
      iconLoading: false,
    };
  }

  onChangeAction = (e, field, state_index) => {
    console.log(e, field, state_index);
    // TODO: change state if user change the action.
    // render other stuff, if user select an action.
  };

  startDumpData = () => {
    this.setState({ iconLoading: !this.state.iconLoading });
    // TODO: generate json from user settings and send it to server to dump data.
  };

  componentDidMount() {
    fetch("")
      .then(res => res.json())
      .then(data => {
        this.setState({
          fields: data.fields,
          model_name: data.model_name,
          app_name: data.app_name,
        });
        document.title = `Migdb - ${data.app_name} -> ${data.model_name} -> fields`;
      })
      .catch(err => console.log(err));
  }

  render() {
    let fields = this.state.fields.map((field, i) => (
      <Panel
        style={{ backgroundColor: "#f0f2f5", textAlign: "left" }}
        header={field.name}
        key={i}
      >
        <Row>
          <Col span={8}>
            <InputGroup compact>
              <Select
                onChange={e => this.onChangeAction(e, field.name, i)}
                style={{ width: "100%" }}
                defaultValue="SelectAction"
              >
                <Option disabled value="SelectAction">
                  Select an Action for {field.name}
                </Option>
                <Option value="nochange">No Change</Option>
                <Option value="rename">Rename</Option>
                <Option value="format_rename">Format And Rename</Option>
                <Option value="delete">Delete</Option>
                <Option value="set_null">Set Null</Option>
                <Option value="set_empty_string">Set Empty String</Option>
              </Select>
            </InputGroup>
          </Col>
          <Col span={16}></Col>
        </Row>
      </Panel>
    ));
    return (
      <Fragment>
        <Collapse accordion>{fields}</Collapse>
        <Col
          style={{
            backgroundColor: "#f0f2f5",
            textAlign: "left",
            paddingTop: "10px",
            paddingLeft: "10px",
          }}
        >
          <Button
            icon="save"
            type="primary"
            shape="round"
            loading={this.state.iconLoading}
            onClick={this.startDumpData}
          >
            Dump
          </Button>
        </Col>
      </Fragment>
    );
  }
}
