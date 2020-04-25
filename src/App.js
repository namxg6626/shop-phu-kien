import React from "react";
import HeaderAndNavBar from "./components/HeaderAndNavBar";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Footer from "./components/Footer";
import "./App.scss";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HeaderAndNavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/id/:id" component={Single} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
