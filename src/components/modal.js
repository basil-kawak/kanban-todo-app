
import React from "react";
import { Form, Button } from "react-bootstrap";
import Modal from "react-modal"; // npm i react-modal || npmjs.com/package/react-modal
Modal.setAppElement("#root"); // to avoid the warning

const OurModal = (props) => {
  // console.log(props.ModalOn);

  return (
    <div>
      <Modal
        onRequestClose={props.ModalOff}
        isOpen={props.ModalOn}
        contentLabel="Selected Option"
        closeTimeoutMS={500}
      >
        <div>
          <h1 className="centerTxt mar-top">Welcome to the Add Board Modal</h1>
          <h3 className="centerTxt">Please edit and hit the submit button </h3>
        </div>
        <div className="boardFormCon">
          <Form className="boardForm">
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Title"
                onChange={props.getBoardInputData}
              />
            </Form.Group>

            <div className="itemBtnCon">
              <Button
                variant="primary"
                type="submit"
                onClick={props.addBoard}
                block
              >
                Submit
              </Button>
            </div>

            <br></br>
            <div className="itemBtnCon">
              <Button variant="secondary" onClick={props.SwitchModal} block>
                cancel
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default OurModal;