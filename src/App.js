import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import './App.css';
import DateHourPicker from './Components/DateHourPicker';
import Home from './Components/Home';
import {AuthProvider} from './Components/Auth';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <AuthProvider >
    <Router>
    <div className="container mt-5">
    {/*   <div className="btn-group">
        <Link to="/" className="btn btn-dark">Inicio</Link>
        <Link to="/bla" className="btn btn-dark">Bla bla bla</Link>
        <NavLink to="/users" className="btn btn-dark" activeClassName="active">Users</NavLink>
      </div>
      <hr /> */}
      <Switch><PrivateRoute path="/" exact>

          <Home />

        </PrivateRoute>
        <Route path="/track">
        <DateHourPicker />
        </Route>
      </Switch>
    </div>
  </Router>
  </AuthProvider>

  );
}

export default App;
