import React, { Component } from "react";
import List from "../list/list";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      todos: [],
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // destructuration
    let { task, todos } = this.state;
    // Ajout du task au tableau
    todos.push(task);
    // Mettre a jour l'etat du tableau et vider le champ de saisie
    this.setState({ todos: todos, task: "" });
    // stockage dans le localsotage
    sessionStorage.setItem("todolist", JSON.stringify(todos));
  };

  handleDelete = (id) => {
    // supprimer l'element de la liste par son id
    let { todos } = this.state;
    todos.splice(id, 1);
    this.setState({ todos: todos });
    // stockage dans le localsotage
    sessionStorage.setItem("todolist", JSON.stringify(todos));
  };

  // composant qui s'execute apres le montage
  componentDidMount() {
    let list = sessionStorage.getItem("todolist")
      ? sessionStorage.getItem("todolist")
      : [];
    this.setState({ todos: JSON.parse(list) });
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("state", this.state, prevState);
    if (this.state.todos.length > prevState.todos.length) {
      return true;
    }
    return false;
  }

  // composant qui s'execute a chaque mise a jour du state composant
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(snapshot);
    let data = sessionStorage.getItem("todolist")
      ? sessionStorage.getItem("todolist")
      : [];
    if (prevState.todos !== JSON.parse(data)) {
      console.log(prevState);
    }
  }

  componentWillUnmount() {
    console.log("clearing");
  }

  render() {
    let { todos, task } = this.state;
    return (
      <div id="todo">
        <h2 className="text-center bg-primary text-white rounded">Todo List</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Add New task"
              value={task}
              onChange={(e) => {
                this.setState({ task: e.target.value });
              }}
            />
            <button type="submit" className="btn btn-info">
              Add
            </button>
          </div>
        </form>
        <h3 className="mt-3 p-2 bg-secondary text-white fs-3 rounded">
          Task List
        </h3>
        <List todoArray={todos} handleDelete={this.handleDelete} />
      </div>
    );
  }
}

export default Todo;
