import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const ListingDetails = () => {

  const [listing, setListing] = useState<Listing>(); //using useState hook to create listing state variable as an array
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:7777/api/listings/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Listing not found');
        }
        return res.json();
      })
      .then(data => {
        setListing(data);
      })
      .catch(error => {
        console.error(error);
        setError(true);
      });
  }, [id]);
  if (error) {
    return <div>Listing not found</div>
  }
  if (!listing) {
    return <div>Loading...</div>
  }

  return (
    <div className="details-container">

      <div className="details-left">
        <img src={listing.imageURL}></img>
        <p>{listing.city}</p>
        <p>{listing.price}kr /dygn</p>
      </div>
      <div className="details-right">
        <div className="details-right-host">
          <img src={listing.hostImgURL}></img>
          <div className="details-right-host2">
            <p>{listing.host}</p>
          </div>
        </div>
        <div className="details-right-info">
          <p>Adress:</p>
          <p>{listing.address}</p>
          <p>Garage:</p>
          <p>{listing.description}</p>
          <p>Pris:</p>
          <p>{listing.price}kr /dygn</p>
          <button>RESERVERA</button>
        </div>
      </div>
    </div>
  )
}

export default ListingDetails