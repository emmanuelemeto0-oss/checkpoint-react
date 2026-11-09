function MovieCard({ movie }) {
  return (
    <article className="movie-card">
      <div className="poster-wrap">
        <img
          className="movie-poster"
          src={movie.posterURL}
          alt={`${movie.title} poster`}
          loading="lazy"
        />
        <span className="poster-rating">
          <span aria-hidden="true">★</span> {Number(movie.rating).toFixed(1)}
        </span>
      </div>
      <div className="movie-info">
        <h3 title={movie.title}>{movie.title}</h3>
        <p>{movie.description}</p>
      </div>
    </article>
  );
}

export default MovieCard;
