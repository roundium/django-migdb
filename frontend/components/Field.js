import React from "react";
import { Collapse } from 'antd';

const { Panel } = Collapse;

const Field = ({field, id}) => {
  return (
    <Panel header={field.name} key={id}>
      <p>{field.name}</p>
    </Panel>
  );
};

export default Field;
