import React from "react";
import { Input, Tooltip, Icon } from "antd";

let InputElement = props => {
  const {
    placeholder,
    toolTipTitle,
    obj_name,
    state_index,
    onChangeCallBackFunc,
    condition_index,
    defaultInputValue,
  } = props;
  if (condition_index === null) {
    return (
      <Input
        placeholder={placeholder}
        defaultValue={defaultInputValue || ""}
        onChange={e => onChangeCallBackFunc(e, obj_name, state_index)}
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
          onChangeCallBackFunc(e, obj_name, state_index, condition_index)
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

InputElement.defaultProps = {
  condition_index: null,
  defaultInputValue: null,
};

export default InputElement;
