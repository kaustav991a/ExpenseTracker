import React, { useState } from "react";
import "../Login/Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "../../firebase";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setFirebaseError("");
    let isValid = true;

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
    }

    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      if (user && !user.emailVerified) {
        setFirebaseError(
          "Your email address has not been verified. Please check your inbox and click the verification link."
        );
        setLoading(false);
        return;
      }

      console.log("Login successful:", userCredential.user);
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error.message);
      setFirebaseError(error.message);
    } finally {
      setLoading(false);
    }
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
            {firebaseError && <p className="error-msg">{firebaseError}</p>}
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Logging In..." : "Login"}
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
