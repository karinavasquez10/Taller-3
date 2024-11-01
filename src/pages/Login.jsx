import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../store/authSlice';
import './styles.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.auth.users);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      dispatch(login(user));
      navigate('/home');
    } else {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
        ¿No tienes una cuenta? <Link to="/register">Registrate</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;