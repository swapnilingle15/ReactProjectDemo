import React, { Component } from "react";
import { connect } from "react-redux";
import { getEmployeesList } from "../network/action";

import Pagination from "react-js-pagination";
import { TableColumns } from "../utils/constant";
import ColumnTitle from "../Components/ColumnTitle";

function sortByKey(array, key) {
  return array.sort(function(a, b) {
    var x = a[key].toLowerCase();
    var y = b[key].toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });
}

class ListPage extends Component {
  state = {
    description: {},
    activePage: 1,
    ListItems: [],
    itemPerPage: 10,
    sortOrder: {
      Field: "",
      Order: ""
    },
    startIndex: 0,
    endIndex: 0
  };
  componentDidMount() {
    const { getEmployeesList, accessToken } = this.props;
    if (accessToken === "success") {
      getEmployeesList(accessToken);
    } else {
      this.props.history.push("/");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (prevProps.data !== this.props.data ||
        prevState.itemPerPage !== this.state.itemPerPage) &&
      this.props.data !== undefined
    ) {
      const { data = {} } = this.props;
      var startIndex = (this.state.activePage - 1) * this.state.itemPerPage;
      var endIndex = Math.min(
        startIndex + this.state.itemPerPage - 1,
        data.length - 1
      );
      var pageOfItems = data.slice(startIndex, endIndex + 1);
      this.setState({
        ListItems: pageOfItems,
        startIndex: startIndex + 1,
        endIndex: endIndex + 1
      });
    }
  }

  handlePageChange = pageNumber => {
    var startIndex = (pageNumber - 1) * this.state.itemPerPage;
    var endIndex = Math.min(
      startIndex + this.state.itemPerPage - 1,
      this.props.data.length - 1
    );
    var pageOfItems = this.props.data.slice(startIndex, endIndex + 1);
    this.setState({
      ListItems: pageOfItems,
      activePage: pageNumber,
      startIndex: startIndex + 1,
      endIndex: endIndex + 1
    });
  };

  searchEmployee = e => {
    const { value } = e.target;
    if (value !== "" && value !== null) {
      var updatedList = this.state.ListItems;
      updatedList = updatedList.filter(function(item) {
        return item.name.toLowerCase().search(value.toLowerCase()) !== -1;
      });
      this.setState({ ListItems: updatedList });
    } else {
      this.handlePageChange(this.state.activePage);
    }
  };

  onSelect = e => {
    const { value } = e.target;
    this.setState({
      itemPerPage: parseInt(value, 10)
    });
  };

  logout = () => {
    sessionStorage.setItem("Authorization", "");
    this.props.history.push("/");
  };

  sortColumnByKey(key) {
    let listItems = this.state.ListItems;
    listItems = sortByKey(this.state.ListItems, key);
    this.setState({
      sortedKey: key
    });
    if (this.state.isTableSorted) {
      this.setState({
        isTableSorted: false
      });
      listItems = listItems.reverse();
    }
    if (this.state.isTableSorted === undefined) {
      this.setState({
        isTableSorted: true
      });
    }
    if (this.state.isTableSorted === false) {
      this.setState({
        isTableSorted: true
      });
    }

    this.setState({
      ListItems: listItems
    });
  }

  render() {
    const { data = {} } = this.props;

    const listData = this.state.ListItems;
    return (
      <div>
        <div className="logout-section">
          <button className="btn btn-primary" onClick={this.logout}>
            <i class="fa fa-sign-out" />
            LOGOUT
          </button>
        </div>
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <div className="pull-left">
              Show{" "}
              <select name="count" onChange={this.onSelect}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
              </select>{" "}
              entries
            </div>
            <div className="pull-right">
              Search By Employee Name:{" "}
              <input type="text" onChange={this.searchEmployee} />
            </div>
          </div>
          <div className="table-header-top clearfix">
            {TableColumns.EmployeeList.map(({ label, field }) => (
              <ColumnTitle
                key={field}
                label={label}
                order={
                  field === this.state.sortOrder.Field &&
                  this.state.sortOrder.Order
                }
                onClick={() => {
                  this.sortColumnByKey(field);
                }}
              />
            ))}
          </div>
          {listData.map((item, key) => (
            <div key={key} className="table-row clearfix">
              <div className="col-xs-3">{item.id}</div>

              <div className="col-xs-3">{item.name || "--"}</div>
              <div className="col-xs-3">{item.salary || "--"}</div>
              <div className="col-xs-3">{item.age}</div>
            </div>
          ))}
          <div className="table-header-bottom clearfix">
            {TableColumns.EmployeeList.map(({ label, field }) => (
              <ColumnTitle
                key={field}
                label={label}
                order={
                  field === this.state.sortOrder.Field &&
                  this.state.sortOrder.Order
                }
                onClick={() => {
                  this.sortColumnByKey(field);
                }}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <div className="pull-left">
              showing {this.state.startIndex} to {this.state.endIndex} of{" "}
              {data.length} entries.{" "}
            </div>
            <div className="pull-right">
              <Pagination
                prevPageText="prev"
                nextPageText="next"
                firstPageText="first"
                lastPageText="last"
                activePage={this.state.activePage}
                itemsCountPerPage={this.state.itemPerPage}
                totalItemsCount={data.length}
                onChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const reducerState = state => {
  const token = sessionStorage.getItem("Authorization");
  return {
    accessToken: state.accessToken || token,
    data: state.employeeData
  };
};

const dispatchToProps = {
  getEmployeesList
};

export default connect(reducerState, dispatchToProps)(ListPage);
