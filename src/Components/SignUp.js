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
      <div className='login-container'>
        <h1 className="title-home mt-2">Sign Up</h1>
        <form className='form-group'>
          <label className='label-input mt-3'>
            Email
            <input
              className='form-input'
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </label>
          <label className='label-input mt-3'>
            Password
            <input
              className='form-input'
              name="password"
              type="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </label>
          <button type="submit" onClick={this.signUp} className='btn button-register mt-3'>
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}
