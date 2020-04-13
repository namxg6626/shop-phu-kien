import React from "react";
import HeaderAndNavBar from "./components/HeaderAndNavBar";
import Home from "./pages/Home";
import "./App.scss";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HeaderAndNavBar />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
