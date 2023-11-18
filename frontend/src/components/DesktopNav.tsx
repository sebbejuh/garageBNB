import { BiCar } from "react-icons/bi";
import { RiMotorbikeLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const DesktopNav = () => {
  return (
    <nav className='desktop-navlinks'>
      <Link to='/car' className='desktop-navlinks-car'>
        <BiCar className='desktop-pic-car' size={28} />
        <span>Bil</span>
      </Link>
      <Link to='/motorcycle' className='desktop-navlinks-mc'>
        <span>MC</span>
        <RiMotorbikeLine className='desktop-pic-mc' size={28} />
      </Link>
    </nav>
  )
}

export default DesktopNav