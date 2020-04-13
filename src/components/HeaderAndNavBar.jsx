import React from "react";
import logo from "../assets/logo/logo.png";

export default function HeaderAndNavBar() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <img src={logo} alt="logo" />
        </div>
        <input type="checkbox" name="open-nav" id="open-nav" />

        <ul className="header__nav">
          <li className="header__item">Home</li>
          <li className="header__item">about</li>
          <li className="header__item">store</li>
          <li className="header__item">featured</li>
          <li className="header__item">blog</li>
          <li className="header__item">contact</li>
        </ul>

        <div className="header__toggle-nav">
          <span>Memu</span>
          <label htmlFor="open-nav">
            <i className="fas fa-bars"></i>
          </label>
        </div>
      </div>
    </header>
  );
}
