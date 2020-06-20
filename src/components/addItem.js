import React from "react";

import { ButtonGroup, ToggleButton, Form, Button } from "react-bootstrap";
const AddItem = (props) => {
  return (
    <div className="formcon">
      {props.board.id === props.FormOn ? (
        <Form className="form">
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              ref={props.register}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Assigned To"
              name="assignedTo"
              ref={props.register}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="due date"
              name="dueDate"
              ref={props.register}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows="3"
              name="note"
              ref={props.register}
              placeholder="Description"
            />
          </Form.Group>
          <div className="itemBtnCon">
            <Button
              variant="primary"
              onClick={() => {
                props.submiting();
              }}
            >
              Submit
            </Button>

            <Button variant="secondary" type="submit" onClick={props.emptyForm}>
              cancel
            </Button>
          </div>
        </Form>
      ) : (
        <ButtonGroup toggle className="mb-2">
          <ToggleButton
            onClick={(e) => props.assignForm(props.board.id)}
            type="checkbox"
            defaultChecked
            value="1"
          >
            Add Item
          </ToggleButton>
          <ToggleButton
            variant="secondary"
            type="checkbox"
            defaultChecked
            onClick={(e) => props.deleteBoard(props.board.id)}
          >
            Delete Board
          </ToggleButton>
        </ButtonGroup>
      )}
    </div>
  );
};
export default AddItem;
