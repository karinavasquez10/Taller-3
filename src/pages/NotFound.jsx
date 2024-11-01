import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>La página que estás buscando no existe.</p>
      <Link to="/home">Vover al inicio</Link>
    </div>
  );
};

export default NotFound;