// src/pages/TransactionDetails/TransactionDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./TransactionDetails.scss";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the path if necessary

function TransactionDetails() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      setLoading(true);
      setError(null);

      try {
        const transactionDocRef = doc(db, "transactions", id);
        const docSnap = await getDoc(transactionDocRef);

        if (docSnap.exists()) {
          setTransaction({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Transaction not found.");
        }
      } catch (err) {
        setError("Failed to fetch transaction details.");
        console.error("Error fetching transaction:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  if (loading) {
    return <p>Loading transaction details...</p>;
  }

  if (error) {
    return (
      <div className="transaction-details-page error">
        <div className="header">
          <Link to="/home" className="back-button">
            <FaArrowLeft />
          </Link>
          <h2>Transaction Details</h2>
          <span className="blank">&nbsp;</span>
        </div>
        <p className="error-message">Error: {error}</p>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="transaction-details-page not-found">
        <div className="header">
          <Link to="/home" className="back-button">
            <FaArrowLeft />
          </Link>
          <h2>Transaction Details</h2>
          <span className="blank">&nbsp;</span>
        </div>
        <p>Transaction not found.</p>
      </div>
    );
  }

  const formatDate = (timestamp) => {
    if (timestamp && timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return "N/A";
  };

  const formatTime = (timestamp) => {
    if (timestamp && timestamp.toDate) {
      return timestamp.toDate().toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }
    return "N/A";
  };

  const isCredit = transaction.type === "credit";
  const statusText = isCredit ? "Income" : "Expense";
  const amountSign = isCredit ? "+" : "-";
  const totalAmount =
    transaction.totalAmount !== undefined
      ? transaction.totalAmount
      : transaction.amount !== undefined
      ? transaction.fee !== undefined
        ? transaction.amount - transaction.fee
        : transaction.amount
      : 0;

  return (
    <div
      className={`transaction-details-page ${
        isCredit ? "credit-page" : "debit-page"
      }`}
    >
      <div className="header">
        <Link to="/home" className="back-button">
          <FaArrowLeft />
        </Link>
        <h2>Transaction Details</h2>
        <span className="blank">&nbsp;</span>
      </div>

      <div className="amount-header">
        <h3 className={`status ${isCredit ? "income" : "expense"}`}>
          {statusText}
        </h3>
        <h2 className="amount">
          {amountSign} ₹
          {transaction.amount ? transaction.amount.toLocaleString() : "0.00"}
        </h2>
      </div>

      <div className="details-section">
        <h3>Transaction details</h3>
        <div className="detail-item">
          <span className="label">Status</span>
          <span className={`value ${isCredit ? "income" : "expense"}`}>
            {statusText}
          </span>
        </div>
        <div className="detail-item">
          <span className="label">{isCredit ? "From" : "To"}</span>
          <span className="value">
            {transaction.sender || transaction.receiver || "N/A"}
          </span>{" "}
          {/* Adjust based on your data */}
        </div>
        <div className="detail-item">
          <span className="label">Time</span>
          <span className="value">{formatTime(transaction.timestamp)}</span>
        </div>
        <div className="detail-item">
          <span className="label">Date</span>
          <span className="value">{formatDate(transaction.timestamp)}</span>
        </div>
        {transaction.earnings !== undefined && (
          <div className="detail-item">
            <span className="label">Earnings</span>
            <span className="value">
              + ₹{transaction.earnings.toLocaleString()}
            </span>
          </div>
        )}
        {transaction.spending !== undefined && (
          <div className="detail-item">
            <span className="label">Spending</span>
            <span className="value">
              - ₹{transaction.spending.toLocaleString()}
            </span>
          </div>
        )}
        {transaction.fee !== undefined && (
          <div className="detail-item">
            <span className="label">Fee</span>
            <span className="value">- ₹{transaction.fee.toLocaleString()}</span>
          </div>
        )}
      </div>

      <div className="total-section">
        <span className="label">Total</span>
        <span className={`value ${isCredit ? "income" : "expense"}`}>
          ₹{totalAmount.toLocaleString()}
        </span>
      </div>

      <button className="download-receipt-btn btn">Download Receipt</button>
    </div>
  );
}

export default TransactionDetails;
