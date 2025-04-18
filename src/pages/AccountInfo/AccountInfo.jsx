import React, { useState, useEffect } from "react";
import "./AccountInfo.scss";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { auth } from "../../firebase";
import { RiLockPasswordFill } from "react-icons/ri";
import { motion } from "framer-motion";

function AccountInfo() {
  const ProfileSkeleton = () => (
    <div className="profile-skeleton-container">
      <div className="skeleton skeleton-circle profile-image-skeleton"></div>
      <div className="skeleton-details">
        <div className="skeleton skeleton-line short"></div>
        <div className="skeleton skeleton-line medium"></div>
      </div>
      <ul className="skeleton-account-info">
        <li className="skeleton-invite">
          <div className="skeleton skeleton-icon small"></div>
          <div className="skeleton skeleton-line short"></div>
        </li>
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index} className="skeleton-account-item">
            <div className="skeleton skeleton-icon small"></div>
            <div className="skeleton skeleton-line medium"></div>
          </li>
        ))}
      </ul>
    </div>
  );
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    phoneNumber: "",
    // Add more fields as needed
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        if (user) {
          setUserData({
            displayName: user.displayName || "",
            email: user.email || "",
            phoneNumber: user.phoneNumber || "",
            // Add other relevant properties
          });
          setLoading(false);
        } else {
          setUserData({ displayName: "", email: "", phoneNumber: "" });
          setLoading(false);
        }
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <>
        <div className="profile-sec w60">
          <ProfileSkeleton />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="account-info-page">
        <div className="top-bar">
          <Link to="/profile">Back to Profile</Link>
          <h2>Account Information</h2>
        </div>
        <div className="error-message">
          Error loading account information: {error}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="home-outer">
        <div className="account-info-page">
          <div className="topbluesec top-bar">
            <Link className="whitearrow" to="/profile"></Link>
            <div className="text">
              <h5>Account Information</h5>
            </div>
            <span>&nbsp;</span>
          </div>
          <div className="profile-sec w60">
            <div className="info-section">
              <h3>Personal Details</h3>
              <ul className="info-list">
                <li className="info-item">
                  <FaUser className="icon" />
                  <span className="label">Name:</span>
                  <span className="value">{userData.displayName}</span>
                  <Link to="/edit-name" className="edit-link">
                    Edit
                  </Link>
                </li>
                <li className="info-item">
                  <FaEnvelope className="icon" />
                  <span className="label">Email:</span>
                  <span className="value">{userData.email}</span>
                  {/* Consider if email should be editable */}
                </li>
                {userData.phoneNumber && (
                  <li className="info-item">
                    <FaPhone className="icon" />
                    <span className="label">Phone:</span>
                    <span className="value">{userData.phoneNumber}</span>
                    <Link to="/edit-phone" className="edit-link">
                      Edit
                    </Link>
                  </li>
                )}
                {/* Add more personal details as needed */}
              </ul>
            </div>
            <div className="info-section">
              <h3>Security</h3>
              <ul className="info-list">
                <li className="info-item">
                  <RiLockPasswordFill className="icon" />
                  <span className="label">Password:</span>
                  <span className="value">********</span>{" "}
                  {/* Masked password */}
                  <Link to="/change-password" className="edit-link">
                    Change
                  </Link>
                </li>
                {/* Add other security-related options */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AccountInfo;
