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
    trailerURL: "https://www.youtube-nocookie.com/embed/1Fg5iWmQjwk",
    posterURL:
      "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
    rating: 8.1,
  },
  {
    id: 2,
    title: "Interstellar",
    description:
      "A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.",
    trailerURL: "https://www.youtube-nocookie.com/embed/zSWdZVtXT7E",
    posterURL:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    rating: 8.7,
  },
  {
    id: 3,
    title: "Spider-Man: Into the Spider-Verse",
    description:
      "Miles Morales discovers that there is more than one Spider-Man and that the multiverse is in danger.",
    trailerURL: "https://www.youtube-nocookie.com/embed/g4Hbz2jLxvQ",
    posterURL:
      "https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
    rating: 8.4,
  },
  {
    id: 4,
    title: "No Country for Old Men",
    description:
      "A hunter stumbles upon a drug deal gone wrong and finds himself pursued by a relentless killer.",
    trailerURL: "https://www.youtube-nocookie.com/embed/38A__WT3-o0",
    posterURL:
      "https://image.tmdb.org/t/p/w500/6d5XOczc226jECq0LIX0siKtgHR.jpg",
    rating: 7.6,
  },
];

function App() {
  const [movies, setMovies] = useState(() => {
    try {
      const savedMovies = window.localStorage.getItem("frame-movies");
      return savedMovies
        ? JSON.parse(savedMovies).map((movie) => ({
            ...movie,
            description: movie.description || "",
            trailerURL: movie.trailerURL || "",
          }))
        : starterMovies;
    } catch {
      return starterMovies;
    }
  });
  const [titleFilter, setTitleFilter] = useState("");
  const [minimumRating, setMinimumRating] = useState("0");
  const [route, setRoute] = useState(() => window.location.hash);

  useEffect(() => {
    function handleHashChange() {
      setRoute(window.location.hash);
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

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
  const movieRoute = route.match(/^#movie\/(\d+)$/);
  const selectedMovie = movieRoute
    ? movies.find((movie) => movie.id === Number(movieRoute[1]))
    : null;

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
      <main id={selectedMovie ? undefined : "home"}>
        {selectedMovie ? (
          <section className="movie-detail container-fluid">
            <a className="back-link" href="#home">
              <span aria-hidden="true">←</span> Back to collection
            </a>
            <div className="detail-heading">
              <div>
                <p className="eyebrow">NOW SHOWING IN YOUR COLLECTION</p>
                <h1>{selectedMovie.title}</h1>
              </div>
              <span className="detail-rating">
                <span aria-hidden="true">★</span>{" "}
                {Number(selectedMovie.rating).toFixed(1)}
              </span>
            </div>
            <div className="detail-layout">
              <img
                className="detail-poster"
                src={selectedMovie.posterURL}
                alt={`${selectedMovie.title} poster`}
              />
              <div className="detail-content">
                <section
                  className="detail-description"
                  aria-labelledby="description-heading"
                >
                  <p className="eyebrow">THE STORY</p>
                  <h2 id="description-heading">Description</h2>
                  <p>
                    {selectedMovie.description ||
                      "No description has been added yet."}
                  </p>
                </section>
                <section
                  className="trailer-section"
                  aria-labelledby="trailer-heading"
                >
                  <p className="eyebrow">TAKE A LOOK</p>
                  <h2 id="trailer-heading">Official trailer</h2>
                  {selectedMovie.trailerURL ? (
                    <div className="trailer-frame">
                      <iframe
                        src={selectedMovie.trailerURL}
                        title={`${selectedMovie.title} trailer`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <p className="trailer-unavailable">
                      No trailer has been added for this movie.
                    </p>
                  )}
                </section>
              </div>
            </div>
          </section>
        ) : (
          <>
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
          </>
        )}
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
