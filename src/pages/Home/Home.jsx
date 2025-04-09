import React from "react";
import "./Home.scss";
import { FaBell } from "react-icons/fa"; // Font Awesome
import { MdMoreHoriz } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md"; // Material Design
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdAddHome } from "react-icons/md";
import { MdBarChart } from "react-icons/md";
import { MdWallet } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import upworkicon from "../../assets/images/upwork.png";
import paypalicon from "../../assets/images/paypal.png";
import transfericon from "../../assets/images/transfer.png";
import youtubeicon from "../../assets/images/youtube.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate(); // ✅ correct way to use the hook

  const handleHome = () => {
    navigate("/addexpences"); // ✅ use the navigate function returned by the hook
  };
  // const handleSignup = () => {
  //   navigate("/confirm-signup"); // ✅ use the navigate function returned by the hook
  // };
  const transactions = [
    {
      id: 1,
      name: "Upwork",
      date: "Today",
      amount: "+ $850.00",
      type: "positive",
      icon: upworkicon,
    },
    {
      id: 2,
      name: "Transfer",
      date: "Yesterday",
      amount: "- $85.00",
      type: "negative",
      icon: transfericon,
    },
    {
      id: 3,
      name: "Paypal",
      date: "Jan 30, 2022",
      amount: "+ $1,406.00",
      type: "positive",
      icon: paypalicon,
    },
    {
      id: 4,
      name: "Youtube",
      date: "Jan 16, 2022",
      amount: "- $11.99",
      type: "negative",
      icon: youtubeicon,
    },
  ];

  return (
    <>
      <div className="home-outer">
        <div className="topbluesec">
          <div className="text">
            <h6>Good afternoon,</h6>
            <h5>Enjelin Morgeana</h5>
          </div>
          <div className="notification">
            <a href="">
              <FaBell size={24} color="#333" />
            </a>
          </div>
        </div>
        <div className="totalbalance">
          <div className="top-sec">
            <div className="text">
              <h6>Total Balance</h6>
              <h5>INR 2,548.00</h5>
            </div>
            <div className="more">
              <a href="">
                <MdMoreHoriz size={24} color="#333" />
              </a>
            </div>
          </div>
          <div className="income-expence">
            <div className="price">
              <h6>
                <span>
                  <MdKeyboardArrowDown size={24} />
                </span>
                Income
              </h6>
              <h5>INR 1,840.00</h5>
            </div>
            <div className="price">
              <h6>
                <span>
                  <MdKeyboardArrowUp size={24} />
                </span>
                Expenses
              </h6>
              <h5>INR 284.00</h5>
            </div>
          </div>
        </div>

        <div className="transactions">
          <div className="transactions-header">
            <h3>Transactions History</h3>
            <a href="#!" className="see-all">
              See all
            </a>
          </div>

          <ul className="transactions-list">
            {transactions.map((item) => (
              <li className="transaction-item" key={item.id}>
                <div className="left">
                  <div className="icon">
                    <img src={item.icon} alt={item.name} />
                  </div>
                  <div className="text">
                    <h4>{item.name}</h4>
                    <p>{item.date}</p>
                  </div>
                </div>
                <div className={`amount ${item.type}`}>{item.amount}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bottomnav">
          <ul>
            <li>
              <button>
                {/* onClick={aa} */}
                <MdAddHome />
              </button>
            </li>
            <li>
              <button>
                {/* onClick={aa} */}
                <MdBarChart />
              </button>
            </li>
            <li>
              <button onClick={handleHome}>
                {/* onClick={aa} */}
                <FaCirclePlus />
              </button>
            </li>
            <li>
              <button>
                {/* onClick={aa} */}
                <MdWallet />
              </button>
            </li>
            <li>
              <button>
                {/* onClick={aa} */}
                <FaUserCircle />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;
