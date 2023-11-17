import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import GoBackBtn from "../components/GoBackBtn"
import { FaLocationPin } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";


const ListingDetails = () => {

  const [listing, setListing] = useState<Listing>(); //using useState hook to create listing state variable as an array
  const [error, setError] = useState(false);
  const { id } = useParams();
  const listingId = id;

  const navigate = useNavigate();
  const [selectedDays, setSelectedDays] = useState<number[]>([]); //state for selected/checked days
  const daysOfWeek = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön']; //days of the week array

  //function to keep track of checkbox changes
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const checked = event.target.checked;
    if (checked) {
      setSelectedDays([...selectedDays, index]);  //updates state of checked days
    } else {
      setSelectedDays(selectedDays.filter(dayIndex => dayIndex !== index)); //updates state of unchecked days
    }
  };
  //function to save dates and listingId to local storage
  const saveToLocalStorage = () => {
    const dates = selectedDays.map(dayIndex => {  //creates dates for each dayIndex in selectedDays array
      const date = new Date();  //declares and initializes date to current date
      const targetDay = (dayIndex + 1) % 7; //for monday start of the week
      const currentDay = date.getDay() || 7; //for monday start of the week
      const daysToAdd = (targetDay >= currentDay) ? targetDay - currentDay : 7 + targetDay - currentDay;  //math
      date.setDate(date.getDate() + daysToAdd);
      return date.getTime() >= 0 ? date.toISOString().split('T')[0] : null; //check if valid date,else retun null
    }).filter(date => date !== null); //filter out null values from date array

    const data = {
      dates,
      listingId
    };

    localStorage.setItem('listingData', JSON.stringify(data));
    navigate("/checkout");
  };

  useEffect(() => {
    fetch(`http://localhost:7777/api/listings/${listingId}`)
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
  }, [listingId]);
  if (error) {
    return <div>Listing not found</div>
  }
  if (!listing) {
    return <div>Loading...</div>
  }

  return (
    <>
      <GoBackBtn />
      <div className="details-container">

        <div className="details-checkboxes-mobile">
          {daysOfWeek.map((day, index) => (
            <div key={index}>
              <input type="checkbox" id={`day-${index}`} name={`day-${index}`} onChange={(event) => handleCheckboxChange(event, index)} />
              <label htmlFor={`day-${index}`}>{day}</label>
            </div>
          ))}
        </div>
        <div className="details-right-host-mobile">
          <div className="details-right-host-img-mobile">
            <img src={listing.hostImgURL}></img>
          </div>
          <div className="details-right-host-name-mobile">
            <p>{listing.host}</p>
            <div className="detail-stars-mobile">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
          </div>
        </div>

        <div className="details-left">
          <img src={listing.imageURL}></img>
          <div className="details-left-bottomleft">
            <p> <span className={listing.category === "MC" ? "mc-color" : "car-color"}>< FaLocationPin /></span> {listing.city}</p>
          </div>
          <div className="details-left-bottomright">
            <p className={listing.category === "MC" ? "mc-bcolor-tran" : "car-bcolor-tran"}>{listing.price}kr /dygn</p>
          </div>
        </div>
        <div className="details-right">
          <div className="details-checkboxes">
            {daysOfWeek.map((day, index) => (
              <div key={index}>
                <input type="checkbox" id={`day-${index}`} name={`day-${index}`} onChange={(event) => handleCheckboxChange(event, index)} />
                <label htmlFor={`day-${index}`}>{day}</label>
              </div>
            ))}
          </div>
          <div className="details-right-host">
            <div className="details-right-host-img">
              <img src={listing.hostImgURL}></img>
            </div>
            <div className="details-right-host-name">
              <p>{listing.host}</p>
              <div className="detail-stars">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
            </div>
          </div>
          <div className="details-right-info">
            <p>Adress:</p>
            <p className="details-info">{listing.address}</p>
            <p>Garage:</p>
            <p className="details-info">{listing.description}</p>
            <p>Pris:</p>
            <p className="details-info">{listing.price}kr /dygn</p>
            <div className="details-info-btn">
              <button onClick={saveToLocalStorage} disabled={selectedDays.length === 0}>RESERVERA</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListingDetails