import { Link } from 'react-router-dom';
import { BiCar } from "react-icons/bi";
import { RiMotorbikeLine } from "react-icons/ri";

const MobileNav = () => {
  return (
    <nav className='mobile-navlinks'>
      <Link to='/car' className='mobile-navlinks-car'>
        <BiCar classname='mobile-pic-car' size={28} />
        <span>Bil</span>
      </Link>
      <Link to='/motorcycle' className='mobile-navlinks-mc'>
        <span>MC</span>
        <RiMotorbikeLine classname='mobile-pic-mc' size={28} />
      </Link>
    </nav>
  )
}

export default MobileNav