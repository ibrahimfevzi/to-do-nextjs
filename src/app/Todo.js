"use client";
import { useState } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, newTodo]);
      setNewTodo("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo Uygulaması</h1>
      <div className="flex mb-2">
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          className="w-full rounded-l py-2 px-4 border  text-black border-gray-300"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 rounded-r"
        >
          Ekle
        </button>
      </div>
      <ul className="list-disc pl-4">
        {todos.map((todo, index) => (
          <li key={index} className="mb-2">
            {todo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
