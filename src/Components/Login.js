import React, { Component, useCallback, useContext } from "react";
import app from "../firebase";

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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div>
        <h1>Log in</h1>
        <form>
          <label>
            Email
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </label>
          <button type="submit" onClick={this.login}>
            Log in
          </button>
        </form>
      </div>
    );
  }
}
