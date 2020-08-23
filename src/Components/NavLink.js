import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/navlink.scss";

export default function NavLinkHome() {
  return (
    <div className="flex-all">
      <NavLink to="/">
        <div className="logo-time"></div>
      </NavLink>
    </div>
  );
}
