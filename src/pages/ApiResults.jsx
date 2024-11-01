import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const ApiResults = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Lista de IDs de películas populares
  const popularMovieIds = [
    'tt3896198', // Guardians of the Galaxy
    'tt0468569', // The Dark Knight
    'tt0167260', // Lord of the Rings
    'tt0133093', // The Matrix
    'tt0109830', // Forrest Gump
    'tt0110357', // The Lion King
    'tt0114369', // Se7en
    'tt0076759', // Star Wars
  ];

  // Cargar películas populares al iniciar
  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      try {
        const movies = await Promise.all(
          popularMovieIds.map(async (id) => {
            const response = await fetch(
              `http://www.omdbapi.com/?i=${id}&apikey=eda51466`
            );
            const data = await response.json();
            return data;
          })
        );
        setPopularMovies(movies);
      } catch (err) {
        setError('Error al cargar películas populares');
        console.error(err);
      }
      setLoading(false);
    };

    fetchPopularMovies();
  }, []);

  // Función para buscar películas
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setSearchResults(null);
    setError('');

    try {
      const response = await fetch(
        `http://www.omdbapi.com/?t=${searchQuery}&apikey=eda51466`
      );
      const data = await response.json();
      
      if (data.Response === "False") {
        setError('¡Película no encontrada!');
        setSearchResults(null);
      } else {
        setSearchResults(data);
        setError('');
      }
    } catch (err) {
      setError('Error al buscar la película');
      console.error(err);
    }
    
    setLoading(false);
  };

  const MovieCard = ({ movie }) => (
    <div className="movie-card">
      <img 
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'} 
        alt={movie.Title} 
        className="movie-poster" 
      />
      <div className="movie-info">
        <h2>{movie.Title}</h2>
        <p><strong>Year:</strong> {movie.Year}</p>
        <p><strong>Director:</strong> {movie.Director}</p>
        <p><strong>Plot:</strong> {movie.Plot}</p>
        <p><strong>Rating:</strong> {movie.imdbRating}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Actors:</strong> {movie.Actors}</p>
      </div>
    </div>
  );

  return (
    <div className="results-container">
      <nav className="nav-bar">
        <h1>Pelispedia</h1>
        <button onClick={() => navigate('/home')}>Volver a Inicio</button>
      </nav>

      {/* Sección de búsqueda */}
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a movie..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Buscar
          </button>
        </form>
      </div>

      {/* Mostrar error si existe */}
      {error && <div className="error-message">{error}</div>}

      {/* Mostrar loading si está cargando */}
      {loading && <div className="loading">Loading...</div>}

      {/* Mostrar resultados de búsqueda */}
      {searchResults && (
        <div className="search-results">
          <h2 className="section-title">Resultado de la búsqueda</h2>
          <MovieCard movie={searchResults} />
        </div>
      )}

      {/* Mostrar películas populares */}
      <div className="popular-movies">
        <h2 className="section-title">Peliculas Populares</h2>
        {popularMovies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default ApiResults;