import React, { useState, useContext } from "react";
import "./Signup.scss";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
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

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setFirebaseError("");
    let isValid = true;

    if (!formData.name.trim()) {
      setNameError("Name is required.");
      isValid = false;
    }

    if (!formData.email.trim()) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setEmailError("Invalid email format.");
      isValid = false;
    }

    if (!formData.password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    setLoading(true);
    startLoading(); // ✅ show loader

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(userCredential.user, {
        displayName: formData.name,
      });

      await sendEmailVerification(userCredential.user);
      console.log("Verification email sent!");
      navigate("/login"); // Redirect to login after signup (and email sent)
    } catch (err) {
      console.error(err.message);
      setFirebaseError(err.message);
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
            <div className="form-group">
              <input
                name="name"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              {nameError && <p className="error-msg">{nameError}</p>}
            </div>
            <div className="form-group">
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {emailError && <p className="error-msg">{emailError}</p>}
            </div>
            <div className="form-group">
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {passwordError && <p className="error-msg">{passwordError}</p>}
            </div>
            <div className="form-group">
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            {firebaseError && <p className="error-msg">{firebaseError}</p>}

            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          {confirmPasswordError && (
            <p className="error-msg">{confirmPasswordError}</p>
          )}
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Signup;
