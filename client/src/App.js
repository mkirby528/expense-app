import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/layout/Dashboard";
import Account from "./components/layout/Account";
import Transactions from "./components/layout/Transactions";
import AddTransaction from "./components/layout/AddTransaction"


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
            <div className="App">
            <Switch >
              <Route exact path="/login" component={LoginContainer} />
              <Route exact path="/register" component={RegisterContainer} />

              <Route component={DefaultContainer} />
              </Switch>

            </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

const LoginContainer = () => (
  <div className="page-content">
    <Route exact path="/" render={() => <Redirect to="/login" />} />
    <Route path="/login" component={Login} />
  </div>
);
const RegisterContainer = () => (
  <div className="page-content">
    <Route exact path="/" render={() => <Redirect to="/register" />} />
    <Route path="/register" component={Register} />
  </div>
);


const DefaultContainer = () => (
      <div className="page-content">
      <Navbar />
      <div className="inner">
      <Switch>
      <PrivateRoute exact path="/" component={Dashboard} />

      <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/account" component={Account} />
        <PrivateRoute exact path="/transactions" component={Transactions} />
        <PrivateRoute exact path="/addTransaction" component={AddTransaction} />

      </Switch>
      </div>
      </div>
);
export default App;
