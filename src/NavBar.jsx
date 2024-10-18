import React from "react";
import logo from "./images/freshcart-logo.svg";

export default function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fw-bold fixed-top ">
        <div className="container">
          <div className="navbar-brand">
            <img className="img-fluid" src={logo} alt="logo" />
          </div>
        </div>
      </nav>
    </>
  );
}
