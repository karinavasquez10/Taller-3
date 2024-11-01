import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import './styles.css';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.currentUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="home-container">
      <nav className="nav-bar">
        <h1>Movie Database</h1>
        <div className="nav-links">
          <button onClick={() => navigate('/results')}>Buscar Peliculas</button>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </nav>
      <div className="welcome-section">
        <h2>Bienvenido, {user?.name}!</h2>
        <p>Explora nuestra base de datos de películas y encuentra tus películas favoritas.</p>
      </div>
    </div>
  );
};

export default Home;