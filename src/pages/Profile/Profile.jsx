import React from "react";
import { motion } from "framer-motion";
import "./Profile.scss";
import { Link } from "react-router-dom";
import { FaBell, FaUser } from "react-icons/fa"; // Font Awesome
import profileImg from "../../assets/images/profile.png"; // Font Awesome
import BottomNav from "../../components/BottomNav/BottomNav";
import {
  MdKeyboardArrowUp,
  MdMessage,
  MdOutlineSecurity,
} from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { IoLockClosedSharp } from "react-icons/io5";
import { FcInvite } from "react-icons/fc";

function Profile() {
  const accountInfo = [
    {
      icon: <FaUser size={18} color="#333" />,
      title: "Account info",
      link: "#!",
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
            <div className="notification">
              <Link>
                <FaBell size={24} color="#333" />
              </Link>
            </div>
          </div>
          <div className="profile-sec">
            <div className="profile-img">
              <img src={profileImg} alt="Profile" />
            </div>
            <div className="profile-details">
              <h6>Enjelin Morgeana</h6>
              <p>@enjelin_morgeana</p>
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
                    {/* Optional link handling */}
                    {item.link && (
                      <Link to={item.link} className="item-link"></Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <BottomNav />
      </motion.div>
    </>
  );
}

export default Profile;
