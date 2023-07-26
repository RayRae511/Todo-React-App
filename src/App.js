import React, { useState, useEffect } from 'react';

const KEY = 'todos';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem(KEY);
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (event) => {
    event.preventDefault();
    const newTodo = event.target.elements.todo.value;
    if (newTodo) {
      setTodos([...todos, { text: newTodo, isComplete: false }]);
      event.target.elements.todo.value = '';
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleEditTodo = (index, newText) => {
    const newTodos = [...todos];
    const todo = newTodos[index];
    newTodos[index] = { ...todo, text: newText };
    setTodos(newTodos);
  };

  const handleToggleTodo = (index) => {
    const newTodos = [...todos];
    const todo = newTodos[index];
    newTodos[index] = { ...todo, isComplete: !todo.isComplete };
    setTodos(newTodos);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleNewTodo}>
        <input type="text" name="todo" />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo, index) => {
          return (
            <li key={index}>
              <input
                type="text"
                value={todo.text}
                onChange={(event) => handleEditTodo(index, event.target.value)}
              />
              <button onClick={() => handleDeleteTodo(index)}>X</button>
              <input
                type="checkbox"
                checked={todo.isComplete}
                onChange={() => handleToggleTodo(index)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;