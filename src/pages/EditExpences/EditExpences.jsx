import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import { motion } from "framer-motion";

const EditExpenses = () => {
  const { transactions, setTransactions } = useContext(TransactionContext);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { item, index } = state;

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("debit");

  useEffect(() => {
    if (item) {
      setName(item.name);
      setAmount(item.amount);
      setDate(item.date);
      setType(item.type);
    }
  }, [item]);

  const handleUpdate = () => {
    const updatedItem = {
      ...item,
      name,
      amount: parseFloat(amount),
      date,
      type,
    };

    const updatedList = [...transactions];
    updatedList[index] = updatedItem;
    setTransactions(updatedList);
    navigate("/home");
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
            {/* Name Dropdown */}
            <div className="form-group dropdown">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Type */}
            <div className="form-group dropdown">
              <select
                className="dropdown-box"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
            </div>

            {/* Type */}

            {/* Amount Input */}
            <div className="form-group amount">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {/* Date Picker */}
            <div className="form-group">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
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
