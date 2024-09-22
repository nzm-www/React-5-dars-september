// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { MdOutlineDeleteOutline } from "react-icons/md";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput('');
      inputRef.current.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (

    <div className='backgraund'>
      <div className='flex justify-center pt-10'>
        <div className=" absolute w-96   flex flex-col	items-center	">
          <div className="mb-4 gap-2 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              ref={inputRef}
              className="border-solid border-2   bg-stone-100		p-2 rounded-md	pr-20  text-black	 "
              placeholder="Enter..."
            />
            <button onClick={addTodo} className="bg-blue-500 text-white p-2   rounded-md	 fond-bold">Add</button>
          </div>
          <p className="mb-4 text-white">Total tasks: {todos.length}</p>
          <ul className="list-disc ">
            {todos.map((todo, index) => (
              <li key={index} className="flex justify-between items-center mb-2 p-2 text-white	 w-96  boder-none rounded-xl	 bg-zinc-700	">
                <span>{todo}</span>
                <button onClick={() => deleteTodo(index)} className=" text-white text-xl	 hover:bg-red-700 hover:p-2 hover:duration-500	rounded-md	"><MdOutlineDeleteOutline />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;