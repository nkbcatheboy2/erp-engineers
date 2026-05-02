import React from 'react';

function TaskList({ tasks, employees, onEdit, onDelete, isAdmin }) {
  const getEmployeeName = (employeeId) => {
    return employees.find(e => e.id === employeeId)?.name || 'Unknown';
  };

  const getStatusBadge = (status) => {
    const badgeClass = {
      'pending': 'badge-pending',
      'in-progress': 'badge-in-progress',
      'completed': 'badge-completed'
    };
    const statusLabel = {
      'pending': 'Pending',
      'in-progress': 'In Progress',
      'completed': 'Completed'
    };
    return <span className={`badge ${badgeClass[status]}`}>{statusLabel[status]}</span>;
  };

  const calculateDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (tasks.length === 0) {
    return <div className="empty-state"><h3>No tasks assigned</h3></div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Task ID</th>
          <th>Task Name</th>
          {isAdmin && <th>Assigned To</th>}
          <th>Status</th>
          <th>End Date</th>
          <th>Days Remaining</th>
          {isAdmin && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => {
          const daysRemaining = calculateDaysRemaining(task.endDate);
          const isOverdue = daysRemaining < 0;

          return (
            <tr key={task.id} style={isOverdue ? { background: '#fee2e2' } : {}}>
              <td><strong>{task.id}</strong></td>
              <td>{task.name}</td>
              {isAdmin && <td>{getEmployeeName(task.assignedTo)}</td>}
              <td>{getStatusBadge(task.status)}</td>
              <td>{task.endDate}</td>
              <td style={{ color: isOverdue ? '#dc2626' : '#10b981', fontWeight: '600' }}>
                {isOverdue ? `${Math.abs(daysRemaining)} days overdue` : `${daysRemaining} days left`}
              </td>
              {isAdmin && (
                <td>
                  <button className="btn btn-sm btn-primary" onClick={() => onEdit(task)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => onDelete(task.id)} style={{ marginLeft: '5px' }}>
                    Delete
                  </button>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TaskList;