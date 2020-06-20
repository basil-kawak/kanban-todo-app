import React from "react";
import { Form, Button } from "react-bootstrap";
import Modal from "react-modal"; // npm i react-modal || npmjs.com/package/react-modal
Modal.setAppElement("#root"); // to avoid the warning

const EditItem = (props) => {
  return (
    <div>
      <Modal
        onRequestClose={props.StartEditItemOff}
        isOpen={props.EditItemState.open}
        contentLabel="Selected Option"
        closeTimeoutMS={900}
      >
        <h1 className="centerTxt mar-top">Welcome to the Edit Modal</h1>
        <br></br>
        <div className="boardFormCon">
          <Form className="form">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                name="EditTitle"
                ref={props.registerEdit}
                defaultValue={props.OnEditItem.title}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Assigned To</Form.Label>
              <Form.Control
                type="text"
                placeholder="Assigned To"
                name="EditAssignTo"
                ref={props.registerEdit}
                defaultValue={props.OnEditItem.title}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="due date"
                name="EditDueDate"
                ref={props.registerEdit}
                defaultValue={props.OnEditItem.dueDate}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="EditNote"
                ref={props.registerEdit}
                defaultValue={props.OnEditItem.note}
              />
            </Form.Group>
            <div className="itemBtnCon">
              <Button
                block
                variant="primary"
                onClick={() => {
                  props.submitingEdit();
                }}
              >
                Submit
              </Button>
            </div>
            <br></br>
            <div className="itemBtnCon">
              <Button
                block
                variant="secondary"
                onClick={props.StartEditItemOff}
              >
                cancel
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
export default EditItem;
