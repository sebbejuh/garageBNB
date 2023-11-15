import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Listing[]>([]);

  const fetchData = (value: string) => {
    fetch("http://localhost:7777/api/listings/")
      .then((res) => res.json())
      .then((data) => {
        const filteredResults = data.filter((listing: Listing) => {
          return value && listing && listing.city && listing.city.toLowerCase().includes(value)
        });
        console.log(filteredResults);
        setResults(filteredResults) //updates the state
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (value: string) => {
    setInput(value);  //updates state
    fetchData(value); //runs function with value
  };

  return (
    
      <div className='navbar-search'>
        <div className="navbar-search-static">
          <AiOutlineSearch size={28} />
          <input
            placeholder='Stockholm...'
            type="text"
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      {
        results.map((result, index) => (
          <div className="navbar-search-results" key={index}>
            <div className="test">

            <Link className="search-results-link" to={`/${result._id}`}>{result.city}</Link>
            </div>
          </div>
        ))
      }
      </div>
    
  )
}

export default SearchBar