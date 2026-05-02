import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function AdminPanel({ user, onLogout, tasks, employees, onAddTask, onUpdateTask, onDeleteTask }) {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      onUpdateTask(editingTask.id, taskData);
      setEditingTask(null);
    } else {
      onAddTask(taskData);
    }
    setShowTaskForm(false);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDeleteTask(taskId);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>👨‍💼 Admin Panel</h1>
        <div className="header-right">
          <span className="user-info">Welcome, Admin</span>
          <button className="btn btn-secondary" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>📋 Task Management</h2>
          <button className="btn btn-primary" onClick={() => {
            setEditingTask(null);
            setShowTaskForm(true);
          }}>
            + New Task
          </button>
        </div>

        <TaskList
          tasks={tasks}
          employees={employees}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          isAdmin={true}
        />
      </div>

      {showTaskForm && (
        <TaskForm
          task={editingTask}
          employees={employees}
          onSave={handleSaveTask}
          onClose={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}

export default AdminPanel;