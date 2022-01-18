import React, { useState } from "react";
import "./App.css";

const Completed = ({ completedList }) => {
  if (completedList.length < 1) {
    return <></>;
  }

  return (
    <ul>
      {completedList.map((query) => (
        <div key={query.task}>
          {" "}
          <li style={{textDecoration: query.isComplete ? "line-through" : ""}}>{query.task}</li>
        </div>
      ))}
    </ul>
  );
};

const Input = ({ newTodo, addTodo, handleTodoChange }) => {
  return (
    <form className="todo-form" onSubmit={addTodo}>
      <input className="todo-input" value={newTodo} onChange={handleTodoChange} placeholder="What needs to be done?"></input>
    </form>
  );
};

const TodoList = ({ todoList, handleTaskComplete }) => {
  if (todoList.length < 1) {
    return <></>;
  }

  return (
    <ul>
      {todoList.map((todo) => (
        <div key={todoList.indexOf(todo)}>
          <li className="todo-list">
            {todo.task}{" "}
            <button className="complete-btn" variant="outline-success"
              onClick={() => {
                handleTaskComplete(todo);
              }}
            >
              &#128465;
            </button>
          </li>
        </div>
      ))}
    </ul>
  );
};

const App = () => {
  const [todoList, settodoList] = useState([]);
  const [completedList, setCompleteList] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const addTodo = (event) => {
    event.preventDefault();

    if (!newTodo.length) {
      alert("Cannot add empty task");
    } else {
      const newTask = {
        task: newTodo,
        isComplete: false,
      };

      settodoList(todoList.concat(newTask));
    }
    setNewTodo("");
  };

  const handleTaskComplete = (todo) => {
    todo.isComplete = true;
    settodoList(todoList.filter((query) => query !== todo));
    setCompleteList(completedList.concat(todo));
  };

  return (
    <div className="App">
      <h2 id="heading">TODO</h2>
      {todoList.length} tasks
      <Input
        newTodo={newTodo}
        handleTodoChange={handleTodoChange}
        addTodo={addTodo}
      />
      <TodoList todoList={todoList} handleTaskComplete={handleTaskComplete} />
      <br />
      <h4>Completed tasks - {completedList.length} </h4> 
      <Completed completedList={completedList} />
    </div>
  );
};

export default App;
