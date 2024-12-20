import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === 'admin' && password === 'admin123') {
            onLogin();
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div style={{
            backgroundColor: '#AEC6CF',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
                <h3 className="text-center mb-4" style={{ width: '100%' }}>
                    Admin Login
                </h3>
                <div className="card p-5" style={{
                    width: '30rem',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                    borderRadius: '15px',
                    backgroundColor: '#FAF9F6',
                }}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-4">
                            <input
                                type="text"
                                id="username"
                                placeholder='Username'
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-4">
                            <input
                                type="password"
                                id="password"
                                placeholder='Password'
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            <b>Login</b>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
