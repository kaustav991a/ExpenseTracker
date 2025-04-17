import React, { useState } from "react";
import "./Signup.scss";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { LoadingContext } from "../../context/LoadingContext"; // ✅

function Signup() {
  const { startLoading, completeLoading } = useContext(LoadingContext); // ✅
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setLoading(true);
    startLoading(); // ✅ show loader

    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      completeLoading(); // ✅ hide loader
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // Delay navigation slightly to allow Firebase to update the profile
      setTimeout(() => {
        navigate("/confirm-signup");
      }, 500); // Adjust the delay time as needed
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
      completeLoading(); // ✅ hide loader
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="signup">
        <div className="signupbx">
          <h1>Sign Up</h1>
          <form onSubmit={handleSignup}>
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
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
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          {error && <p className="error-msg">{error}</p>}
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Signup;
