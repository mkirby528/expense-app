import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Account.css";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

class CategoriesCard  extends Component{
  
  constructor(props) {
    super(props);
    this.renderCategory = this.renderCategory.bind(this);
    this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
    this.handleSaveCategory = this.handleSaveCategory.bind(this);
    this.handleCancelCategory = this.handleCancelCategory.bind(this);
    this.addCategoryInput = React.createRef();

    this.state = {
      categories: undefined,
      categoriesLoading: true,
      categoriesIsEdit: false
    };
    axios.get("/api/categories").then(res => {
      this.setState({ categoriesLoading: false, categories: res.data });
    });
  }

  handleDeleteCategory = index => {
    let id = this.state.categories[index]._id;
    axios.delete(`/api/categories/${id}`).then(res =>
      this.setState({
        categories: this.state.categories.filter(x => x._id !== id)
      })
    );
  };
  handleAddCategoryClick = () => {
    this.setState({ categoriesIsEdit: true });
  };
  renderCategory = (category, index) => {
    return (
      <div key={index} className="row  category    p-1 m-1">
        <div
          style={{ width: "87%" }}
          className="font-weight-normal mr-auto  col-xs-10  text-truncate text-capitalize my-auto"
        >
          {category.category}
        </div>
        <div className="col-xs-2 icon">
          <i
            className="pull-right my-auto"
            onClick={() => this.handleDeleteCategory(index)}
          >
            <FaTrash />
          </i>
        </div>
      </div>
    );
  };
  renderCategoriesCard = () => {
    return (
      <div className="card p-2 h-100 bg-dark text-white">
        <div className="card-header font-weight-bold"> Spending Categories</div>
        <div className="card-body">
          <h5 className="card-text">Categories</h5>
          <div className="category-grid">
            {this.state.categories.map(this.renderCategory)}
          </div>
        </div>
        <div className="card-footer">
          <button
            onClick={this.handleAddCategoryClick}
            className="btn btn-block btn-primary"
          >
            Add
          </button>
        </div>
      </div>
    );
  };
  handleSaveCategory = () => {
    let value = this.addCategoryInput.current.value;
    if (value === "") {
      this.handleCancelCategory();
    } else {
      let user = this.props.auth.user;
      let data = { user: user.name, category: value };
      axios.post("api/categories", data).then(res => {
        this.state.categories.push(res.data);
        this.setState({ categoriesIsEdit: false });
      });
    }
  };
  handleCancelCategory = () => {
    this.setState({ categoriesIsEdit: false });
  };
  renderAddCategoryCard = () => {
    return (
      <div className="card h-100 bg-dark text-white">
        <div className="card-header font-weight-bold"> Add Category </div>
        <div className="card-body my-0 ">
          <h5 className="card-text">Add</h5>
          <div className="form-group m-0">
            <div className="col-xs-12 my-0">
              <textarea
                ref={this.addCategoryInput}
                className="form-control bg-dark text-white"
                id="textArea"
                rows="1"
                placeholder="Category"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button
            onClick={this.handleCancelCategory}
            className="btn btn-block btn-danger"
          >
            Cancel
          </button>
          <button
            onClick={this.handleSaveCategory}
            className="btn btn-block btn-success"
          >
            Save
          </button>
        </div>
      </div>
    );
  };

  render() {
    return( 
      this.state.categoriesLoading ? (
        <div
          className="mx-auto spinner-border justify-content-center"
          role="status"
        >
          <span className=" sr-only">Loading...</span>
        </div> )
         : 
         !this.state.categoriesIsEdit ? (this.renderCategoriesCard()) : (this.renderAddCategoryCard())
    
    );
  }
}

CategoriesCard.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(CategoriesCard);
