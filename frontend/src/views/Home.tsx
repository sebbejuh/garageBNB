import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [listings, setListings] = useState<Listing[]>([]); //using useState hook to create listing state variable as an array

  useEffect(() => {
    //using hook
    fetch("http://localhost:7777/api/listings/") //using fetch to get all listings
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <ul className="home-container">
      {listings.map(listing => (
        <li className="home-listing" key={listing._id}>
          <div className="listing-left">
            <img src={listing.imageURL}></img>
            <p>{listing.city}</p>
            <p>{listing.price}kr /dygn</p>
          </div>
          <div className="listing-right">
            <p>Kategori: {listing.category}</p>
            <p>{listing.description}</p>
            <p className="listing-btn-container">
                <Link to={`/${listing._id}`}>RESERVERA</Link>
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
export default Home