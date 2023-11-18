import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoBackBtn from "../components/GoBackBtn"

const Register = () => {
  const authContext = useContext(AuthContext);
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  //function to handle change in input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  //function that takes data from inputs and posts them as JSON in body
  //checks if passwords in the password inputs match
  //then updates token in localstorage if register is successful and sends you to homepage
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert("Misslyckades med att skapa användare - Lösenorden stämmer inte överens!");
      return;
    }
    const res = await fetch("http://localhost:7777/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    if (!res.ok) {
      alert(`Error: ${res.status} ${res.statusText}`);
      return;
    }

    const data = await res.json();
    if (authContext !== null) {
      const { updateToken } = authContext;
      if (data.token) {
        updateToken(data.token);
      } else {
        updateToken(null);
      }
    }
    navigate("/");
  };
  return (
    <>
      <GoBackBtn />
      <div className="login-container">
        <div className="login-title">
          <h2>REGISTRERA</h2>
        </div>
        <form className="login-form" onSubmit={handleSubmit} name="register">
          <div className="login-input">
            <label htmlFor="email">E-post:</label>
            <input
              type="email"
              placeholder="E-post.."
              name="email"
              id="email"
              value={registerData.email}
              onChange={handleChange}
            />
          </div>
          <div className="login-input">
            <label htmlFor="password">Lösenord:</label>
            <input
              type="password"
              placeholder="Lösenord.."
              name="password"
              id="password"
              value={registerData.password}
              onChange={handleChange}
            />
          </div>
          <div className="login-input">
            <label htmlFor="confirmPassword">Upprepa lösenord:</label>
            <input
              type="password"
              placeholder="Lösenord.."
              name="confirmPassword"
              id="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="login-btn-link">
            <Link to="/login" className="register-link">Har du ett konto? Logga in</Link>
            <button className="login-btn">Registrera</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register