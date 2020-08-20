import React, { Component } from "react";
import app from "../firebase";

export default class SignUp extends Component {
  state = {
    email: "",
    password: "",
  };
  signUp = (event) => {
    event.preventDefault();
    app
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        console.log(user);
        alert('Congratulations! You create your account')
      })
      .catch((error) => {
        console.log(error);
        alert(error)
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
        <h1>Sign Up</h1>
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
          <button type="submit" onClick={this.signUp}>
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}
