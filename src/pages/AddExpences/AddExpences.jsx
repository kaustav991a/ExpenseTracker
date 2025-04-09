import React, { useState } from "react";
import "./AddExpences.scss";

function AddExpences() {
  const [selectedName, setSelectedName] = useState("Netflix");
  const [amount, setAmount] = useState("48.00");
  const [date, setDate] = useState("2022-02-22");
  const [invoice, setInvoice] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const nameOptions = [
    { name: "Netflix", icon: "netflix-icon.png" },
    { name: "Spotify", icon: "spotify-icon.png" },
    { name: "Amazon", icon: "amazon-icon.png" },
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
      isPositive: false,
    };

    setTransactions([newTransaction, ...transactions]);
    // Reset fields
    setAmount("");
    setInvoice(null);
  };

  const handleInvoiceUpload = (e) => {
    setInvoice(e.target.files[0]);
  };

  return (
    <div className="add-expense-container">
      <div className="top-bar">
        <button className="back-btn">&larr;</button>
        <h2>Add Expense</h2>
        <button className="menu-btn">•••</button>
      </div>

      <div className="form-wrapper">
        <form className="expense-form" onSubmit={(e) => e.preventDefault()}>
          {/* Name Dropdown */}
          <div className="form-group dropdown">
            <label htmlFor="expense-name">Name</label>
            <select
              id="expense-name"
              value={selectedName}
              onChange={(e) => setSelectedName(e.target.value)}
              className="dropdown-box"
            >
              {nameOptions.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          {/* Amount Input */}
          <div className="form-group amount">
            <label htmlFor="amount">Amount</label>
            <div className="amount-input-box">
              <span className="currency">$</span>
              <input
                type="text"
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
          <button className="add-btn" type="button" onClick={handleAddExpense}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddExpences;
