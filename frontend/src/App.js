import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const apiBase = 'http://"YOUR_AWS_IP":30000'; // AWS IP 

  const fetchTodos = () => {
    axios.get(`${apiBase}/todos`).then(res => setTodos(res.data));
  };

  useEffect(() => { fetchTodos(); }, []);

  const addTodo = () => {
    axios.post(`${apiBase}/todos`, { task }).then(() => {
      setTask('');
      fetchTodos();
    });
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Kubernetes To-Do App</h1>
      <input value={task} onChange={e => setTask(e.target.value)} placeholder="Yeni görev..." />
      <button onClick={addTodo}>Ekle</button>
      <ul>
        {todos.map(t => <li key={t.id}>{t.task}</li>)}
      </ul>
    </div>
  );
}
export default App;