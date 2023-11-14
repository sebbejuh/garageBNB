import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

const ListingDetails = () => {

  const [listing, setListing] = useState<Listing>(); //using useState hook to create listing state variable as an array
  const [error, setError] = useState(false);
  const { id } = useParams();
  const listingId = id;

  const navigate = useNavigate();
  const [selectedDays, setSelectedDays] = useState<number[]>([]); //state for selected/checked days
  const daysOfWeek = ['Mon', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön']; //days of the week array

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
    <div className="details-container">
      <div className="details-left">
        <img src={listing.imageURL}></img>
        <p>{listing.city}</p>
        <p>{listing.price}kr /dygn</p>
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
          <img src={listing.hostImgURL}></img>
          <div className="details-right-host2">
            <p>{listing.host}</p>
          </div>
        </div>
        <div className="details-right-info">
          <p>Adress:</p>
          <p>{listing.address}</p>
          <p>Garage:</p>
          <p>{listing.description}</p>
          <p>Pris:</p>
          <p>{listing.price}kr /dygn</p>
          <button onClick={saveToLocalStorage} disabled={selectedDays.length === 0}>RESERVERA</button>
        </div>
      </div>
    </div>
  )
}

export default ListingDetails