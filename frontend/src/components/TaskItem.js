import React from 'react';

function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <li style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task._id, task.title, !task.completed)}
      />
      {task.title}
      <button onClick={() => deleteTask(task._id)}>Delete</button>
    </li>
  );
}

export default TaskItem;