import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setTodos([...todos, {
      id: crypto.randomUUID(),
      text: newTodo.trim(),
      completed: false
    }]);
    setNewTodo('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <form onSubmit={addTodo} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-[#00F5D4]"
            maxLength={100}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#0084FF] text-white rounded-lg hover:bg-[#0084FF]/80 transition-colors"
          >
            Add
          </button>
        </div>
      </form>

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {todos.map(todo => (
          <div
            key={todo.id}
            className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-5 h-5 rounded border-white/30 bg-transparent checked:bg-[#00F5D4]"
            />
            <span className={`flex-1 ${todo.completed ? 'line-through text-white/50' : 'text-white'}`}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="p-1 text-white/50 hover:text-white transition-colors"
              aria-label="Delete todo"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}