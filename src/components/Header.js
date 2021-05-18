import React from "react";
import starlink_logo from "../assets/images/starlink_logo.svg";

const Header = () => {
  return (
    <header className="App-header">
      <img src={starlink_logo} className="App-logo" alt="logo" />
      <p className="title">Starlink Tracker</p>
    </header>
  );
};

export default Header;
