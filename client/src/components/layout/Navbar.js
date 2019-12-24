import React, { Component } from "react";
import { NavLink,Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { FaMoneyBillWave } from 'react-icons/fa';

import "./Navbar.css";

class Navbar extends Component {
 
  

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();

  };

  render() {
    
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <a href="/" className="navbar-brand"><FaMoneyBillWave/> Expense-Tracker</a>
      <button type="button" className="navbar-toggler bg-info" data-toggle="collapse" data-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
      </button>
  
      <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav">
              <li data-toggle="collapse" data-target="#navbarCollapse">
              <NavLink to="/account" className="nav-item nav-link "  >Account</NavLink>
                </li>
                <li data-toggle="collapse" data-target="#navbarCollapse">
              <NavLink to="/dashboard" className="nav-item nav-link "  >Dashboard</NavLink>
                </li>
                <li data-toggle="collapse" data-target="#navbarCollapse">
              <NavLink to="/transactions" className="nav-item nav-link "  >Transactions</NavLink>
                </li>


          </div>
          <div className="navbar-nav ml-auto">
          {this.props.auth.isAuthenticated ? (<button onClick={this.onLogoutClick} className="text-white btn btn-info">Logout</button>) :  (<Link to=
          "/login" className="btn btn-info">Login</Link>) }

          </div>
      </div>
  </nav>
    );
  }
}
Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(Navbar);
