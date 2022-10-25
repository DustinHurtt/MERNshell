const SearchBar = ({ setSearchTerm }) => {

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <p>Search</p>

      <label>Search bar</label>
      <input type="text" placeholder="search items..." onChange={(e)=>(handleSearch(e))} />
     
    </div>
  
  );
}

export default SearchBar;
