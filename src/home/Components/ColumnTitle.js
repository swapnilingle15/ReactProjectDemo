import React from "react";

const iconForOrder = order => {
  switch (order) {
    case "ASC":
      return "fa-sort-asc";
    case "DESC":
      return "fa-sort-desc";
    default:
      return "fa-sort";
  }
};

const ColumnTitle = ({ onClick, label = "", order }) => (
  <div className={`col-xs-3`} onClick={onClick}>
    {label.toUpperCase() + " "}
    <i className={`fa ${iconForOrder(order)}`} aria-hidden="true" />
  </div>
);

export default ColumnTitle;
