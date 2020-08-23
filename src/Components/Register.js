import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import "../Styles/register.scss";
import "../Styles/home.scss";

export default function Register() {
  return (
      <div className="container-fluid container-home">
        <div className="row">
          <div className="col-12 col-lg-6 flex-all mb-5">
            <Login />
          </div>
          <div className="col-12 col-lg-6 flex-all mb-5">
            <SignUp />
          </div>
        </div>
      </div>
  );
}
