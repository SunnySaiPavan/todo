import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';

const apiUrl = 'http://localhost:8000/api/tasks';

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    async function fetchTasks() {
      try {
          const response = await axios.get(apiUrl);
          setTasks(response.data);
      } catch (error) {
          console.error('Error fetching tasks:', error);
      }
  }
    
    useEffect(() => {
        fetchTasks();
    }, []);


    const addTask = async () => {
        if (newTask.trim()) {
            try {
                console.log("apiUrl : ", apiUrl);
                const response = await axios.post(apiUrl, { "title": newTask });
                setTasks([...tasks, response.data]);
                setNewTask('');
                fetchTasks();
            } catch (error) {
                console.error('Error adding task:', error);
            }
        }
    };

    const toggleTask = async (id, title, completed) => {
        const response = await axios.patch(`${apiUrl}/${id}`, {title, completed });
        setTasks(tasks.map(task => task._id === id ? response.data : task));
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await axios.delete(`${apiUrl}/${id}`);
        setTasks(tasks.filter(task => task._id !== id));
        fetchTasks();
    };

    return (
        <div className="App">
            <h1>To-Do List</h1>
            <input 
                type="text"
                placeholder="New Task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>
            <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
        </div>
    );
}

export default App