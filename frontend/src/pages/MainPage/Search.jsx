import React, { useState } from "react";

function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="search">
      <label htmlFor="query" className="query">
        Search repository
      </label>
      <input
        type="text"
        name="query"
        id="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleClear} className="button">
        Clear
      </button>
      <button onClick={() => onSearch(query)} className="Search">
        Search
      </button>
    </div>
  );
}

export default Search;
