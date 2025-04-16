import React from "react";
import "./BottomNav.scss";
import { MdAddHome } from "react-icons/md";
import { MdBarChart } from "react-icons/md";
import { MdWallet } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

function BottomNav() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <>
      <div className="bottomnav">
        <ul>
          <li>
            <Link to="/home" className={isActive("/home") ? "active" : ""}>
              <MdAddHome />
            </Link>
          </li>
          <li>
            <Link
              to="/statistics"
              className={isActive("/statistics") ? "active" : ""}
            >
              <MdBarChart />
            </Link>
          </li>
          <li>
            <Link
              to="/add-expences"
              className={isActive("/add-expences") ? "active" : ""}
            >
              <FaCirclePlus />
            </Link>
          </li>
          <li>
            <Link to="/wallet" className={isActive("/wallet") ? "active" : ""}>
              <MdWallet />
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={isActive("/profile") ? "active" : ""}
            >
              <FaUserCircle />
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default BottomNav;
