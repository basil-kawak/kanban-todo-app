import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form"; // npm i react-hook-form
import fire from "./../containers/db";
import { Card, Button } from "react-bootstrap";
import uid from "uid";

// main function (component)
const Board = () => {
  const [Text, setText] = useState([]);
  const [InputState, setInputState] = useState("");
  const [swichList, setswichList] = useState("");

  //handle the board function to add new board
  const handleClick = (e) => {
    e.preventDefault();
    const uniID = uid();
    fire.doc(`posts/${uniID}`).set({
      id: uniID,
      title: InputState,
      cardList: [],
    });
    setText((prevState) => [
      ...prevState,
      {
        id: uniID,
        title: InputState,
        cardList: [],
      },
    ]);
  };

  // fetching the Data reuseable function
  const fetchData = async () => {
    const res = await fire.collection("posts").get(); //[]
    const posts = res.docs.map((post) => post.data());
    setText(posts);
  };
  // updating card list and after that calling fetchData function to render content as soon as you submit
  const updateCardList = async (id, oldObj, newList) => {
    const sareDate = await fire.collection("posts").doc(id).update({
      cardList: newList,
    });

    //get position of index in Text state
    const index = await Text.indexOf(oldObj);

    //update Obj
    const newObj = await { ...oldObj, cardList: newList };

    // update Text state
    const finalData = await [
      ...Text.slice(0, index),
      newObj,
      ...Text.slice(index + 1),
    ];
    setText(finalData);
  };

  // adding th list to the card and calling the update function and the update function calls the fetchData function that things re-render as soon as an update happen
  const AddListCard = (props) => {
    // handling list submission
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
      const cardid = `${props.cardUid}input`;
      const newList = [...props.privList, data.input];
      updateCardList(props.cardUid, props.el, newList); // calling update and passing id of the board we want to update and the new list we want to save
      setswichList("");
    };
    // adding list to board component
    return (
      <div className="formInCard" id={`${props.cardUid}form`}>
        {swichList === props.cardUid && (
          <div className="form-con">
            <form onSubmit={handleSubmit(onSubmit)}>
              AddListCard
              <input
                type="text"
                id={`${props.cardUid}input`}
                name="input"
                ref={register}
              />
              <button type="submit">Create</button>
            </form>
            <button onClick={(e) => setswichList("")}>close form</button>
          </div>
        )}
        <button onClick={(e) => setswichList(props.cardUid)}>Open form</button>
        <p>{props.cardUid}</p>
      </div>
    );
  };

  // deleteData just for development reason
  const deleteData = () => {
    fire.collection("posts").doc("8ecwc1nwmzn").delete();
  };

  // main component
  const BoardCon = () => {
    return (
      <div>
        {Text.map((el) => (
          <Card style={{ width: "18rem" }} key={el.id} className="board">
            <Card.Body>
              <Card.Title>{el.title}</Card.Title>
              <Card.Text>{el.note}</Card.Text>

              <div>
                {el.cardList.map((list) => (
                  <p key={list}>{list}</p>
                ))}
                {<AddListCard el={el} privList={el.cardList} cardUid={el.id} />}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <BoardCon />
      <div>
        <form onSubmit={handleClick} id="add-app">
          <label>Board Name : </label>
          <input type="text" onChange={(e) => setInputState(e.target.value)} />
          <button type="submit">Create</button>
        </form>

        <button onClick={deleteData}>delete</button>
      </div>
    </div>
  );
};
export default Board;





<Modal
onRequestClose={() => setModalOn(false)}
id="yourAppElement"
isOpen={ModalOn}
contentLabel="Selected Option"
>
<div className="boardFormCon">
  <Form className="boardForm">
    <Form.Group controlId="formBasicEmail">
      <Form.Control
        type="text"
        placeholder="Title"
        onChange={(e) => setInputState(e.target.value)}
      />
    </Form.Group>

    <div className="itemBtnCon">
      <Button variant="primary" onClick={addBoard} type="submit">
        Submit
      </Button>
      <Button variant="secondary" onClick={() => setModalOn(!ModalOn)}>
        cancel
      </Button>
    </div>
  </Form>
</div>
</Modal>

<div className="boardsCon">
  <div className="cards">
    <Button variant="primary" onClick={() => setModalOn(!ModalOn)}>
      Add a Board
    </Button>
  </div>
  /** start of board */
  {Board.map((board) => (
    <Card key={uid()} style={{ width: "25rem" }} className="cards">
      <AddItem boardID={board.id} />
      <Card.Body>
        <Card.Title>{board.title}</Card.Title>
        /** start of boardItem */
        {board.cardList.map((item) => (
          <Card key={uid()} style={{ width: "100%" }}>
            <Card.Body>
              <Card.Title>this is the title</Card.Title>
              <Card.Text>this is the Note</Card.Text>
            </Card.Body>
            <ButtonGroup toggle className="mb-2">
              <ToggleButton type="checkbox" defaultChecked value="1">
                Mark as complated
              </ToggleButton>
            </ButtonGroup>
          </Card>
        ))}
        /** end of boardItem */
      </Card.Body>
    </Card>
  ))}
  /** end of board */
</div>




















.orderBy("title", "desc")









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










onRequestClose={props.ModalOff}
isOpen={props.ModalOn}
contentLabel="Selected Option"
closeTimeoutMS={500}