import React, { useState } from "react";

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
      <input value={newTodo} onChange={handleTodoChange}></input>
      <button type="submit">add</button>
    </form>
  );
};

const TodoList = ({ todoList, handleTaskComplete }) => {
  if (todoList.length < 1) {
    return <><br></br>No Task</>;
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

    if(!newTodo.length) {
      alert("Cannot add empty task");
    }

    const newTask = {
      task: newTodo,
      isComplete: false,
    };

    settodoList(todoList.concat(newTask));
    setNewTodo("");
  };

  const handleTaskComplete = (todo) => {
    settodoList(todoList.filter((query) => query !== todo));
    setCompleteList(completedList.concat(todo));
  };

  return (
    <div>
      <h1> Todo List </h1>
      <Input
        newTodo={newTodo}
        handleTodoChange={handleTodoChange}
        addTodo={addTodo}
      />
      <TodoList todoList={todoList} handleTaskComplete={handleTaskComplete} />
      <h1>Completed Task</h1>
      <Completed completedList={completedList} />
    </div>
  );
};

export default App;
