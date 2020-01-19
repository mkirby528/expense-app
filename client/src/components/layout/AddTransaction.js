import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import axios from "axios";
import "./AddTransaction.css";

class AddTransaction extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.state = {
      selectedDay: undefined,
      cost: 0,
      description: "",
      category: "",
      userCategories: undefined,
      isExported: true
    };
    axios.get("api/categories").then(res => {
      let userCategories = res.data;
      userCategories = userCategories.map(x => x.category);
      this.setState({
        userCategories: userCategories,
        category: userCategories[0]
      });
    });
  }

  handleDayClick(day) {
    this.setState({ selectedDay: day });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleRadio(event) {
    const isExported = event.currentTarget.value === "true" ? true : false;
    this.setState({ isExported });
    console.log(this.state);

  }
  handleSubmit(event) {
    event.preventDefault();
    let user = this.props.auth.user.name;

    axios.post("/api/transactions", {
      user: user,
      cost: this.state.cost,
      category: this.state.category,
      description: this.state.description,
      date: this.state.selectedDay,
      isExported: this.state.isExported,
    });
    this.props.history.push("/transactions");
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="card h-100 bg-dark m-2 p-2">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="text-white">Date</label>
              <br />
              <DayPickerInput
                dayPickerProps={{
                  todayButton: "Today"
                }}
                className="text-white"
                onDayChange={this.handleDayClick}
              />
            </div>
            <div className="form-group">
              <label className="text-white" htmlFor="costInput">
                Cost
              </label>
              <input
                step=".01"
                type="number"
                name="cost"
                value={this.state.cost}
                onChange={this.handleInputChange}
                className="form-control text-white"
                id="costInput"
                min="1"
                placeholder="Cost eg: 19.99"
              />
            </div>
            <div className="form-group">
              <label className="text-white" htmlFor="descriptionInput">
                Description
              </label>
              <input
                name="description"
                type="text"
                value={this.state.description}
                onChange={this.handleInputChange}
                className="form-control text-white"
                id="descriptionInput"
                placeholder="Description eg: Trader Joes "
              />
            </div>
            <div className="form-group ">
              <label className="text-white" htmlFor="categoryInput">
                Category
              </label>

              {this.state.userCategories !== undefined ? (
                <select
                  className="form-control bg-dark text-white text-capitalize "
                  onChange={this.handleInputChange}
                  name="category"
                  placeholder="Select Category"
                  defaultValue={this.state.userCategories[0]}
                >
                  {this.state.userCategories.map((x, index) => {
                    if (index === 0) {
                      return (
                        <option value={x} key={index}>
                          {x}
                        </option>
                      );
                    } else {
                      return (
                        <option value={x} key={index}>
                          {x}
                        </option>
                      );
                    }
                  })}
                </select>
              ) : (
                <div
                  className="mx-auto spinner-border justify-content-center"
                  role="status"
                >
                  <span className=" sr-only">Loading...</span>
                </div>
              )}
            </div>
            <div className="form-group">
              <label className="text-white">Add to Exports?</label>
              <br></br>
            <div className="btn-group btn-group-toggle">
            <input type="radio" name="true" id="radio-true" value="true" onChange={this.handleRadio} checked={this.state.isExported} /><label htmlFor="radio-true" className="btn btn-radio">True</label>

            <input type="radio" name="false" id="radio-false" value="false" onChange={this.handleRadio} checked={!this.state.isExported} /><label htmlFor="radio-false" className="btn btn-radio">False</label>

  
 
</div>
            </div>

            <input type="submit" value="Submit" className="btn btn-primary" />
          </form>
        </div>
      </div>
    );
  }
}

AddTransaction.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(AddTransaction);
