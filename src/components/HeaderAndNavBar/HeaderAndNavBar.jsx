import React from "react";
import logo from "../../assets/logo/logo.png";
import { Link } from "react-router-dom";
import "./HeaderAndNavBar.scss";

export default function HeaderAndNavBar() {
  let labelRef = React.createRef();
  const toggleNav = (e) => {
    labelRef.current.click();
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <input type="checkbox" name="open-nav" id="open-nav" />

        <ul className="header__nav">
          <li className="header__item">
            <Link to="/">Home</Link>
          </li>
          <li className="header__item">
            <Link to="/cart">cart</Link>
          </li>
          <li className="header__item">
            <Link to="/login">Login/Register</Link>
          </li>
          <li className="header__item">
            <a href="#1">Featured</a>
          </li>
          <li className="header__item">
            <a href="#1">Blog</a>
          </li>
          <li className="header__item">
            <a href="#1">contact</a>
          </li>
        </ul>

        <div className="header__toggle-nav" onClick={toggleNav}>
          <label htmlFor="open-nav" ref={labelRef} />
          <span>Memu</span>
          <i className="fas fa-bars" />
        </div>
      </div>
    </header>
  );
}
