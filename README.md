# The kanban-todo-app
In general, this project involve working on an app that has a concept of "boards" and "board items".
Here are Some examples of things in similar categories
are:

* To-do list
* [Kanban board](https://en.wikipedia.org/wiki/Kanban_board)

## Used Technologies
* Connecting to a backend with Firebase
* Modeling data (Bootstrap)
* ReactJS

## Code
* Only function components is used
* **hooks** are used as well

## Data

* A user can create a **board/list**. Conceptually, a board/list
  that contain many items that a user can add.
* For each board, a user can add **board items/tasks**. 
* Board items have:
   * A due date
   * A title
   * A boolean flag for completd or not completed
   * An assignee (someone it is assigned to). It can be any random string that
     the user wants.
   
## Functionalaty

* **Theme and framework**: Used Bootstrap 
  [React-Bootstrap](https://react-bootstrap.github.io/),
  Installed the package using `npm`.
* **Routing**: Used [react-router](https://reacttraining.com/react-router/) to
  navigate to different pages.
* **Sorting within a given board.** A user can sort by title and
  due date, both ascending and descending.
* **Completed tasks.** Completed tasks are not shown on the main boards.
  When a task is marked completed,it will be shown in a separated page that loads all the
  completed tasks.
* **Navbar**: The navbar has: "home page" (board
  overview), "about", and "completed."
* **Editing an existing task**: A user can edit and save any
  properties of a task, such as title and due dates.
* **Deletion of board and board item**: A user can delete any
  board or board item.
* **Toggle display type**: There is a button that allows users to toggle
  between "list" and "board" views of all the boards.
