import { useEffect, useState, useContext } from 'react';
import { FaLocationPin } from "react-icons/fa6";
import { FiMinusCircle } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [listing, setListing] = useState<Listing>(); //using useState hook to create listing state variable as an array
  const [error, setError] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const listingData = localStorage.getItem('listingData');
  const parsedData = listingData !== null ? JSON.parse(listingData) : null;
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (parsedData !== null) {  //if parsedData isnt null
      const listingId = parsedData.listingId;

      fetch(`http://localhost:7777/api/listings/${listingId}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Listing not found');
          }
          return res.json();
        })
        .then(data => {
          setListing(data);
          setTotalPrice(data.price * parsedData.dates.length); //calculate total price
        })
        .catch(error => {
          console.error(error);
          setError(true);
        });

    } else {  //if parsedData is null
      setError(true);
    }

  }, [parsedData]);
  if (error) {  //if there is an error
    return <div className='error'><h1>Ingen bokning (0)</h1></div>
  }
  if (!listing) {
    return <div className='error'><h1>Laddar...</h1></div>
  }

  const handleBooking = () => {
    if (!authContext || !authContext.token) {
      setError(true); //just incase
      console.log('Error: not logged in')
      navigate("/login")
      return;
    }
    const token = authContext.token;
    fetch('http://localhost:7777/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: listingData,
    })
      .then(res => res.json())
      .then(data => {
        console.log('Success:', data);
        navigate("/payment")
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const removeBooking = () => {
    if (parsedData) {
      localStorage.removeItem('listingData');
    }
    return
  }

  return (
    <div className='checkout-container'>
      <h1>Checkout</h1>
      <div className='checkout-card'>
        <div className="checkout-card-upper">
          <img src={listing.imageURL}></img>
          <div className="checkout-card-upper-bottomleft">
            <p> <span className={listing.category === "MC" ? "mc-color" : "car-color"}>< FaLocationPin /></span> {listing.city}</p>
          </div>
          <div className="checkout-card-upper-bottomright">
            <p className={listing.category === "MC" ? "mc-bcolor-tran" : "car-bcolor-tran"}>{listing.price}kr /dygn</p>
          </div>
          <div className="checkout-card-upper-upperright">
            <button onClick={removeBooking}><FiMinusCircle /></button>
          </div>
        </div>
        <div className="checkout-card-lower">
          <p>Datum: {parsedData && parsedData.dates.join(', ')}</p>
          <p>Pris: {totalPrice}kr</p>
        </div>
      </div>
      <div className="checkout-btn-container">
        <button onClick={handleBooking}>Betala Nu (Totalt: {totalPrice}kr)</button>
      </div>
    </div>

  )
}

export default Checkout