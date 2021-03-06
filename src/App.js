import React from "react";
import HeaderAndNavBar from "./components/HeaderAndNavBar";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import { UserProvider } from "./UserContext";
import "./App.scss";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <UserProvider>
      <Switch>
        <Route exact path="/">
          <HeaderAndNavBar />
          <Home />
          <Footer />
        </Route>
        <Route exact path="/id/:id">
          <HeaderAndNavBar />
          <Single />
          <Footer />
        </Route>
        <Route exact path="/cart">
          <HeaderAndNavBar />
          <Cart />
          <Footer />
        </Route>
        <Route exact path="/login">
          <HeaderAndNavBar />
          <Login />
        </Route>
      </Switch>
    </UserProvider>
  );
}

export default App;
