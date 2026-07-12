export default function SearchControls({
  searchTerm,
  onSearchChange,
  genreOptions,
  genreValue,
  onGenreChange,
  sortValue,
  onSortChange,
  additionalControls,
  placeholder,
}) {
  return (
    <div className="search-controls">
      <input
        className="dashboard-input"
        type="text"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder={placeholder}
      />

      <select className="dashboard-input" value={genreValue} onChange={(event) => onGenreChange(event.target.value)}>
        {genreOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select className="dashboard-input" value={sortValue} onChange={(event) => onSortChange(event.target.value)}>
        <option value="alphabetical">A → Z</option>
        <option value="recently-uploaded">Recently Uploaded</option>
        <option value="recently-joined">Recently Joined</option>
        <option value="capacity">Capacity</option>
      </select>

      {additionalControls}
    </div>
  );
}
