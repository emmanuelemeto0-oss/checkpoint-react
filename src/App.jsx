import { useEffect, useState } from "react";
import AddMovie from "./components/AddMovie.jsx";
import Filter from "./components/Filter.jsx";
import MovieList from "./components/MovieList.jsx";
import "./App.css";

const starterMovies = [
  {
    id: 1,
    title: "The Grand Budapest Hotel",
    description:
      "A legendary concierge and his young protégé become tangled in a story of theft, family, and a priceless painting.",
    posterURL:
      "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
    rating: 8.1,
  },
  {
    id: 2,
    title: "Interstellar",
    description:
      "A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.",
    posterURL:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    rating: 8.7,
  },
  {
    id: 3,
    title: "Spider-Man: Into the Spider-Verse",
    description:
      "Miles Morales discovers that there is more than one Spider-Man and that the multiverse is in danger.",
    posterURL:
      "https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
    rating: 8.4,
  },
  {
    id: 4,
    title: "No Country for Old Men",
    description:
      "A hunter stumbles upon a drug deal gone wrong and finds himself pursued by a relentless killer.",
    posterURL:
      "https://image.tmdb.org/t/p/w500/6d5XOczc226jECq0LIX0siKtgHR.jpg",
    rating: 7.6,
  },
];

function App() {
  const [movies, setMovies] = useState(() => {
    try {
      const savedMovies = window.localStorage.getItem("frame-movies");
      return savedMovies ? JSON.parse(savedMovies) : starterMovies;
    } catch {
      return starterMovies;
    }
  });
  const [titleFilter, setTitleFilter] = useState("");
  const [minimumRating, setMinimumRating] = useState("0");

  useEffect(() => {
    window.localStorage.setItem("frame-movies", JSON.stringify(movies));
  }, [movies]);

  function addMovie(movie) {
    setMovies((currentMovies) => [
      { ...movie, id: Date.now() },
      ...currentMovies,
    ]);
  }

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(titleFilter.trim().toLowerCase()) &&
      movie.rating >= Number(minimumRating),
  );

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="The Frame home">
          <span className="brand-mark" aria-hidden="true">
            F
          </span>
          <span>THE FRAME</span>
        </a>
        <span className="topbar-note">
          <span className="status-dot" /> YOUR PERSONAL WATCHLIST
        </span>
      </header>
      <main id="home">
        <section className="intro container-fluid">
          <div className="intro-copy">
            <p className="eyebrow">
              A LITTLE LESS SCROLLING, A LOT MORE CINEMA
            </p>
            <h1>
              Your next
              <br />
              favorite <span>film.</span>
            </h1>
            <p className="intro-description">
              A home for the stories you love and the ones you haven't found
              yet.
            </p>
          </div>
          <div className="intro-art" aria-hidden="true">
            <div className="film-reel reel-one" />
            <div className="film-reel reel-two" />
            <span className="art-caption">
              NOW SHOWING
              <br />
              AT YOUR PLACE
            </span>
          </div>
        </section>
        <section
          className="library container-fluid"
          aria-label="Your movie collection"
        >
          <div className="library-heading">
            <div>
              <p className="eyebrow">THE COLLECTION</p>
              <h2>
                On your watchlist{" "}
                <span className="movie-count">
                  {movies.length.toString().padStart(2, "0")}
                </span>
              </h2>
            </div>
          </div>
          <div className="library-layout">
            <div className="browse-column">
              <Filter
                titleFilter={titleFilter}
                onTitleChange={setTitleFilter}
                minimumRating={minimumRating}
                onRatingChange={setMinimumRating}
              />
              <MovieList movies={filteredMovies} />
            </div>
            <aside className="add-column">
              <AddMovie onAddMovie={addMovie} />
            </aside>
          </div>
        </section>
      </main>
      <footer className="footer container-fluid">
        <span>
          THE FRAME <span className="footer-separator">/</span> A COLLECTION OF
          GOOD STORIES
        </span>
        <span>MADE FOR MOVIE NIGHTS</span>
      </footer>
    </div>
  );
}

export default App;
