import React, { useState } from "react";
import "../Login/Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        console.log("Login successful:", userCredential.user);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Login error:", error.message);
        alert(error.message);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="login">
        <div className="loginbx">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button className="btn" type="submit">
              Login
            </button>
          </form>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Login;
