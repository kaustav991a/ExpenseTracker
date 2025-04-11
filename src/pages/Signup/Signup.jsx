import React from "react";
import "./Signup.scss";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Signup() {
  const navigate = useNavigate(); // ✅ correct way to use the hook

  const handleSignup = () => {
    navigate("/confirm-signup"); // ✅ use the navigate function returned by the hook
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
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
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Signup;
