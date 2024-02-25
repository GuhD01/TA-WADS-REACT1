import { useState } from "react"; //States
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";


function App() {
  const [todos, setTodos] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!newItem.trim()) return;

    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), title: newItem, completed: false },
    ]);

    setNewItem("");
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: completed } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  function toggleEdit(id) {
    setEditingId(id);
    const todo = todos.find((todo) => todo.id === id);
    setEditedTitle(todo.title);
  }

  function handleEdit(id) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => (todo.id === id ? { ...todo, title: editedTitle } : todo))
    );
    setEditingId(null);
  }

  return (
    <>
      <form className="new-item-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="item">New item</label>
          <input
            type="text"
            id="item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        </div>

        <button className="btn" type="submit">
          <span>Add</span>
        </button>
      </form>

      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center my-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                className="checkbox"
              />
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="edit-input" 
                  autoFocus
                />
              ) : (
                <span className={`ml-2 ${todo.completed ? 'line-through' : ''}`}>{todo.title}</span>
              )}
            </div>
            <div>
            <button 
              type="button"
              onClick={() => toggleEdit(todo.id)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700 transition duration-300 ease-in-out"
            >
              <span>Edit</span>
            </button>
            <button 
              type="button"
              onClick={() => deleteTodo(todo.id)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700 transition duration-300 ease-in-out ml-2"
            >
              <span>Delete</span>
            </button>
            {editingId === todo.id && (
              <button 
                type="button"
                onClick={() => handleEdit(todo.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700 transition duration-300 ease-in-out ml-2"
              >
                <span>Save</span>
              </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;




