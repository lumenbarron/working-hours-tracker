import React, { Component } from "react";
import app from "../firebase";
import swal from "sweetalert";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  login = (event) => {
    event.preventDefault();
    app
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        console.log(user);
        swal("Good job!", "Authenticated user!", "success");
      })
      .catch((error) => {
        console.log(error);
        swal(
          "What happend?",
          "Check if you are a registered user or if your password is more than six characters",
          "error"
        );
      });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div className="login-container">
        <h1 className="title-home mt-2">Log in</h1>
        <form className="form-group">
          <label className="label-input mt-3">
            Email
            <input
              className="form-input"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </label>
          <label className="label-input mt-3">
            Password
            <input
              className="form-input"
              name="password"
              type="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
            <p className="p-password">*six characters or more</p>
          </label>
          <button
            type="submit"
            onClick={this.login}
            className="btn button-register mt-3"
          >
            Log in
          </button>
        </form>
      </div>
    );
  }
}
