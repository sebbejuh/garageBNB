import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoBackBtn from "../components/GoBackBtn"

const Login = () => {
  const authContext = useContext(AuthContext);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  //function to handle change in input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };
  //function that takes data from inputs and posts them as JSON in body
  //then updates token in localstorage if login is successful and sends you to homepage
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("http://localhost:7777/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!res.ok) {
      alert(`Error: ${res.status} ${res.statusText} - Fel användaruppgifter.`);
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
          <h2>LOGGA IN</h2>
        </div>
        <form className="login-form" onSubmit={handleSubmit} name="login">
          <div className="login-input">
            <label htmlFor="email">E-post:</label>
            <input
              type="email"
              placeholder="E-post.."
              name="email"
              id="email"
              value={loginData.email}
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
              value={loginData.password}
              onChange={handleChange}
            />
          </div>
          <div className="login-btn-link">
            <Link to="/register" className="register-link">Registrera dig</Link>
            <button className="login-btn">Logga in</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login