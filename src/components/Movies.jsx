import React from 'react';
import Card from 'react-bootstrap/Card';

const Movies = ({ movies }) => {
  return (
    <div className="movies-container">
      <h2>Movies for {movies[0]?.city}</h2>
      <div className="movies-list">
        {movies.map((movie, index) => (
          <Card key={index} style={{ width: '18rem' }}>
            <Card.Body className={styles.movieCard}>
              <Card.Title>{movie.title}</Card.Title>
              <img src={movie.image_url} alt={movie.title} />
              <div className="movie-details">
                <p>{movie.overview}</p>
                <p>Released on: {movie.released_on}</p>
                <p>Popularity: {movie.popularity}</p>
                <p>Total votes: {movie.total_votes}</p>
                <p>Average votes: {movie.average_votes}</p>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Movies;
