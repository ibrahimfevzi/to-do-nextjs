"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../assets/todo.png";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const storedCompletedTodos = localStorage.getItem("completedTodos");
    if (storedCompletedTodos) {
      setCompletedTodos(JSON.parse(storedCompletedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  }, [completedTodos]);

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };
  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const currentDate = new Date();
      const options = { hour: "numeric", minute: "numeric" };
      const timeString = currentDate.toLocaleTimeString(undefined, options);

      const newTodoItem = {
        id: Date.now(),
        text: newTodo,
        completed: false,
        createdAt: `${currentDate.toLocaleDateString()} ${timeString}`,
      };

      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);

    const updatedCompletedTodos = completedTodos.filter(
      (todo) => todo.id !== id
    );
    setCompletedTodos(updatedCompletedTodos);
  };

  const handleEditTodo = (id) => {
    const selected = todos.find((todo) => todo.id === id);
    setSelectedTodo(selected);
    setNewTodo(selected.text);
  };

  const handleUpdateTodo = () => {
    if (selectedTodo && newTodo.trim() !== "") {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === selectedTodo.id) {
          return { ...todo, text: newTodo };
        }
        return todo;
      });
      setTodos(updatedTodos);
      setSelectedTodo(null);
      setNewTodo("");
    }
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        const updatedTodo = { ...todo, completed: !todo.completed };
        if (updatedTodo.completed) {
          setCompletedTodos((prevCompletedTodos) => [
            ...prevCompletedTodos,
            updatedTodo,
          ]);
        } else {
          setCompletedTodos((prevCompletedTodos) =>
            prevCompletedTodos.filter(
              (completedTodo) => completedTodo.id !== id
            )
          );
        }
        return updatedTodo;
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center gap-2 mb-4">
        <Image
          src={logo}
          alt="Logo"
          className="mb-4"
          style={{ width: "60px" }}
        />

        <h1 className="text-2xl font-bold mb-4">Todo App Free</h1>
      </div>
      <div className="flex mb-2">
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Yapılacak..."
          className="w-full rounded-l py-2 text-black px-4 border border-gray-300 text-lg"
        />
        {selectedTodo ? (
          <button
            onClick={handleUpdateTodo}
            className="bg-yellow-500 text-white px-4 rounded-r"
          >
            Güncelle
          </button>
        ) : (
          <button
            onClick={handleAddTodo}
            className="bg-blue-500 text-white px-4 rounded-r"
          >
            Ekle
          </button>
        )}
      </div>
      <h2 className="text-xl font-bold  mt-4 mb-2">
        Yapılacaklar ({todos.length - completedTodos.length})
      </h2>
      <ul className="list-disc   pl-4">
        {todos.map((todo) => {
          if (!todo.completed) {
            return (
              <li key={todo.id} className="mb-2 flex items-center flex-wrap">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                  className="appearance-none h-6 w-6 rounded-md border border-gray-300 checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span
                  className={`flex-grow ${
                    todo.completed ? "line-through" : ""
                  } text-lg ml-2`}
                >
                  {todo.text}
                </span>
                <span className="text-xs text-gray-500  pr-3">
                  {todo.createdAt}
                </span>
                <button
                  onClick={() => handleEditTodo(todo.id)}
                  className="text-blue-500 text-lg"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="text-red-500 text-lg ml-2"
                >
                  Sil
                </button>
              </li>
            );
          }
          return null;
        })}
      </ul>
      <h2 className="text-xl font-bold mt-4 mb-2">
        Tamamlananlar ({completedTodos.length})
      </h2>{" "}
      <ul className="list-disc pl-4">
        {completedTodos.map((todo) => (
          <li key={todo.id} className="mb-2 flex items-center flex-wrap">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
              className="appearance-none h-6 w-6 rounded-md border border-gray-300 checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              className={`flex-grow ${
                todo.completed ? "line-through" : ""
              } text-lg ml-2`}
            >
              {todo.text}
            </span>
            <span className="text-xs text-gray-500">{todo.createdAt}</span>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="text-red-500 text-lg ml-2"
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
