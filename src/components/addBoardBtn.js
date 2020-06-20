import React from "react";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";

const AddBoardBtn = (props) => {
  return (
    <div className="addboard">
      <div className="half-width">
        <Button variant="primary" onClick={props.SwitchModal} block>
          Add a Board
        </Button>
      </div>
      <div className="half-width">
        <DropdownButton
          className="in-half"
          id="dropdown-basic-button"
          title="Sort By"
        >
          <Dropdown.Item onClick={props.sortByTitle}>Title</Dropdown.Item>
          <Dropdown.Item onClick={props.sortByDate}>Date</Dropdown.Item>
        </DropdownButton>
        <Button
          onClick={props.taggelView}
          className="in-half"
          variant="primary"
        >
          {props.View === true? "List": "Board" }
        </Button>
      </div>
    </div>
  );
};
export default AddBoardBtn;
