import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "./Context";
function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { saveToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please input username and password!");
      return;
    }

    var sendData = { Username: username, Password: password };
    await fetch("https://localhost:44302/api/authentication/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendData),
    })
      .then((res) => {
        if (res.ok) {
          navigate("/");
          return res.json();
        } else {
          alert("Incorrect username or password");
        }
      })
      .then((res) => {
        saveToken(res);
        setUsername("");
        setPassword("");
      })
      .catch((er) => alert("An error has occurred: " + er.message));
  };

  return (
    <div>
      <h2>Login form</h2>
      <form onSubmit={handleLogin} className="signForm">
        <div className="form-group">
          <label htmlFor="regUsername">Username:</label>
          <input
            type="text"
            id="regUsername"
            placeholder="Enter your username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="regPassword">Password:</label>
          <input
            type="password"
            id="regPassword"
            placeholder="Enter your password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="signingBtns">
          <button type="submit" className="btn btn-success">
            Login
          </button>
          <Link to="/" id="cancelLogin">
            <button type="button" className="btn btn-danger">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
export default LoginForm;
