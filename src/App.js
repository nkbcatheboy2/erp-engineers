import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import EmployeePanel from './components/EmployeePanel';

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);

  
  useEffect(() => {
    const sampleEmployees = [
      {
        id: 1,
        name: 'Raj Kumar',
        mobile: '+91-9876543210',
        email: 'raj.kumar@company.com',
        photo1: 'https://via.placeholder.com/150?text=Raj+Kumar',
        photo2: 'https://via.placeholder.com/150?text=RK',
        salary: 50000,
        salaryHistory: [
          { month: 'Jan 2026', amount: 50000, document: 'Salary_Jan_2026.pdf' },
          { month: 'Feb 2026', amount: 50000, document: 'Salary_Feb_2026.pdf' },
          { month: 'Mar 2026', amount: 50000, document: 'Salary_Mar_2026.pdf' },
        ],
        workHistory: [
          { date: '2024-01-15', event: 'Joined as Junior Developer' },
          { date: '2025-06-20', event: 'Promoted to Senior Developer' },
          { date: '2026-03-10', event: 'Project Lead Assignment' },
        ],
      },
      {
        id: 2,
        name: 'Priya Singh',
        mobile: '+91-8765432109',
        email: 'priya.singh@company.com',
        photo1: 'https://via.placeholder.com/150?text=Priya+Singh',
        photo2: 'https://via.placeholder.com/150?text=PS',
        salary: 55000,
        salaryHistory: [
          { month: 'Jan 2026', amount: 55000, document: 'Salary_Jan_2026.pdf' },
          { month: 'Feb 2026', amount: 55000, document: 'Salary_Feb_2026.pdf' },
          { month: 'Mar 2026', amount: 55000, document: 'Salary_Mar_2026.pdf' },
        ],
        workHistory: [
          { date: '2023-05-10', event: 'Joined as Designer' },
          { date: '2024-12-05', event: 'Promoted to Senior Designer' },
          { date: '2026-02-28', event: 'Design Lead' },
        ],
      },
      {
        id: 3,
        name: 'Amit Patel',
        mobile: '+91-7654321098',
        email: 'amit.patel@company.com',
        photo1: 'https://via.placeholder.com/150?text=Amit+Patel',
        photo2: 'https://via.placeholder.com/150?text=AP',
        salary: 45000,
        salaryHistory: [
          { month: 'Jan 2026', amount: 45000, document: 'Salary_Jan_2026.pdf' },
          { month: 'Feb 2026', amount: 45000, document: 'Salary_Feb_2026.pdf' },
          { month: 'Mar 2026', amount: 45000, document: 'Salary_Mar_2026.pdf' },
        ],
        workHistory: [
          { date: '2025-03-01', event: 'Joined as Frontend Developer' },
          { date: '2026-01-15', event: 'Completed React Training' },
        ],
      },
    ];

    const sampleTasks = [
      {
        id: 'T001',
        name: 'Build Login Module',
        assignedTo: 1,
        status: 'in-progress',
        endDate: '2026-05-15',
        createdDate: '2026-04-20',
      },
      {
        id: 'T002',
        name: 'Design Dashboard UI',
        assignedTo: 2,
        status: 'pending',
        endDate: '2026-05-20',
        createdDate: '2026-04-22',
      },
      {
        id: 'T003',
        name: 'Database Optimization',
        assignedTo: 3,
        status: 'completed',
        endDate: '2026-04-25',
        createdDate: '2026-04-18',
      },
      {
        id: 'T004',
        name: 'API Integration',
        assignedTo: 1,
        status: 'pending',
        endDate: '2026-05-30',
        createdDate: '2026-04-25',
      },
    ];

    setEmployees(sampleEmployees);
    setTasks(sampleTasks);
  }, []);

  const handleLogin = (role, username) => {
    if (role === 'admin' && username === 'admin123') {
      setUser({ role: 'admin', username });
    } else if (role === 'employee' && username === 'emp123') {
      
      setUser({ role: 'employee', employeeId: 1, username });
    } else {
      alert('Invalid credentials!');
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const addTask = (taskData) => {
    const newTask = {
      id: `T${String(tasks.length + 1).padStart(3, '0')}`,
      ...taskData,
      createdDate: new Date().toISOString().split('T')[0],
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (taskId, updatedData) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, ...updatedData } : t));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      {user.role === 'admin' ? (
        <AdminPanel
          user={user}
          onLogout={handleLogout}
          tasks={tasks}
          employees={employees}
          onAddTask={addTask}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
        />
      ) : (
        <EmployeePanel
          user={user}
          onLogout={handleLogout}
          tasks={tasks.filter(t => t.assignedTo === user.employeeId)}
          employee={employees.find(e => e.id === user.employeeId)}
        />
      )}
    </div>
  );
}

export default App;
