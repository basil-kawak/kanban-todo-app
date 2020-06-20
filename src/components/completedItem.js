import React from "react";
import { Card} from "react-bootstrap";
import uid from "uid";
const CompletedItem = (props) => {
  return (
    <div>
      {props.board.cardList.map((item) => (
        <div key={uid()}>
          {item.complated === true && (
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text className="centerTxt">{item.dueDate}</Card.Text>
                <Card.Text className="centerTxt">{item.note}</Card.Text>
                <Card.Text className="centerTxt">{item.complated}</Card.Text>
              </Card.Body>
            </Card>
          )}
        </div>
      ))}
    </div>
  );
};
export default CompletedItem;
