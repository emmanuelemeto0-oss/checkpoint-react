import { useState } from "react";

function AddMovie({ onAddMovie }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    posterURL: "",
    rating: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddMovie({ ...formData, rating: Number(formData.rating) });
    setFormData({ title: "", description: "", posterURL: "", rating: "" });
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <span className="form-icon" aria-hidden="true">
          +
        </span>
        <div>
          <p className="eyebrow">MAKE IT A DOUBLE FEATURE</p>
          <h3>Add a title</h3>
        </div>
      </div>
      <label className="form-label" htmlFor="movie-title">
        Movie or series title
      </label>
      <input
        className="form-control"
        id="movie-title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="e.g. The Truman Show"
        required
      />
      <label className="form-label" htmlFor="movie-description">
        A little about it
      </label>
      <textarea
        className="form-control description-input"
        id="movie-description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="What's the story?"
        rows="3"
        required
      />
      <label className="form-label" htmlFor="movie-poster">
        Poster image URL
      </label>
      <input
        className="form-control"
        id="movie-poster"
        name="posterURL"
        type="url"
        value={formData.posterURL}
        onChange={handleChange}
        placeholder="https://example.com/poster.jpg"
        required
      />
      <label className="form-label" htmlFor="movie-rating">
        Your rating <span className="rating-hint">OUT OF 10</span>
      </label>
      <input
        className="form-control"
        id="movie-rating"
        name="rating"
        type="number"
        min="0"
        max="10"
        step="0.1"
        value={formData.rating}
        onChange={handleChange}
        placeholder="8.5"
        required
      />
      <button className="btn add-button" type="submit">
        Add to my collection <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}

export default AddMovie;
