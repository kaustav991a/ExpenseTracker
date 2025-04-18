import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Profile.scss";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa"; // Font Awesome
import profileImg from "../../assets/images/profile.png"; // Font Awesome
import BottomNav from "../../components/BottomNav/BottomNav";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase"; // adjust path if needed

import {
  MdKeyboardArrowUp,
  MdMessage,
  MdOutlineSecurity,
} from "react-icons/md";
import { IoLockClosedSharp } from "react-icons/io5";
import { FcInvite } from "react-icons/fc";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom"; // ⬅️ Add this
import { FaUserGroup } from "react-icons/fa6";

// Skeleton Loader Component
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

function Profile() {
  const [user, setUser] = useState(null); // ✅ Store user
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate(); // ⬅️ Initialize the hook

  // ✅ Listen to user state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up listener
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const accountInfo = [
    {
      icon: <FaUser size={18} color="#333" />,
      title: "Account info",
      link: "/account-info",
    },
    {
      icon: <FaUserGroup size={18} color="#333" />,
      title: "Personal profile",
      link: "#!",
    },
    {
      icon: <MdMessage size={18} color="#333" />,
      title: "Message center",
      link: "",
    },
    {
      icon: <MdOutlineSecurity size={18} color="#333" />,
      title: "Login and security",
      link: "#!",
    },
    {
      icon: <IoLockClosedSharp size={18} color="#333" />,
      title: "Data and privacy",
      link: "#!",
    },
  ];
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="home-outer">
          <div className="topbluesec">
            <Link className="whitearrow" to="/home">
              &larr;
            </Link>
            <div className="text">
              <h5>Profile</h5>
            </div>
            <div
              className="notification"
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              <TbLogout2 size={24} color="#fff" />
            </div>
          </div>
          <div className="profile-sec">
            {loading ? (
              <ProfileSkeleton />
            ) : (
              <>
                <div className="profile-img">
                  <img src={profileImg} alt="Profile" />
                </div>
                <div className="profile-details">
                  <h6>{user ? user.displayName : "Guest"}!</h6>
                  <p>@{user?.email?.split("@")[0] || "user"}</p>
                </div>
                <div className="account-info">
                  <ul>
                    <li>
                      <FcInvite /> Invite Friends
                      <Link to="#!"></Link>
                    </li>
                    {accountInfo.map((item, index) => (
                      <li key={index} className="account-item">
                        <div className="item-content">
                          {item.icon}
                          <span>{item.title}</span>
                        </div>
                        {item.link && (
                          <Link to={item.link} className="item-link"></Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
        <BottomNav />
      </motion.div>
    </>
  );
}

export default Profile;
