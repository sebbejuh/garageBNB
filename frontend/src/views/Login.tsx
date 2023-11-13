import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const authContext = useContext(AuthContext);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("http://localhost:7777/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
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
    <div className="login-container">
      <div className="login-title">
        <h1>LOGGA IN</h1>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
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
        <Link to="/register" className="register-link">Registrera dig</Link>
        <button className="login-btn">Logga in</button>
      </form>
    </div>
  )
}

export default Login