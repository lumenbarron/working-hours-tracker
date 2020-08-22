import React, { Component } from "react";
import app from "../firebase";

export default class SignOut extends Component {
  signOut = (event) => {
    event.preventDefault();
    app
      .auth()
      .signOut()
      .then(() => {
        console.log("saliendo");
      })
      .catch(() => {
        console.log();
      });
  };

  render() {
    return (
      <button
        className="btn button-sign-out mt-5"
        type="submit"
        onClick={this.signOut}
      >
        Sign Out
      </button>
    );
  }
}
