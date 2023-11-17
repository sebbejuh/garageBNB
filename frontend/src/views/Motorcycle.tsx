import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaLocationPin } from "react-icons/fa6";
import DesktopNav from "../components/DesktopNav"

const Motorcycle = () => {
  const [listings, setListings] = useState<Listing[]>([]); //using useState hook to create listing state variable as an array
  const [error, setError] = useState(false);

  useEffect(() => {
    //using hook
    fetch("http://localhost:7777/api/listings/") //using fetch to get all listings
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.filter((listing: Listing) => listing.category === "MC"); //filter listings by category "MC"
        setListings(filteredData);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      });
  }, []);

  if (error) {
    return (
      <div className="outer-container">
        < DesktopNav />
        <h2>Parkering hittades inte.</h2>
      </div>
    )
  }
  if (!listings) {
    return (
      <div className="outer-container">
        < DesktopNav />
        <h2>Laddar..</h2>
      </div>
    )
  }

  return (
    <div className="outer-container">
      < DesktopNav />
      <ul className="home-container">
        {listings.map(listing => (
          <li className="home-listing" key={listing._id}>
            <div className="listing-left">
              <img src={listing.imageURL}></img>
              <div className="listing-left-bottomleft">
                <p> <span className={listing.category === "MC" ? "mc-color" : "car-color"}>< FaLocationPin /></span> {listing.city}</p>
              </div>
              <div className="listing-left-bottomright">
                <p className={listing.category === "MC" ? "mc-bcolor-tran" : "car-bcolor-tran"}>{listing.price}kr /dygn</p>
              </div>
            </div>
            <div className="listing-right">
              <p>Kategori: {listing.category}</p>
              <p>{listing.description.length > 45 ? listing.description.substring(0, 45) + "..." : listing.description}</p> {/* limits displayed lenght */}
              <p className="listing-btn-container">
                <Link className={listing.category === "MC" ? "mc-bcolor" : "car-bcolor"} to={`/${listing._id}`}>RESERVERA</Link>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Motorcycle