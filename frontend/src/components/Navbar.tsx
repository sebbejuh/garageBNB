import { Link } from 'react-router-dom';
import { LuParkingSquare } from "react-icons/lu";
import { BiCar } from "react-icons/bi";
import { AiOutlineUser, AiOutlineSearch } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
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
    <header className='navbar sticky'>
      <nav className="navbar-links">
        <div className="navbar-group-left">
          <div className='navbar-logo'>
            <BiCar size={28} />
            <Link to='/'>GarageBNB</Link>
          </div>
          <div className='navbar-parking'>
            <LuParkingSquare size={28} />
            <Link to='/'>Parkering</Link>
          </div>
        </div>
        <div className='navbar-search'>
          <AiOutlineSearch size={28} />
          <input placeholder='Stockholm...' type="text" />
        </div>
        <div className="navbar-group-right">
          <div className='navbar-my-parking'>
            <LuParkingSquare size={28} />
            <Link to='/bookings'>Mina Parkeringar</Link>
          </div>
          <div className='navbar-login'>
            <AiOutlineUser size={28} />
            {isLoggedIn ? (
              <div onClick={handleLogout}>Logga ut</div>
            ) : (
              <Link to='/login'>Logga in</Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar