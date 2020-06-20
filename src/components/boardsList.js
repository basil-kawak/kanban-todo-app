import uid from "uid";
import React, { useState, useEffect } from "react";
import { OverlayTrigger, Popover, Form, Button } from "react-bootstrap";

const BoardsList = (props) => {
  const [ItemsOn, setItemsOn] = useState("");

  const changeItemsOn = (id) => {
    if (id === ItemsOn) {
      setItemsOn("");
    } else {
      setItemsOn(id);
    }
  };

  return (
    <div className="listBoard-con">
      {props.Board.map((board) => (
        <div
          key={uid()}
          className="listBoard"
          onClick={() => changeItemsOn(board.id)}
        >
          <div className="w">{board.title}</div>
          {ItemsOn === board.id ? (
            <div>
              <div className="itemsList-up">
                {board.cardList.map((item) => (
                  <div key={uid()}>
                    {item.complated === false && (
                      <div className="itemsList">{item.title}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default BoardsList;
