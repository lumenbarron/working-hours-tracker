import React from "react";
import { NavLink } from "react-router-dom";
import { logo } from "../Images/logo-time.png";
import "../Styles/navlink.scss";

export default function NavLinkHome() {
  return (
    <div className="logo-container">
      <NavLink to="/">
        <div className="logo-time"></div>
      </NavLink>
    </div>
  );
}
