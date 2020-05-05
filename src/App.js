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
      <HeaderAndNavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/id/:id" component={Single} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/login" component={Login} />
      </Switch>
      <Footer />
    </UserProvider>
  );
}

export default App;
