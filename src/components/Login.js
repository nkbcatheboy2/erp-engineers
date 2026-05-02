import React, { useState } from 'react';

function Login({ onLogin }) {
  const [role, setRole] = useState('admin');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(role, password);
    setPassword('');
  };

  return (
    <div className="App">
      <div className="container" style={{ maxWidth: '500px', marginTop: '100px' }}>
        <div className="card">
          <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#667eea' }}>
            📋 Admin-Employee Panel
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Select Role:</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="admin">👨‍💼 Admin</option>
                <option value="employee">👤 Employee</option>
              </select>
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={role === 'admin' ? 'admin123' : 'emp123'}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
              Login
            </button>
          </form>

          <div style={{ marginTop: '30px', padding: '15px', background: '#f3f4f6', borderRadius: '8px' }}>
            <p><strong>Admin Credentials:</strong></p>
            <p>Password: <code>admin123</code></p>
            <p style={{ marginTop: '10px' }}><strong>Employee Credentials:</strong></p>
            <p>Password: <code>emp123</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;