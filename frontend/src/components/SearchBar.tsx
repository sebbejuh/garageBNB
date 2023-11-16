import { AiOutlineSearch } from "react-icons/ai";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [input, setInput] = useState(''); //input state for input field
  const [results, setResults] = useState<Listing[]>([]);  //state for results from fetch
  const ref = useRef<HTMLDivElement>(null); //reference to my div, used in useEffect hook

  //Function that gets all listings from db and filters them by city depending on input
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

  //useEffect that keeps track of where you click, if it's outside of ref it empties the states
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setInput('');
        setResults([]);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <div className="navbar-search-results-wrapper" ref={ref}>
        {
          results.map((result, index) => (
            <div className="navbar-search-results" key={index}>
              <Link
                className="search-results-link"
                to={`/${result._id}`}
                onClick={() => {
                  setInput('');
                  setResults([]);
                }}
              >
                {result.city} Pris: {result.price}kr
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default SearchBar