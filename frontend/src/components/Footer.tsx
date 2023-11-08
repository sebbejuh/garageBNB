import { Link } from 'react-router-dom';
import { LuParkingSquare } from "react-icons/lu";
import { AiOutlineUser } from "react-icons/ai";

const Footer = () => {
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
          <Link to='/login'>Logga in</Link>
        </div>
      </nav>
    </footer>
  )
}

export default Footer