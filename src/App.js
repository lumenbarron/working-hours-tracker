import React, { Component } from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import DateHourPicker from "./Components/DateHourPicker";
import Register from "./Components/Register";
import NavLinkHome from './Components/NavLink';
import Home from "./Components/Home";
import app from "./firebase";

export default class App extends Component {
  state = {
    user: {},
    userId : ''
  };
  componentDidMount() {
    this.authLister();
  }

  authLister = () => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user : user, userId : user.uid });
      } else {
        this.setState({ user: null, userId : '' });
      }
    });
  };
  render() {
    return (
      <Router>
        <div>
          {this.state.user ? (
            <div>
              <DateHourPicker userId={this.state.userId}/>
            </div>
          ) : (
            <div>
              <NavLinkHome />
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
