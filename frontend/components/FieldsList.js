import React, { Fragment } from "react";
import { Collapse, Input, Row, Col, Select, Button, Icon } from "antd";
import InputElement from "./InputElement";

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

  // send the ajax request for get the fields list
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

  /** if you choose an action for an field, this method will change the state.
   * @e {ref} is the action value that user selected.
   * @state_index {int} is the field index number in state fields array.
   * @field {Object} is the field object => { type: "action_type", ... }
   */
  onChangeAction = (e, field, state_index) => {
    let fields = this.state.fields;
    // cleanup the previous action object
    fields[state_index].action = {};
    fields[state_index].action["type"] = e;

    // add more data to the action in some cases
    if (e === "conditional_replacement") {
      fields[state_index].action["conditions"] = [
        { current_value: "", new_value: "", id: id++ },
      ];
    } else if (e === "conditional_replacement_rename") {
      fields[state_index].action["conditions"] = [
        { current_value: "", new_value: "", id: id++ },
      ];
    }

    this.setState({ fields });
  };

  // when user clicked on Dump button this event listner will be fired.
  startDumpData = () => {
    // this.setState({ iconLoading: !this.state.iconLoading });
    console.log(this.state.fields);
    // TODO: show a modal and ask for new model and app name.
    // TODO: generate json from user settings and send it to server to dump data.
  };

  /** when user change the inputs this event listner will handle the value changes and save it in state.
   * @e {ref} is the input element ref.
   * @obj_name {string} is the key name that input value will save in it.
   * @state_index {int} is the field index number in state fields array.
   * WARNING: this event listner will not fired for 'Conditional Replacement' inputs.
   */
  onChangeForInputs = (e, obj_name, state_index) => {
    let fields = this.state.fields;
    fields[state_index].action[obj_name] = e.target.value;
    this.setState({ fields });
  };

  /** when user change the inputs of 'Conditional Replacement' actions this event listner will handle the value changes
   * and save it in state.
   * @e {ref} is the input element ref.
   * @obj_name {string} is the key name that input value will save in it.
   * @state_index {int} is the field index number in state fields array.
   * @condition_index {int} conditions is array, so we also need the condition index to change the current and new value of it.
   * WARNING: this event listner will not fired for 'Conditional Replacement' inputs.
   */
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

  /**
   * click on add button in Conditional Replacements action will fire this method.
   * this method will add a condition object to the field.action.conditions array.
   * @state_index is the field object index in state fields array.
   * NOTE: we use id key for react child keys. do not use item index in array. it come's from a global variable.
   */
  addConditionalReplacementItem = state_index => {
    let fields = this.state.fields;
    fields[state_index].action.conditions.push({
      current_value: "",
      new_value: "",
      id: id++,
    });
    this.setState({ fields });
  };

  /**
   * this method will fired when user want to delete an condition. it's onClick callback for minus icons.
   * @state_index field item index in state fields array
   * @condition_index is the index of a specific condition in field.action.conditions array
   */
  removeConditionalReplacementItem = (state_index, condition_index) => {
    let fields = this.state.fields;
    let conditions = fields[state_index].action.conditions.filter(
      (_, i) => i !== condition_index
    );
    fields[state_index].action.conditions = conditions;
    this.setState({ fields });
  };

  /**
   * when the field action has change this method will create new InputElements base on the action type that user
   * selected.about
   * @field the field object => {action: Object, name: "name", fk: true | false, m2m: true | false, o2o: true | false, pk: true | false}.
   * @state_index is the field object item index in state fields array.
   */
  changeActionReaction = (field, state_index) => {
    if (Object.keys(field.action).length === 0) {
      return;
    } else if (field.action.type === "rename") {
      return (
        <Col style={{ textAlign: "center", paddingLeft: "10px" }}>
          <InputElement
            placeholder="Enter Field New Name"
            toolTipTitle="Field new name. rename username to email for example."
            obj_name="new_field_name"
            state_index={state_index}
            onChangeCallBackFunc={this.onChangeForInputs}
          />
        </Col>
      );
    } else if (field.action.type === "format") {
      return (
        <Col style={{ textAlign: "center", paddingLeft: "10px" }}>
          <InputElement
            placeholder="Enter Field Format String"
            toolTipTitle="Field Format String. {{ field_name_from_model }}"
            obj_name="format_value"
            state_index={state_index}
            onChangeCallBackFunc={this.onChangeForInputs}
          />
        </Col>
      );
    } else if (field.action.type === "format_rename") {
      return (
        <Row>
          <Col span={12} style={{ textAlign: "center", paddingLeft: "10px" }}>
            <InputElement
              placeholder="Enter Field New Name"
              toolTipTitle="Field new name. rename username to email for example."
              obj_name="new_field_name"
              state_index={state_index}
              onChangeCallBackFunc={this.onChangeForInputs}
            />
          </Col>
          <Col span={12} style={{ textAlign: "center", paddingLeft: "10px" }}>
            <InputElement
              placeholder="Enter Field Format String"
              toolTipTitle="Field Format String. {{ field_name_from_model }}"
              obj_name="format_value"
              state_index={state_index}
              onChangeCallBackFunc={this.onChangeForInputs}
            />
          </Col>
        </Row>
      );
    } else if (field.action.type.startsWith("conditional_replacement")) {
      let field_conditions = this.state.fields[state_index].action.conditions;
      let components = field_conditions.map((condition, i) => (
        <Fragment key={condition.id}>
          {field.action.type.endsWith("_rename") && i === 0 && (
            <Col
              span={24}
              style={{
                textAlign: "center",
                paddingLeft: "10px",
                paddingBottom: "10px",
              }}
            >
              <InputElement
                placeholder="Enter Field New Name"
                toolTipTitle="Field new name. rename username to email for example."
                obj_name="new_field_name"
                state_index={state_index}
                onChangeCallBackFunc={this.onChangeForInputs}
                defaultInputValue={field.action.new_field_name}
              />
            </Col>
          )}
          <Col
            span={10}
            style={{
              textAlign: "center",
              paddingLeft: "10px",
              paddingBottom: "10px",
            }}
          >
            <InputElement
              placeholder="Enter Field Current Value"
              toolTipTitle="Field Current Value"
              obj_name="current_value"
              state_index={state_index}
              onChangeCallBackFunc={
                this.onChangeForInputsConditionalReplacement
              }
              condition_index={i}
              defaultInputValue={condition.current_value}
            />
          </Col>
          <Col
            span={10}
            style={{
              textAlign: "center",
              paddingLeft: "10px",
              paddingBottom: "10px",
            }}
          >
            <InputElement
              placeholder="Enter Field New Value. Also Can Use Formating"
              toolTipTitle="Field Format String. {{ field_name_from_model }}"
              obj_name="new_value"
              state_index={state_index}
              onChangeCallBackFunc={
                this.onChangeForInputsConditionalReplacement
              }
              condition_index={i}
              defaultInputValue={condition.current_value}
            />
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
                <Option value="conditional_replacement_rename">
                  Conditional Replacement And Rename
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
