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
          <li>{query.task}</li>
        </div>
      ))}
    </ul>
  );
};

const Input = ({ newTodo, addTodo, handleTodoChange }) => {
  return (
    <form onSubmit={addTodo}>
      <input className="todo-input" value={newTodo} onChange={handleTodoChange}></input>
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
          <li>
            {todo.task}{" "}
            <button
              onClick={() => {
                handleTaskComplete(todo);
              }}
            >
              complete
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
    settodoList(todoList.filter((query) => query !== todo));
    setCompleteList(completedList.concat(todo));
  };

  return (
    <div className="App">
      <h1> What needs to be done? </h1>
      {todoList.length} tasks
      <Input
        newTodo={newTodo}
        handleTodoChange={handleTodoChange}
        addTodo={addTodo}
      />
      <TodoList todoList={todoList} handleTaskComplete={handleTaskComplete} />
      <br />
      <h1>Completed Task</h1>
      <Completed completedList={completedList} />
    </div>
  );
};

export default App;
