import React from "react";
import "./Signup.scss";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate(); // ✅ correct way to use the hook

  const handleLogin = () => {
    navigate("/login"); // ✅ use the navigate function returned by the hook
  };
  const handleSignup = () => {
    navigate("/confirm-signup"); // ✅ use the navigate function returned by the hook
  };

  
  return (
    <>
      <div className="signup">
        <div className="signupbx">
          <h1>Sign Up</h1>
          <form>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <button type="submit" className="btn" onClick={handleSignup}>
              Sign Up
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <a href="#!" onClick={handleLogin}>
              Log in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
