import React, { Component } from "react";
import app from "../firebase";
import swal from "sweetalert";

export default class SignUp extends Component {
  state = {
    userName: "",
    email: "",
    password: ""
  };

  signUp = (event) => {
    event.preventDefault();
    app
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        console.log(user);
        swal("Congratulations!", "You create your account", "success");
        this.saveData();
      })
      .catch((error) => {
        console.log(error);
        swal(
          "What happend?",
          "Check if the email address has right formatted or if your password is more than six characters",
          "error"
        );
      });
  };

  saveData = () => {
    let user = app.auth().currentUser;
    if (user) {
      app.firestore().collection("users").doc(user.uid).set({
        userName : this.state.userName,
        email : this.state.email,
        password : this.state.password,
        id : user.uid
      }).then (() => {
        console.log("Document successfully written!");
      }).catch ( (error) => console.log(error))
    }
    
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div className="login-container">
        <h1 className="title-home mt-2">Sign Up</h1>
        <form className="form-group">
        <label className="label-input mt-3">
            Name
            <input
              className="form-input"
              name="userName"
              type="email"
              onChange={this.handleChange}
              value={this.state.userName}
            />
          </label>
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
          </label>
          <p className="p-password">*six characters or more</p>
          <button
            type="submit"
            onClick={this.signUp}
            className="btn button-register mt-3"
          >
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}
