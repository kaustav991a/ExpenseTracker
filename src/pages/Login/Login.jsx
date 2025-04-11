import React from "react";
import "../Login/Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate(); // ✅ correct way to use the hook
  const handleSubmit = () => {
    navigate("/home"); // ✅ use the navigate function returned by the hook
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="login">
          <div className="loginbx">
            <h1>Login</h1>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button className="btn" type="submit" onClick={handleSubmit}>
              Login
            </button>
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Login;
