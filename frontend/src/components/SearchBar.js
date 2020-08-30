import React, { useState, useContext } from "react";
import { LoadContext } from "../App";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

function SearchBar(props) {
  const dispatch = useDispatch();
  const { setUpdateSamePage } = useContext(LoadContext);
  const handleSearch = (searchValueEvent) => {
    searchValueEvent.event.preventDefault();
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("q", searchValueEvent.searchValue);
    searchParams.set("page", 1);
    const newRelativePathQuery = "/search" + "?" + searchParams.toString();
    dispatch(push(newRelativePathQuery));
    if (window.location.pathname.includes("search")) {
      setUpdateSamePage((prevState) => !prevState);
    }
  };
  const [searchValue, setSearchValue] = useState("");
  return (
    <form
      className="search-bar-form"
      onSubmit={(e) => handleSearch({ event: e, searchValue: searchValue })}
    >
      <input
        type="text"
        className="search-bar"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search..."
      />
      <input className="search-bar-submit" type="submit" value="Submit"></input>
    </form>
  );
}
export default SearchBar;
