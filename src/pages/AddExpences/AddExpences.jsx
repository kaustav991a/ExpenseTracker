import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext"; // adjust path
import { motion } from "framer-motion";
import "./AddExpences.scss";

function AddExpences() {
  const [type, setType] = useState("credit");
  const { transactions, setTransactions } = useContext(TransactionContext); // ✅ Correct context usage
  const [selectedName, setSelectedName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("2022-02-22");
  const [invoice, setInvoice] = useState(null);

  const nameOptions = [
    { name: "Netflix" },
    { name: "Spotify" },
    { name: "Amazon" },
  ];

  const getRelativeDate = (d) => {
    const today = new Date();
    const inputDate = new Date(d);
    const diff = (today - inputDate) / (1000 * 3600 * 24);

    if (diff < 1) return "Today";
    if (diff < 2) return "Yesterday";
    return inputDate.toDateString(); // ex: Mon Jan 22 2022
  };

  const handleAddExpense = () => {
    const icon = nameOptions.find((opt) => opt.name === selectedName)?.icon;
    const newTransaction = {
      name: selectedName,
      icon,
      amount: parseFloat(amount),
      date: getRelativeDate(date),
      type, // credit or debit
    };

    setTransactions((prevTransactions) => [
      newTransaction,
      ...prevTransactions,
    ]);

    // Reset fields
    setAmount("");
    setInvoice(null);

    // ✅ Navigate to /home after state update
    navigate("/home");
  };

  const handleInvoiceUpload = (e) => {
    setInvoice(e.target.files[0]);
  };
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="add-expense-container">
        <div className="top-bar">
          <Link to="/home">&larr;</Link>

          <h2>Add Expense</h2>
          <button className="menu-btn">•••</button>
        </div>

        <div className="form-wrapper">
          <form className="expense-form" onSubmit={(e) => e.preventDefault()}>
            {/* Name Dropdown */}
            <div className="form-group dropdown">
              <label htmlFor="expense-name">Name</label>
              <input
                type="text"
                id="expense-name"
                value={selectedName}
                onChange={(e) => setSelectedName(e.target.value)}
                placeholder="Enter expense name"
                className="text-input"
              />
            </div>

            {/* Type */}
            <div className="form-group dropdown">
              <label htmlFor="transaction-type">Type</label>
              <select
                id="transaction-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="dropdown-box"
              >
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
            </div>

            {/* Type */}

            {/* Amount Input */}
            <div className="form-group amount">
              <label htmlFor="amount">Amount</label>
              <div className="amount-input-box">
                <span className="currency">$</span>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button
                  type="button"
                  className="clear-btn"
                  onClick={() => setAmount("")}
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Date Picker */}
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="date-picker"
              />
            </div>

            {/* Invoice Upload */}
            <div className="form-group invoice-upload">
              <label htmlFor="invoice">Invoice</label>
              <div
                className="upload-box"
                onClick={() => document.getElementById("invoice").click()}
              >
                <span className="plus-icon">+</span>
                <span>{invoice ? invoice.name : "Add Invoice"}</span>
              </div>
              <input
                type="file"
                id="invoice"
                style={{ display: "none" }}
                onChange={handleInvoiceUpload}
              />
            </div>

            {/* Add Button */}
            <button
              className="add-btn btn"
              type="button"
              onClick={handleAddExpense}
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default AddExpences;
