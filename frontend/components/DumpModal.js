import React from "react";
import { Modal, Input, Icon, Tooltip, Col, Row } from "antd";

const DumpModal = props => {
  const {
    visibleModal,
    handleOk,
    startDumpLoading,
    handleCancel,
    model_name,
    app_name,
    disableInputs,
    inputsOnChange
  } = props;
  return (
    <Modal
      title="Final Settings"
      visible={visibleModal}
      onOk={handleOk}
      confirmLoading={startDumpLoading}
      onCancel={handleCancel}
    >
      <Row>
        <Col span={24}>
          <h4>New App Name: </h4>
          <Input
            disabled={disableInputs}
            label="New App Name"
            onChange={e => inputsOnChange("new_app_name", e.target.value)}
            placeholder="New App Name"
            defaultValue={app_name || ""}
            suffix={
              <Tooltip title="if the model app name has changed, change the name here">
                <Icon type="info-circle" style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
        </Col>
        <Col span={24} style={{ paddingTop: "10px" }}>
          <h4>New Model Name: </h4>
          <Input
            disabled={disableInputs}
            label="New Model Name"
            onChange={e => inputsOnChange("new_model_name", e.target.value)}
            placeholder="New Model Name"
            defaultValue={model_name || ""}
            suffix={
              <Tooltip title="if the model name has changed, change the name here">
                <Icon type="info-circle" style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default DumpModal;
