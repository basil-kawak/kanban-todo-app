import React from "react";
import { Card, ButtonGroup, ToggleButton, DropdownButton, Dropdown, Form, Button } from "react-bootstrap";
import uid from "uid";
const Item = (props) => {
  return (
    <div>
      {props.board.cardList.map((item) => (
        <div key={uid()}>
          {item.complated === false && (
            <Card style={{ width: "100%" }}>
          
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Title>{item.assignedTo}</Card.Title>
                <Card.Text className="centerTxt">{item.dueDate}</Card.Text>
                <Card.Text className="centerTxt">{item.note}</Card.Text>
              </Card.Body>
              <ButtonGroup toggle className="mb-2">
                <ToggleButton
                  type="checkbox"
                  defaultChecked
                  onClick={() => props.markAsCompleted(props.board, item)}
                >
                  Complated
                </ToggleButton>

                <ToggleButton
                  type="checkbox"
                  defaultChecked
                  value="1"
                  variant="warning"
                  onClick={() => props.StartEditItem(props.board, item)}
                >
                  Edit
                </ToggleButton>

                <ToggleButton
                  type="checkbox"
                  defaultChecked
                  value="1"
                  variant="danger"
                  onClick={() => props.deleteItem(props.board.id, item.id)}
                >
                  Delete
                </ToggleButton>
              </ButtonGroup>
            </Card>
          )}
        </div>
      ))}
    </div>
  );
};
export default Item;
