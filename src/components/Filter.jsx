function Filter({ titleFilter, onTitleChange, minimumRating, onRatingChange }) {
  return (
    <div className="filter-bar">
      <label className="search-field">
        <span className="search-icon" aria-hidden="true">
          ⌕
        </span>
        <span className="visually-hidden">Search by title</span>
        <input
          type="search"
          value={titleFilter}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="Find a film..."
        />
      </label>
      <label className="rating-filter">
        <span>RATING</span>
        <select
          className="form-select"
          value={minimumRating}
          onChange={(event) => onRatingChange(event.target.value)}
          aria-label="Filter by minimum rating"
        >
          <option value="0">Any score</option>
          <option value="6">6+ stars</option>
          <option value="7">7+ stars</option>
          <option value="8">8+ stars</option>
          <option value="9">9+ stars</option>
        </select>
      </label>
    </div>
  );
}

export default Filter;
