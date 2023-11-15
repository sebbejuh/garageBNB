import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaLocationPin } from "react-icons/fa6";

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (!authContext || !authContext.token) {
      console.log('Error: not logged in')
      setError(true);
      return;
    }

    const token = authContext.token

    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:7777/api/bookings/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data) {
          setBookings(data);
        }
      } catch (error) {
        console.log("Error fetching orders", error);
        setError(true);
      }
    };
    fetchOrders();
  }, [authContext]);

  if (error) {  //if there is an error
    return <div className='checkout-error'><h1>Du är inte inloggad</h1></div>
  }
  console.log(bookings)
  const bookingsAmount = bookings.length;
  return (
    <div className="booking-container">
      <h1>Mina Bokade Parkeringar ({bookingsAmount})</h1>
      {bookings.map((booking) => (
        <div className='checkout-card' key={booking._id}>
          <div className="checkout-card-upper">
            <img src={booking.listing.imageURL}></img>
            <div className="checkout-card-upper-bottomleft">
              <p> <span className={booking.listing.category === "MC" ? "mc-color" : "car-color"}>< FaLocationPin /></span> {booking.listing.city}</p>
            </div>
            <div className="checkout-card-upper-bottomright">
              <p className={booking.listing.category === "MC" ? "mc-bcolor-tran" : "car-bcolor-tran"}>{booking.listing.price}kr /dygn</p>
            </div>
          </div>
          <div className="checkout-card-lower">
            <p>Datum: {booking.dates.join(', ')}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Bookings