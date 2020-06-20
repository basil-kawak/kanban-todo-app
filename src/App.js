import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navigation from "./components/navigation";
import CompletedBoards from "./components/board";
import UnCompletedBoards from "./components/complete";
import Err404 from "./components/err404";
import Footer from "./components/footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="app">
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route path="/" component={CompletedBoards} exact={true} />
            <Route
              path="/completedboards"
              component={UnCompletedBoards}
              exact={true}
            />
            <Route component={Err404} />
          </Switch>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
