import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./Account.css";
// import axios from "axios";


class AccountsCard extends Component{

  
render() {
 
  
return <div className="container">aCCOUNTS</div>;
}

}

AccountsCard.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
)(AccountsCard);