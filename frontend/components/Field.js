import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default class Field extends React.Component {
  render() {
    let { field } = this.props;
    return (
      <Card>
        <Card.Header role="tab" id="headingTwo1">
          <Accordion.Toggle as={Button} variant="link" eventKey={this.props.id}>
            <h6 className="mb-0">
              {field.name}
              <i className="fas fa-angle-down rotate-icon"></i>
            </h6>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={this.props.id}>
          <Card.Body>{field.name}</Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }
}
