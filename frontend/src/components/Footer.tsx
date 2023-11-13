import { Link } from 'react-router-dom';
import { LuParkingSquare } from "react-icons/lu";
import { AiOutlineUser } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const authContext = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (authContext !== null) {
      const { token } = authContext;
      setIsLoggedIn(!!token);
    }
  }, [authContext]);

  const handleLogout = () => {
    if (authContext !== null) {
      const { updateToken } = authContext;
      updateToken(null);
      navigate("/");
    }
  };
  return (
    <footer className='footer footer-sticky'>
      <nav className="footer-links">
        <div className='footer-parking'>
          <LuParkingSquare size={28} />
          <Link to='/'>Parkering</Link>
        </div>
        <div className='footer-my-parking'>
          <LuParkingSquare size={28} />
          <Link to='/bookings'>Mina Parkeringar</Link>
        </div>
        <div className='footer-login'>
          <AiOutlineUser size={28} />
          {isLoggedIn ? (
              <div onClick={handleLogout}>Logga ut</div>
            ) : (
              <Link to='/login'>Logga in</Link>
            )}
        </div>
      </nav>
    </footer>
  )
}

export default Footer