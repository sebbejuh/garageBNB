import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaLocationPin } from "react-icons/fa6";
import GoBackBtn from "../components/GoBackBtn"

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

  if (error) {  //if there is an error fetching orders
    return (
      <>
        <GoBackBtn />
        <div className='error'><h2>Du är inte inloggad</h2></div>
      </>
    )
  }

  const bookingsAmount = bookings.length;
  return (
    <>
      <GoBackBtn />
      <div className="booking-container">
        <h2>Mina Bokade Parkeringar ({bookingsAmount})</h2>
        <div className="booking-container2">
          {bookings.map((booking) => (
            <div className='checkout-card booking-card' key={booking._id}>
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
      </div>
    </>
  )
}

export default Bookings