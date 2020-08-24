import React, { useState } from "react";
import { SearchContext } from "../App";
function SearchBar(props) {
  const handleSearch = (searchValueEvent) => {
    searchValueEvent.event.preventDefault();
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("q", searchValueEvent.searchValue);
    searchParams.set("page", 1);
    const newRelativePathQuery = "/search" + "?" + searchParams.toString();
    props.historyPush(newRelativePathQuery);
  };
  const [searchValue, setSearchValue] = useState('');
  return (
    <form
      className="search-bar"
      onSubmit={(e) => handleSearch({ event: e, searchValue: searchValue })}
    >
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search..."
      />
      <input type="submit" value="Submit"></input>
    </form>
  );
}
export default SearchBar;
