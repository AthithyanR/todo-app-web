import React, { useEffect, useRef, useState } from 'react'
import { createTodo, deleteTodo, getAllTodos } from './api';
import './App.css'
import '@picocss/pico/css/pico.css';

import { Todo } from './api';
import TodoComponent from './Todo';

function App() {
  const [loading, setLoading] = useState<Boolean>(true);
  // const [createButtonLoading, setCreateButtonLoading] = useState<Boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  const calledRef = useRef<Boolean>(false);
  const contentRef = useRef<HTMLInputElement>(null);

  const fetchTodos = async () => {
    setLoading(true);
    const allTodos = await getAllTodos()
    setTodos(allTodos.data);
    setLoading(false);
  };

  useEffect(() => {
    if (!calledRef.current) {
      fetchTodos();
    }
    calledRef.current = true;
  }, []);

  const handleCreateTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!contentRef.current?.value) {
      return;
    }
    const newTodoPayload = {
      content: contentRef.current.value,
    };
    (e.target as HTMLButtonElement)['ariaBusy'] = "true";
    const createdTodo = await createTodo(newTodoPayload);
    (e.target as HTMLButtonElement)['ariaBusy'] = "false";
    setTodos((prev) => [createdTodo.data, ...prev]);
    contentRef.current.value = '';
  };

  const delTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const deleteUid = (e.target as HTMLButtonElement).name;
    (e.target as HTMLButtonElement)['ariaBusy'] = "true";
    await deleteTodo(deleteUid);
    (e.target as HTMLButtonElement)['ariaBusy'] = "false";
    setTodos((todos) => todos.filter(t => t.uid !== deleteUid));
  };

  return (
    <div className="App">
      <form className="input-form">
          <input className="todo-input" type="text" ref={contentRef} placeholder="todo content..." required aria-required />
          <button className="todo-submit-btn" type="submit" onClick={handleCreateTodo}>Create</button>
      </form>
      <div>
        {loading
          ? <div className="d-flex-all">loading...</div>
          : todos.map((t) => <TodoComponent todo={t} delTodo={delTodo} />)}
      </div>
    </div>
  )
}

export default App
