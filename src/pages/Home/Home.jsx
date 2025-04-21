// import React from "react";
import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { motion } from "framer-motion";
import "./Home.scss";
import { Link, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { TransactionContext } from "../../context/TransactionContext";
import BottomNav from "../../components/BottomNav/BottomNav";

import { FaBell } from "react-icons/fa"; // Font Awesome
import { MdMoreHoriz } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md"; // Material Design
import { MdKeyboardArrowUp } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import TransactionSkeleton from "../../components/SkeletonLoader/TransactionSkeleton";

function Home() {
  const [loading, setLoading] = useState(true); // Add loading state
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // Local auth state
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribeAuth;
  }, []);

  useEffect(() => {
    setLoadingTransactions(true);
    setTransactions([]);

    if (currentUser) {
      const transactionsRef = collection(db, "transactions");
      const q = query(
        transactionsRef,
        where("userId", "==", currentUser.uid),
        orderBy("timestamp", "desc")
      );

      const unsubscribeSnapshot = onSnapshot(
        q,
        (snapshot) => {
          const fetchedTransactions = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTransactions(fetchedTransactions);
          setLoadingTransactions(false);
          setLoading(false); // Set loading to false when data is loaded
        },
        (err) => {
          setError(err.message);
          setLoadingTransactions(false);
          setLoading(false); // Set loading to false on error as well
        }
      );

      return () => unsubscribeSnapshot();
    } else {
      setLoadingTransactions(false);
      setLoading(false); // Set loading to false if no user is logged in
    }
  }, [currentUser]);

  const income = transactions
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "debit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = income - expenses;

  const handleEdit = (item) => {
    navigate("/edit-expense", { state: { item: { ...item, id: item.id } } });
  };

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
              {loading ? (
                <h5>Loading...</h5> // Display loader while loading
              ) : (
                <h5>{currentUser ? currentUser.displayName : "Guest"}!</h5>
              )}
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
              {loadingTransactions ? (
                // Render multiple skeleton items while loading
                Array.from({ length: 5 }).map((_, index) => (
                  <TransactionSkeleton key={index} />
                ))
              ) : error ? (
                <li>Error loading transactions: {error}</li>
              ) : (
                transactions.map((item) => (
                  <li key={item.id} className="transaction-item">
                    <div className="left">
                      <div className="icon">
                        {/* <img src={item.icon} alt={item.name} /> */}
                      </div>
                      <div className="text">
                        <h4>{item.name}</h4>
                        {item.date && (
                          <p>
                            {new Date(item.date.toDate()).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className={`amount ${item.type}`}>
                      {item.type === "debit" ? "-" : "+"} INR{" "}
                      {item.amount.toFixed(2)}
                      <button
                        className="edit-btn"
                        onClick={(e) => {
                          e.preventDefault(); // Prevent navigation when clicking edit
                          handleEdit(item);
                        }}
                      >
                        <CiEdit />
                      </button>
                    </div>
                    {/* The Link now wraps the entire li, so the abs class is not needed here */}
                    {/* <Link
            to={`/transaction-details/${item.id}`}
            className="abs"
          ></Link> */}
                    <Link
                      to={`/transaction-details/${item.id}`}
                      className="transaction-link abs" // Optional class for styling the link
                      key={item.id}
                    ></Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          <BottomNav />
        </div>
      </motion.div>
    </>
  );
}

export default Home;
