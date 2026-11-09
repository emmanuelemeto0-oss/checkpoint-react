import MovieCard from "./MovieCard.jsx";

function MovieList({ movies }) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-mark" aria-hidden="true">
          ∅
        </span>
        <h3>No movies found</h3>
        <p>Try a different title or lower the rating filter.</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;
