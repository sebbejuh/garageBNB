import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import GoBackBtn from "../components/GoBackBtn"

const Payment = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  if (!authContext?.token) {
    navigate("/login")
  }
  return (
    <>
      <GoBackBtn />
      <div className="payment-container">
        {/* <div className="payment-topcover"></div> */}
        <div className="payment-container2">
          <h2>Betalning sker... Vänligen vänta.</h2>
          <Link to="/bookings">Gå vidare (Mina Parkeringar)</Link>
        </div>
      </div>
    </>
  )
}

export default Payment