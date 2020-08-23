import React, { Component } from "react";
import app from "../firebase";
import swal from "sweetalert";

export default class SignOut extends Component {
  signOut = (event) => {
    event.preventDefault();
    app
      .auth()
      .signOut()
      .then(() => {
        swal("See you later!", "","success");
        console.log("saliendo");
      })
      .catch((error) => {
        console.log(error);
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
