import React from "react";
import { motion } from "framer-motion";
import "./Home.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";

import { FaBell } from "react-icons/fa"; // Font Awesome
import { MdMoreHoriz } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md"; // Material Design
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdAddHome } from "react-icons/md";
import { MdBarChart } from "react-icons/md";
import { MdWallet } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

function Home() {
  const { transactions } = useContext(TransactionContext);
  const navigate = useNavigate(); // ✅ correct way to use the hook

  const handleEdit = (item, index) => {
    navigate("/edit-expense", { state: { item, index } });
  };
  const income = transactions
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "debit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = income - expenses;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="home-outer">
          <div className="topbluesec">
            <div className="text">
              <h6>Good afternoon,</h6>
              <h5>Enjelin Morgeana</h5>
            </div>
            <div className="notification">
              <Link>
                <FaBell size={24} color="#333" />
              </Link>
            </div>
          </div>
          <div className="totalbalance">
            <div className="top-sec">
              <div className="text">
                <h6>Total Balance</h6>
                <h5>INR {totalBalance.toFixed(2)}</h5>
              </div>
              <div className="more">
                <Link>
                  <MdMoreHoriz size={24} color="#333" />
                </Link>
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
                <h5>INR {income.toFixed(2)}</h5>
              </div>
              <div className="price">
                <h6>
                  <span>
                    <MdKeyboardArrowUp size={24} />
                  </span>
                  Expenses
                </h6>
                <h5>INR {expenses.toFixed(2)}</h5>
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
              {transactions.map((item, index) => (
                <li className="transaction-item" key={index}>
                  <div className="left">
                    <div className="icon">
                      {/* <img src={item.icon} alt={item.name} /> */}
                    </div>
                    <div className="text">
                      <h4>{item.name}</h4>
                      <p>{item.date}</p>
                    </div>
                  </div>
                  <div className={`amount ${item.type}`}>
                    {item.type === "debit" ? "-" : "+"} INR{" "}
                    {item.amount.toFixed(2)}
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(item, index)}
                    >
                      <CiEdit />
                    </button>
                  </div>
                  <Link to="/transaction-details" className="abs"></Link>
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
                <Link to="/add-expences">
                  {/* onClick={aa} */}
                  <FaCirclePlus />
                </Link>
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
      </motion.div>
    </>
  );
}

export default Home;
