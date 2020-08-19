import React, { Component, useCallback, useContext } from "react";
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
      <button type="submit" onClick={this.signOut}>
        Sign Out
      </button>
    );
  }
}
