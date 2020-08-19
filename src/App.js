import React, { Component } from "react";
import DateHourPicker from "./Components/DateHourPicker";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import app from "./firebase";
import "./App.css";

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
      <div>
        <h1>
          {this.state.user ? (
            <div>
              <DateHourPicker />
            </div>
          ) : (
            <div>
              <Login /> <SignUp />
            </div>
          )}
        </h1>
      </div>
    );
  }
}

// <AuthProvider>
// <Router>
//   <div className="container mt-5">
//     <Switch>
//       {/* <PrivateRoute path="/" exact>
//         <Home />
//       </PrivateRoute> */}
//       <Route path="/track">

//       </Route>
//       {/* <Route path="/track">
//         <Login />
//       </Route>
//       <Route path="/track">
//         <SignUp />
//       </Route> */}
//     </Switch>
//   </div>
// </Router>
// </AuthProvider>
