import React, { Component } from "react";
import * as Unicons from "@iconscout/react-unicons";

class ListItem extends Component {
  componentWillUnmount() {
    console.log("the element will be destroy");
  }
  render() {
    const { id, children, handleDelete } = this.props;
    return (
      <li className="list-group-item d-flex justify-content-between">
        {children}
        <Unicons.UilTrashAlt
          onClick={() => {
            if (
              window.confirm(`Are You sure to delete the task ${children} `)
            ) {
              handleDelete(id);
            }
          }}
        />
      </li>
    );
  }
}

export default ListItem;
