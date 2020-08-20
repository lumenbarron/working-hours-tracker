import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import DateHourPicker from "./Components/DateHourPicker";
import app from "./firebase";
import "./App.css";
import Register from "./Components/Register";
import Home from "./Components/Home";

export default class App extends Component {
  state = {
    user: {},
  };
  componentDidMount() {
    this.authLister();
  }

  authLister = () => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  };
  render() {
    return (
      <Router>
        <div>
          {this.state.user ? (
            <div>
              <DateHourPicker />
            </div>
          ) : (
            <div>
              <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
              </Switch>
            </div>
          )}
        </div>
      </Router>
    );
  }
}
