import React from "react";

function SearchBar(props) {
  return (
    <input // this should probably be moved to its own component
      type="text"
      placeholder="Enter item to be searched"
      onChange={(e) => props.searchSpace(e)}
    />
  );
}

export default SearchBar;
