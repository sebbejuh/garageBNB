import { useNavigate } from 'react-router-dom';
import { MdArrowBackIos } from "react-icons/md";


const GoBackBtn = () => {
  const navigate = useNavigate();
  return (
    <div className='go-back-btn-container'>
      <div className='go-back-btn-fake-btn' onClick={() => navigate(-1)}>
        <MdArrowBackIos />
        Tillbaka
      </div>
    </div>
  )
}

export default GoBackBtn