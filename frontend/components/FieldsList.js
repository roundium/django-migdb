import React, { Fragment } from "react";
import { Collapse, Input, Row, Col, Select, Button, Tooltip, Icon } from "antd";

const { Panel } = Collapse;
const InputGroup = Input.Group;
const { Option } = Select;

let id = 1;

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
    let fields = this.state.fields;
    fields[state_index].action = {};
    fields[state_index].action["type"] = e;
    if (e === "conditional_replacement") {
      fields[state_index].action["conditions"] = [
        { current_value: "", new_value: "", id: id++ },
      ];
    }
    this.setState({ fields });
  };

  startDumpData = () => {
    // this.setState({ iconLoading: !this.state.iconLoading });
    console.log(this.state.fields);
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

  onChangeForInputs = (e, obj_name, state_index) => {
    let fields = this.state.fields;
    fields[state_index].action[obj_name] = e.target.value;
    this.setState({ fields });
  };
  onChangeForInputsConditionalReplacement = (
    e,
    obj_name,
    state_index,
    condition_index
  ) => {
    let fields = this.state.fields;
    let conditions = fields[state_index].action.conditions;
    conditions[condition_index][obj_name] = e.target.value;
    fields[state_index].action.conditions = conditions;
    this.setState({ fields });
  };

  generateInputElement = (
    placeholder,
    toolTipTitle,
    obj_name,
    state_index,
    condition_index = null,
    defaultInputValue = null
  ) => {
    if (condition_index === null) {
      return (
        <Input
          placeholder={placeholder}
          defaultValue={defaultInputValue || ""}
          onChange={e => this.onChangeForInputs(e, obj_name, state_index)}
          suffix={
            <Tooltip title={toolTipTitle}>
              <Icon type="info-circle" style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
        />
      );
    } else {
      return (
        <Input
          defaultValue={defaultInputValue || ""}
          placeholder={placeholder}
          onChange={e =>
            this.onChangeForInputsConditionalReplacement(
              e,
              obj_name,
              state_index,
              condition_index
            )
          }
          suffix={
            <Tooltip title={toolTipTitle}>
              <Icon type="info-circle" style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
        />
      );
    }
  };

  addConditionalReplacementItem = state_index => {
    let fields = this.state.fields;
    fields[state_index].action.conditions.push({
      current_value: "",
      new_value: "",
      id: id++,
    });
    this.setState({ fields });
  };

  removeConditionalReplacementItem = (state_index, condition_index) => {
    let fields = this.state.fields;
    let conditions = fields[state_index].action.conditions.filter(
      (item, i) => i !== condition_index
    );
    fields[state_index].action.conditions = conditions;
    this.setState({ fields });
  };

  changeActionReaction = (field, state_index) => {
    if (field.action === {}) {
      return;
    } else if (field.action.type === "rename") {
      return (
        <Col style={{ textAlign: "center", paddingLeft: "10px" }}>
          {this.generateInputElement(
            "Enter Field New Name",
            "Field new name. rename username to email for example.",
            "new_field_name",
            state_index
          )}
        </Col>
      );
    } else if (field.action.type === "format") {
      return (
        <Col style={{ textAlign: "center", paddingLeft: "10px" }}>
          {this.generateInputElement(
            "Enter Field Format String",
            "Field Format String. {{ field_name_from_model }}",
            "format_value",
            state_index
          )}
        </Col>
      );
    } else if (field.action.type === "format_rename") {
      return (
        <Row>
          <Col span={12} style={{ textAlign: "center", paddingLeft: "10px" }}>
            {this.generateInputElement(
              "Enter Field New Name",
              "Field new name. rename username to email for example.",
              "new_field_name",
              state_index
            )}
          </Col>
          <Col span={12} style={{ textAlign: "center", paddingLeft: "10px" }}>
            {this.generateInputElement(
              "Enter Field Format String",
              "Field Format String. {{ field_name_from_model }}",
              "format_value",
              state_index
            )}
          </Col>
        </Row>
      );
    } else if (field.action.type === "conditional_replacement") {
      let field_conditions = this.state.fields[state_index].action.conditions;
      let components = field_conditions.map((condition, i) => (
        <Fragment key={condition.id}>
          <Col
            span={10}
            style={{
              textAlign: "center",
              paddingLeft: "10px",
              paddingBottom: "10px",
            }}
          >
            {this.generateInputElement(
              "Enter Field Current Value",
              "Field Current Value",
              "current_value",
              state_index,
              i,
              condition.current_value
            )}
          </Col>
          <Col
            span={10}
            style={{
              textAlign: "center",
              paddingLeft: "10px",
              paddingBottom: "10px",
            }}
          >
            {this.generateInputElement(
              "Enter Field New Value. Also Can Use Formating",
              "Field Format String. {{ field_name_from_model }}",
              "new_value",
              state_index,
              i,
              condition.new_value
            )}
          </Col>
          {i < field_conditions.length - 1 && (
            <Col span={4} style={{ textAlign: "left", paddingLeft: "10px" }}>
              <Icon
                type="minus-circle-o"
                style={{ fontSize: "24px", paddingTop: "4px", color: "#999" }}
                onClick={() =>
                  this.removeConditionalReplacementItem(state_index, i)
                }
              />
            </Col>
          )}
        </Fragment>
      ));
      return (
        <Row>
          {components}
          <Col span={4} style={{ textAlign: "left", paddingLeft: "10px" }}>
            <Button
              onClick={() => this.addConditionalReplacementItem(state_index)}
              icon="add"
              type="primary"
              style={{ width: "100%" }}
            >
              <Icon type="plus" /> Add
            </Button>
          </Col>
        </Row>
      );
    }
  };

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
                defaultValue={field.action.type || "SelectAction"}
              >
                <Option disabled value="SelectAction">
                  Select an Action for {field.name}
                </Option>
                <Option value="nochange">No Change</Option>
                <Option value="rename">Rename</Option>
                <Option value="format">Format</Option>
                <Option value="format_rename">Format And Rename</Option>
                <Option value="conditional_replacement">
                  Conditional Replacement
                </Option>
                <Option value="delete">Delete</Option>
                <Option value="set_null">Set Null</Option>
                <Option value="set_true">Set True</Option>
                <Option value="set_false">Set False</Option>
                <Option value="set_empty_string">Set Empty String</Option>
              </Select>
            </InputGroup>
          </Col>
          <Col span={16}>{this.changeActionReaction(field, i)}</Col>
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
