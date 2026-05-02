import React, { useState } from 'react';
import TaskList from './TaskList';

function EmployeePanel({ user, onLogout, tasks, employee }) {
  const [activeTab, setActiveTab] = useState('profile');

  if (!employee) {
    return <div className="container"><h2>Employee not found</h2></div>;
  }

  const calculateDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="container">
      <div className="header">
        <h1>👤 Employee Panel</h1>
        <div className="header-right">
          <span className="user-info">Welcome, {employee.name}</span>
          <button className="btn btn-secondary" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="card">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            👤 Profile
          </button>
          <button
            className={`tab ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            📋 Tasks ({tasks.length})
          </button>
          <button
            className={`tab ${activeTab === 'salary' ? 'active' : ''}`}
            onClick={() => setActiveTab('salary')}
          >
            💰 Salary
          </button>
          <button
            className={`tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            📈 Work History
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'profile' && (
            <div className="profile-card">
              <img src={employee.photo1} alt={employee.name} className="profile-photo" />
              <h2>{employee.name}</h2>
              <div className="profile-info">
                <p><strong>Email:</strong> {employee.email}</p>
                <p><strong>Mobile:</strong> {employee.mobile}</p>
                <p><strong>Salary:</strong> ₹{employee.salary.toLocaleString()}</p>
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <TaskList tasks={tasks} employees={[employee]} isAdmin={false} />
          )}

          {activeTab === 'salary' && (
            <table>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Amount</th>
                  <th>Document</th>
                </tr>
              </thead>
              <tbody>
                {employee.salaryHistory.map((entry, idx) => (
                  <tr key={idx}>
                    <td>{entry.month}</td>
                    <td>₹{entry.amount.toLocaleString()}</td>
                    <td>
                      <button className="btn btn-sm btn-primary">
                        📥 {entry.document}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'history' && (
            <div>
              {employee.workHistory.map((item, idx) => (
                <div key={idx} style={{
                  padding: '15px',
                  borderLeft: '3px solid #667eea',
                  marginBottom: '15px',
                  background: '#f9fafb',
                  borderRadius: '6px'
                }}>
                  <p><strong>{item.date}</strong></p>
                  <p>{item.event}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeePanel;