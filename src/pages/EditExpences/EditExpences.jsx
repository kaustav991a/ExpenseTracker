import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";

const EditExpenses = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { item } = state; // Assuming 'item' now contains the document ID

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("debit");

  useEffect(() => {
    if (item) {
      setName(item.name);
      setAmount(item.amount);
      setDate(item.date?.toDate().toISOString().slice(0, 10) || ""); // Format Firestore Timestamp
      setType(item.type);
    }
  }, [item]);

  const handleUpdate = async () => {
    const user = auth.currentUser;
    if (!user || !item?.id) {
      console.error("User not authenticated or transaction ID missing.");
      return;
    }

    try {
      const transactionDocRef = doc(db, "transactions", item.id);
      await updateDoc(transactionDocRef, {
        name: name,
        amount: parseFloat(amount),
        date: new Date(date), // Convert back to Date object for Firestore
        type: type,
        timestamp: serverTimestamp(), // Update the timestamp
      });
      navigate("/home");
    } catch (error) {
      console.error("Error updating transaction:", error);
      // Handle error (e.g., display a message to the user)
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="add-expense-container">
        <div className="top-bar">
          <Link to="/home">&larr;</Link>
          <h2>Edit Expense</h2>
          <button className="menu-btn">•••</button>
        </div>

        <div className="form-wrapper">
          <form className="expense-form" onSubmit={(e) => e.preventDefault()}>
            {/* Name Input */}
            <div className="form-group dropdown">
              <label htmlFor="expense-name">Name</label>
              <input
                type="text"
                id="expense-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-input"
              />
            </div>

            {/* Type Dropdown */}
            <div className="form-group dropdown">
              <label htmlFor="transaction-type">Type</label>
              <select
                className="dropdown-box"
                value={type}
                onChange={(e) => setType(e.target.value)}
                id="transaction-type"
              >
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
            </div>

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

            {/* Update Button */}
            <button className="btn" onClick={handleUpdate}>
              Update Expense
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default EditExpenses;
