import React, { useRef } from "react";
import { Button } from "react-bootstrap";

export const SearchBar = ({ handleSearch, searchMovies }) => {
  const searchRef = useRef(null);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchMovies();
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <input
        type="text"
        placeholder="Search movies"
        onChange={handleSearch}
        onKeyPress={handleKeyPress}
        ref={searchRef}
      />

      <Button variant="primary" onClick={searchMovies}>
        Search
      </Button>
    </div>
  );
};