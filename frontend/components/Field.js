import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Field = ({field, id}) => {
  return (
    <Card>
      <Card.Header role="tab" id="headingTwo1">
        <Accordion.Toggle as={Button} variant="link" eventKey={id}>
          <h6 className="mb-0">
            {field.name}
            <i className="fas fa-angle-down rotate-icon"></i>
          </h6>
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={id}>
        <Card.Body>{field.name}</Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default Field;
