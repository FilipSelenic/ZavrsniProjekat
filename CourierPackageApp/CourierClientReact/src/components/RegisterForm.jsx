import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username) {
      alert("Please input username!");
      return;
    }
    if (!email) {
      alert("Please input email!");
      return;
    }
    if (!password) {
      alert("Please input password!");
      return;
    }
    if (!passwordConfirm) {
      alert("Please input passwordConfirm!");
      return;
    }
    if (password !== passwordConfirm) {
      alert("Your passwords do not match");
      setPassword("");
      setPasswordConfirm("");
      return;
    }
    const registerRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    };
    const response = await fetch(
      "https://localhost:44302/api/Authentication/register",
      registerRequest
    );

    if (response.status === 200) {
      alert("You have registered successfully");
      setUsername("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      navigate("/");
    } else {
      alert("An error has occurred:" + response.statusText);
      setUsername("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
    }
  };
  return (
    <div>
      <h2>Register form</h2>
      <form onSubmit={handleRegister} className="signForm">
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
          <label htmlFor="regEmail">Email address:</label>
          <input
            type="email"
            id="regEmail"
            placeholder="Enter your email address"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="form-group">
          <label htmlFor="regPasswordRepeat">Confirm password:</label>
          <input
            type="password"
            id="regPasswordRepeat"
            placeholder="Confirm password"
            className="form-control"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <div className="regBtns">
          <button type="submit" className="btn btn-success">
            Register
          </button>
          <button type="button" className="btn btn-danger">
            <Link to="/" id="cancelReg">
              Cancel
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
