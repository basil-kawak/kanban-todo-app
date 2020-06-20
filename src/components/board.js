import { Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form"; // npm i react-hook-form ***********1
import fire from "./../containers/db";
import uid from "uid";
import Modal from "./modal";
import AddBoardBtn from "./addBoardBtn";
import AddItem from "./addItem";
import Item from "./item";
import EditItem from "./editItem";
import BoardsList from "./boardsList";

const Board = () => {
  const [FormOn, setFormOn] = useState("");
  const [Board, setBoard] = useState([]);
  const [ModalOn, setModalOn] = useState(false);
  const [InputState, setInputState] = useState("");
  const [EditItemState, setEditItemState] = useState({ open: false });
  const [OnEditItem, setOnEditItem] = useState({});
  const [View, setView] = useState(true);
  const [SortedBoard, setSortedBoard] = useState([]); // Why this work

  var date = new Date();
  var fullDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} | ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  const sortByTitle = () => {
    Board.sort((a, b) => {
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }
      return -1;
    });
    setSortedBoard("title"); // Why this work if i set any state white calling this fun sorting work with our setting any state it does not work
  };

  const sortByDate = () => {
    Board.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      return -1;
    });
    setSortedBoard("date"); // Why this work if i set any state white calling this fun sorting work with our setting any state it does not work
  };

  // fetching the Data reuseable function
  const fetchData = async () => {
    const res = await fire.collection("posts").get(); //[]
    const posts = await res.docs.map((post) => post.data());
    await posts.sort((a, b) => {
      if (a.dateStamp < b.dateStamp) {
        return 1;
      }
      return -1;
    });
    setBoard(posts);
  };

  //handle the board function to add new board
  const addBoard = async (e) => {
    e.preventDefault();
    const uniID = uid();
    let newBoard;
    // if Board is empty
    if (Board.length === 0) {
      newBoard = await [
        {
          id: uniID,
          title: InputState,
          date: fullDate,
          dateStamp: Date.now(),
          cardList: [],
        },
      ];
      setBoard(newBoard);
      const insert = await fire.doc(`posts/${newBoard[0].id}`).set(newBoard[0]);
    } else {
      newBoard = await {
        id: uniID,
        title: InputState,
        date: fullDate,
        dateStamp: Date.now(),
        cardList: [],
      };

      const insertnow = await fire.doc(`posts/${newBoard.id}`).set(newBoard);
      setBoard([newBoard, ...Board]);
    }
    setModalOn(false);
  };

  const deleteBoard = async (id) => {
    try {
      const deleteFromBase = await fire.collection("posts").doc(id).delete();
      const board = await Board.filter((el) => el.id !== id);
      setBoard(board);
    } catch (err) {
      console.log(err);
    }
  };

  // adding cardList
  const { register, handleSubmit } = useForm();
  //const { registerEdit, handleSubmitEdit } = useForm();
  const onSubmit = async (data) => {
    const uniID = uid();
    const oldBoard1 = await Board.filter((el) => el.id === FormOn);
    const oldBoard = await oldBoard1[0];
    const dataWithStatus = await {
      ...data,
      complated: false,
      id: uniID,
      BoardID: oldBoard.id,
    };
    const newCardList = await [...oldBoard.cardList, dataWithStatus];
    const index = await Board.indexOf(oldBoard);
    const { id, title, date, dateStamp } = await oldBoard;
    const newBoard = await {
      date,
      dateStamp,
      id,
      title,
      cardList: newCardList,
    };
    // update Board state
    const finalData = await [
      ...Board.slice(0, index),
      newBoard,
      ...Board.slice(index + 1),
    ];
    setBoard(finalData);
    const saveDate = await fire.collection("posts").doc(FormOn).update({
      cardList: newCardList,
    });
    setFormOn("");
  };

  const deleteItem = async (boardId, itemId) => {
    const oldBoard1 = await Board.filter((el) => el.id === boardId);
    const oldBoard = await oldBoard1[0];
    const newCardList = await oldBoard.cardList.filter(
      (el) => el.id !== itemId
    );
    const { id, title, date, dateStamp } = await oldBoard;
    const newBoard = await {
      id,
      title,
      date,
      dateStamp,
      cardList: newCardList,
    };

    // update Board state
    const index = await Board.indexOf(oldBoard);
    const finalData = await [
      ...Board.slice(0, index),
      newBoard,
      ...Board.slice(index + 1),
    ];
    setBoard(finalData);
    const saveDate = await fire
      .collection("posts")
      .doc(boardId)
      .update(newBoard);
  };

  // editItem
  const StartEditItem = (board, item) => {
    setEditItemState({
      open: true,
      board,
      item,
    });
    setOnEditItem(item);
  };
  // handling edit submiting
  const submitingEdit = async (data) => {
    // get item from EditItemState
    const oldItem = await EditItemState.item;
    const oldBoard = await EditItemState.board;
    const newItem = await {
      ...oldItem,
      title: data.EditTitle,
      assignedTo: data.EditAssignTo,
      dueDate: data.EditDueDate,
      note: data.EditNote,
    };

    const ItemIndex = await oldBoard.cardList.indexOf(oldItem);
    const BoardIndex = await Board.indexOf(oldBoard);

    const newCardList = await [
      ...oldBoard.cardList.slice(0, ItemIndex),
      newItem,
      ...oldBoard.cardList.slice(ItemIndex + 1),
    ];

    const newBoard = await {
      id: oldBoard.id,
      title: oldBoard.title,
      date: oldBoard.date,
      dateStamp: oldBoard.dateStamp,
      cardList: newCardList,
    };

    const finalData = await [
      ...Board.slice(0, BoardIndex),
      newBoard,
      ...Board.slice(BoardIndex + 1),
    ];

    setBoard(finalData);
    setOnEditItem({});
    setEditItemState({ open: false });
    const saveDate = fire
      .collection("posts")
      .doc(oldBoard.id)
      .update({ cardList: newCardList });
  };
  const StartEditItemOff = () => {
    setEditItemState({ open: false });
  };
  //turn modal on/off
  const SwitchModal = () => {
    setModalOn(!ModalOn);
  };
  //turn modal off
  const ModalOff = () => {
    setModalOn(false);
  };
  // get value od add Board input
  const getBoardInputData = (e) => {
    setInputState(e.target.value);
  };

  const emptyForm = () => {
    setFormOn("");
  };
  const assignForm = (id) => {
    setFormOn(id);
  };
  const markAsCompleted = async (oldBoard, oldItem) => {
    // get item from EditItemState
    const newItem = await {
      ...oldItem,
      complated: true,
    };

    const ItemIndex = await oldBoard.cardList.indexOf(oldItem);
    const BoardIndex = await Board.indexOf(oldBoard);

    const newCardList = await [
      ...oldBoard.cardList.slice(0, ItemIndex),
      newItem,
      ...oldBoard.cardList.slice(ItemIndex + 1),
    ];

    const newBoard = await {
      id: oldBoard.id,
      title: oldBoard.title,
      date: oldBoard.date,
      dateStamp: oldBoard.dateStamp,
      cardList: newCardList,
    };

    const finalData = await [
      ...Board.slice(0, BoardIndex),
      newBoard,
      ...Board.slice(BoardIndex + 1),
    ];

    setBoard(finalData);
    const saveDate = fire
      .collection("posts")
      .doc(oldBoard.id)
      .update({ cardList: newCardList });
  };

  const taggelView = () => {
    setView(!View);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="con">
      <Modal
        SwitchModal={SwitchModal}
        ModalOff={ModalOff}
        ModalOn={ModalOn}
        getBoardInputData={getBoardInputData}
        addBoard={addBoard}
      />
      <AddBoardBtn
        SwitchModal={SwitchModal}
        sortByDate={sortByDate}
        sortByTitle={sortByTitle}
        taggelView={taggelView}
        View={View}
      />

      {View ? (
        <div>
          {" "}
          <div className="boardcon">
            {Board.map((board) => {
              return (
                <div key={uid()}>
                  <Card
                    key={uid()}
                    style={{ width: "25rem" }}
                    className="cards"
                  >
                    <AddItem
                      board={board}
                      FormOn={FormOn}
                      emptyForm={emptyForm}
                      assignForm={assignForm}
                      register={register}
                      submiting={handleSubmit(onSubmit)}
                      deleteBoard={deleteBoard}
                    />

                    <Card.Body>
                      <Card.Title>{board.title}</Card.Title>
                      <Card.Title>{board.date}</Card.Title>
                      <Item
                        board={board}
                        deleteItem={deleteItem}
                        StartEditItem={StartEditItem}
                        markAsCompleted={markAsCompleted}
                      />
                      <EditItem
                        EditItemState={EditItemState}
                        StartEditItemOff={StartEditItemOff}
                        OnEditItem={OnEditItem}
                        registerEdit={register}
                        submitingEdit={handleSubmit(submitingEdit)}
                      />
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <BoardsList Board={Board} taggelView={taggelView} />
        </div>
      )}
    </div>
  );
};
export default Board;
