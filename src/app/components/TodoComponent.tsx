"use client";

import { useEffect, useState } from "react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoComponent({ userId }: { userId: string }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    if (res.ok) {
      const data = await res.json();
      setTodos(data);
    }
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTodo }),
    });

    if (res.ok) {
      setNewTodo("");
      fetchTodos();
    }
  };

  const toggleTodo = async (id: string) => {
    await fetch(`/api/todos/${id}`, { method: "PUT" });
    fetchTodos();
  };

  const deleteTodo = async (id: string) => {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="mt-6">
      <form onSubmit={addTodo} className="flex gap-2 mb-4">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New todo"
          className="flex-1 border rounded px-2 py-1"
        />
        <button type="submit" className="cursor-pointer bg-blue-500 text-white px-4 rounded">
          Add
        </button>
      </form>

      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between items-center border rounded px-3 py-2"
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              className={`cursor-pointer flex-1 ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="cursor-pointer text-red-500 font-bold ml-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
