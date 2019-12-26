import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Select, MenuItem } from "@material-ui/core";

import axios from "axios";
import "./Table.css";

import MaterialTable, { MTableToolbar } from "material-table";

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, transactions: [], userCategories: [] };
    let user = this.props.auth.user.name;
    axios
      .get(`/api/transactions/${user}`)
      .then(res =>
        this.setState({ loading: false, transactions: res.data.reverse() })
      );
    axios.get("/api/categories").then(res => {
      this.setState({ userCategories: res.data.map(x => x.category) });
    });
  }

  handleDelete(index){
    let id = this.state.transactions[index]._id;
    axios.delete(`/api/transactions/${id}`).then(()=>{
      this.setState(
        {
          transactions: this.state.transactions.filter(
            x => x._id !== id
          )
        } )
    })
  }


  render() {
    return (
      <div className="h-100">
        {this.state.loading ? (
          <div
            className="mx-auto spinner-border justify-content-center"
            role="status"
          >
            <span className=" sr-only">Loading...</span>
          </div>
        ) : (
          <div>
            <div className="container-fluid d-none d-md-block overflow-auto h-100">
              <MaterialTable
                className="overflow-auto"
                editable={{
                  onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        newData.user = this.props.auth.user.name;
                        console.log(newData);
                        axios.post("/api/transactions/", newData);
                        this.state.transactions.push(newData);
                        axios
                          .get(`/api/transactions/${this.props.auth.user.name}`)
                          .then(res => {
                            this.setState(
                              { transactions: res.data.reverse() },
                              () => {
                                resolve();
                                console.log(this.state);
                              }
                            );
                          });

                        resolve();
                      }, 1000);
                    }),

                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        axios
                          .put(`/api/transactions/${newData._id}`, newData)
                          .then(() => {
                            this.setState(prevState => {
                              let trans = prevState.transactions;
                              let oldObj = trans.find(
                                x => x._id === newData._id
                              );
                              Object.assign(oldObj, newData);
                              return { transactions: trans };
                            });
                          });

                        resolve();
                      }, 1000);
                    }),
                  onRowDelete: rowData =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        axios.delete(`/api/transactions/${rowData._id}`).then(
                          this.setState(
                            {
                              transactions: this.state.transactions.filter(
                                x => x._id !== rowData._id
                              )
                            },
                            () => resolve()
                          )
                        );

                        resolve();
                      }, 1000);
                    })
                }}
                components={{
                  Toolbar: props => (
                    <div>
                      <MTableToolbar {...props} />
                      <div style={{ padding: "0px 10px" }}>
                        <Link
                          to="AddTransaction"
                          className="btn btn-block btn-primary m-2"
                          style={{ marginRight: 5 }}
                        >
                          Add Transaction
                        </Link>
                      </div>
                    </div>
                  )
                }}
                options={{
                  headerStyle: { position: "sticky", top: 0 },
                  maxBodyHeight: "300px",
                  exportButton: true,
                  grouping: true,
                  actionsColumnIndex: -1
                }}
                columns={[
                  {
                    title: "Cost",
                    field: "cost",
                    type: "numeric",
                    grouping: false,
                    render: rowData => `$${rowData.cost}`
                  },

                  { title: "Description", field: "description" },
                  {
                    title: "Date",
                    field: "date",
                    type: "date",
                    defaultSort: "desc"
                  },
                  {
                    title: "Category",
                    field: "category",
                    editComponent: t => {
                      console.log(this.state.userCategories);
                      this.currentEditingTarget = t.value;
                      return (
                        <Select
                          defaultValue={t.value ? t.value : ""}
                          onChange={e => {
                            t.onChange(e.target.value);
                            // console.group(e.target.value);
                            this.currentEditingTarget = e.target.value;
                          }}
                        >
                          {this.state.userCategories.map((x, index) => (
                            <MenuItem key={index} value={x}>
                              {x}
                            </MenuItem>
                          ))}
                        </Select>
                      );
                    },
                    addComponent: t => {
                      console.log(this.state.userCategories);
                      this.currentEditingTarget = t.value;
                      return (
                        <Select
                          value={t.value ? t.value : ""}
                          onChange={e => {
                            t.onChange(e.target.value);
                            // console.group(e.target.value);
                            this.currentEditingTarget = e.target.value;
                          }}
                        >
                          {this.state.userCategories.map((x, index) => (
                            <MenuItem key={index} value={x}>
                              {x}
                            </MenuItem>
                          ))}
                        </Select>
                      );
                    }
                  }
                ]}
                data={Array.from(this.state.transactions)}
                title="Transactions"
              />
            </div>
            <div className="container-fluid d-block d-md-none overflow-auto h-100">
              <Link to="/addTransaction" className="btn btn-block btn-primary m-2">
                Add Transaction
              </Link>
              <div className="table-responsive m-2">
                <table className="table-dark table table-striped">
                  <tbody>
                    {this.state.transactions.map((t, index) => {
                      let date = new Date(t.date).toDateString()
                      return (
                        
                        <tr key={index}className="p-2">
                          <td> 
                          Cost: {t.cost} 
                          <br/>
                          Description: {t.description}
                          <br/>
                          Date: {date} 
                          <br/>
                          Category: {t.category}
                          
                          </td>
                          <td ><button onClick={()=> this.handleDelete(index)} className="btn-danger my-auto btn ">Delete</button></td>
                         </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
Transactions.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Transactions);
