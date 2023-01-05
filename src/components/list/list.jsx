import React, { Component } from "react";
import ListItem from "../listitem/list_item";

class List extends Component {
  render() {
    const { todoArray, handleDelete } = this.props;
    return (
      <ul className="task-list list-group list-group">
        {todoArray.map((item, index) => {
          return (
            <ListItem key={index} id={index} handleDelete={handleDelete}>
              {item}
            </ListItem>
          );
        })}
      </ul>
    );
  }
}

export default List;
