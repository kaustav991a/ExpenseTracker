import React from "react";
import "../Login/Login.scss";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate(); // ✅ correct way to use the hook
  const handleSubmit = () => {
    navigate("/home"); // ✅ use the navigate function returned by the hook
  };
  const handleLogin = () => {
    navigate("/signup"); // ✅ use the navigate function returned by the hook
  };
  return (
    <>
      <div className="login">
        <div className="loginbx">
          <h1>Login</h1>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button className="btn" type="submit" onClick={handleSubmit}>
            Login
          </button>
          <p>
            Don't have an account?{" "}
            <a href="#!" onClick={handleLogin}>
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
