import { Card, ButtonGroup, ToggleButton } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import fire from "./../containers/db";
import uid from "uid";
import CompletedItem from "./completedItem";

const Board = () => {
  const [Items, setItems] = useState([]);

  // fetching the Data reuseable function
  const fetchData = async () => {
    const res = await fire.collection("posts").orderBy("title", "desc").get(); //[]
    const posts = res.docs.map((post) => post.data());

    const data = posts.map((board) => board.cardList);
    let completedItems = [];
    const rows = data.length;

    for (let i = 0; i < rows; i++) {
      let items = data[i].length;
      for (let n = 0; n < items; n++) {
        if (data[i][n].complated === true) {
          completedItems = [...completedItems, data[i][n]];
        }
      }
    }
    setItems(completedItems);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="items-con">
      {Items.map((item) => (
        <div className="items" key={uid()}>
          {
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text className="centerTxt">{item.assignedTo}</Card.Text>
                <Card.Text className="centerTxt">{item.dueDate}</Card.Text>
                <Card.Text className="centerTxt">{item.note}</Card.Text>
                <Card.Text className="centerTxt">{item.complated}</Card.Text>
              </Card.Body>
            </Card>
          }
        </div>
      ))}
    </div>
  );
};
export default Board;
