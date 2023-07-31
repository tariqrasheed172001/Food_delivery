import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./searchBar.css";

function SearchBar() {
  return (
    <div className="form-outline">
      <input
        id="search-focus"
        type="search"
        className="form-control"
        placeholder="search"
      />
      <button type="button" className="btn btn-primary">
        <SearchIcon />
      </button>
    </div>
  );
}

export default SearchBar;
