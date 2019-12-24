import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Account.css";
import AccountsCard from "./AccountsCard"
import CategoriesCard from "./CategoriesCard"

class Account extends Component {




  render() {
    return (
      <div className="full-height">
        <div id="card-grid" className="row h-100">
        <div className="col-xs-12 col-md-6"><CategoriesCard/></div>
        <div className="col-xs-12 col-md-6"><AccountsCard /></div>


        </div>
      </div>
    );
  }
}
Account.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Account);
