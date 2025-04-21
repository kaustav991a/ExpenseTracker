import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import "./Statistics.scss";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import BottomNav from "../../components/BottomNav/BottomNav";
import { db, auth } from "../../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import moment from "moment"; // Import moment.js for date manipulation

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#E6F4F1",
          padding: "6px 10px",
          borderRadius: "12px",
          color: "#1E3A3A",
          fontWeight: "600",
          fontSize: "14px",
        }}
      >
        {payload.map((item) => (
          <p key={item.dataKey} style={{ color: item.color }}>
            {item.name}: ₹{item.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function Statistics() {
  const [transactions, setTransactions] = useState([]);
  const [selectedChartType, setSelectedChartType] = useState("credit");
  const [selectedPeriod, setSelectedPeriod] = useState("day"); // Default to day
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(""); // Initialize as empty
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [timeFrameOptions, setTimeFrameOptions] = useState([]);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribeAuth;
  }, []);

  useEffect(() => {
    setLoading(true);
    setTransactions([]);
    setError(null);

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
            timestamp: doc.data().timestamp?.toDate(),
          }));
          setTransactions(fetchedTransactions);
          setLoading(false);
        },
        (err) => {
          setError(err.message);
          setLoading(false);
        }
      );
      return () => unsubscribeSnapshot();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    const generateTimeFrameOptions = () => {
      if (selectedPeriod === "day") {
        setTimeFrameOptions([
          { value: "today", label: "Today" },
          { value: "yesterday", label: "Yesterday" },
          { value: "last7days", label: "Last 7 Days" },
          { value: "all", label: "All Days" }, // Added "All Days" option
        ]);
        setSelectedTimeFrame("today"); // Set initial value for Day
      } else if (selectedPeriod === "month") {
        const months = moment.months().map((month, index) => ({
          value: index,
          label: month,
        }));
        setTimeFrameOptions([{ value: "all", label: "All Months" }, ...months]);
        setSelectedTimeFrame(moment().month().toString()); // Set initial value for Month (current month index)
      } else if (selectedPeriod === "year") {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = currentYear; i >= 1996; i--) {
          years.push({ value: i, label: i.toString() });
        }
        setTimeFrameOptions([{ value: "all", label: "All Years" }, ...years]);
        setSelectedTimeFrame(currentYear.toString()); // Set initial value for Year
      } else {
        setTimeFrameOptions([]);
        setSelectedTimeFrame("");
      }
    };

    generateTimeFrameOptions();
  }, [selectedPeriod]);

  useEffect(() => {
    const processChartData = () => {
      const filteredByType = transactions.filter(
        (t) => t.type === selectedChartType
      );
      let filteredByTime = [];

      if (selectedPeriod === "day") {
        if (selectedTimeFrame === "today") {
          filteredByTime = filteredByType.filter((t) =>
            moment(t.timestamp).isSame(moment(), "day")
          );
        } else if (selectedTimeFrame === "yesterday") {
          filteredByTime = filteredByType.filter((t) =>
            moment(t.timestamp).isSame(moment().subtract(1, "day"), "day")
          );
        } else if (selectedTimeFrame === "last7days") {
          filteredByTime = filteredByType.filter((t) =>
            moment(t.timestamp).isSameOrAfter(
              moment().subtract(6, "days"),
              "day"
            )
          );
        } else if (selectedTimeFrame === "all") {
          filteredByTime = filteredByType; // Show all days
        }
      } else if (selectedPeriod === "month") {
        if (selectedTimeFrame !== "all") {
          filteredByTime = filteredByType.filter(
            (t) => moment(t.timestamp).month().toString() === selectedTimeFrame
          );
        } else {
          filteredByTime = filteredByType;
        }
      } else if (selectedPeriod === "year") {
        if (selectedTimeFrame !== "all") {
          filteredByTime = filteredByType.filter(
            (t) => moment(t.timestamp).year().toString() === selectedTimeFrame
          );
        } else {
          filteredByTime = filteredByType;
        }
      }

      const aggregatedData = {};
      filteredByTime.forEach((t) => {
        if (t.timestamp) {
          let key = "";
          let displayKey = "";
          if (selectedPeriod === "day") {
            key = moment(t.timestamp).format("YYYY-MM-DD HH:mm:ss");
            displayKey = moment(t.timestamp).format("HH:mm:ss");
          } else if (selectedPeriod === "month") {
            key = moment(t.timestamp).format("YYYY-MM");
            displayKey = moment(t.timestamp).format("MMMM");
          } else if (selectedPeriod === "year") {
            key = moment(t.timestamp).format("YYYY");
            displayKey = moment(t.timestamp).format("YYYY");
          }

          if (!aggregatedData[key]) {
            aggregatedData[key] = { time: displayKey, amount: 0 };
          }
          aggregatedData[key].amount += parseFloat(t.amount);
        }
      });

      setChartData(
        Object.values(aggregatedData).sort((a, b) => {
          if (selectedPeriod === "day") {
            return (
              new Date(`2000-01-01T${a.time}`) -
              new Date(`2000-01-01T${b.time}`)
            ); // Compare times
          } else {
            return new Date(a.time) - new Date(b.time); // Compare dates/months/years
          }
        })
      );
    };

    processChartData();
  }, [transactions, selectedChartType, selectedPeriod, selectedTimeFrame]);

  const handleChartTypeChange = (event) => {
    setSelectedChartType(event.target.value);
  };

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
    setSelectedTimeFrame(""); // Reset time frame when period changes
  };

  const handleTimeFrameChange = (event) => {
    setSelectedTimeFrame(event.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const chartColor = selectedChartType === "credit" ? "#2F8F83" : "#E53935";
  const chartName = selectedChartType === "credit" ? "Income" : "Expenses";
  const yAxisLabel =
    selectedChartType === "credit" ? "Credit Amount" : "Debit Amount";

  const getListTitle = () => {
    let title = "Transactions";
    if (selectedPeriod === "day") {
      if (selectedTimeFrame === "today") title = "Today's";
      if (selectedTimeFrame === "yesterday") title = "Yesterday's";
      if (selectedTimeFrame === "last7days") title = "Last 7 Days'";
      if (selectedTimeFrame === "all") title = "All Days'";
    } else if (selectedPeriod === "month") {
      const selectedMonth = timeFrameOptions.find(
        (opt) => opt.value === selectedTimeFrame
      );
      title = selectedMonth ? `${selectedMonth.label}'s` : "Monthly";
    } else if (selectedPeriod === "year") {
      title = selectedTimeFrame !== "all" ? `${selectedTimeFrame}'s` : "Yearly";
    }
    return `${title} ${chartName}`;
  };

  const formatListItemDate = (timestamp) => {
    if (selectedPeriod === "day") {
      return timestamp.toLocaleTimeString();
    } else if (selectedPeriod === "month") {
      return timestamp.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } else if (selectedPeriod === "year") {
      return timestamp.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return timestamp.toLocaleDateString();
  };

  const filteredTransactionList = transactions.filter((transaction) => {
    if (transaction.type !== selectedChartType) return false;
    if (selectedPeriod === "day") {
      if (selectedTimeFrame === "today")
        return moment(transaction.timestamp).isSame(moment(), "day");
      if (selectedTimeFrame === "yesterday")
        return moment(transaction.timestamp).isSame(
          moment().subtract(1, "day"),
          "day"
        );
      if (selectedTimeFrame === "last7days")
        return moment(transaction.timestamp).isSameOrAfter(
          moment().subtract(6, "days"),
          "day"
        );
      if (selectedTimeFrame === "all") return true;
      return true; // Default to today if no valid selection
    } else if (selectedPeriod === "month") {
      return (
        selectedTimeFrame === "all" ||
        moment(transaction.timestamp).month().toString() === selectedTimeFrame
      );
    } else if (selectedPeriod === "year") {
      return (
        selectedTimeFrame === "all" ||
        moment(transaction.timestamp).year().toString() === selectedTimeFrame
      );
    }
    return true;
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="home-outer">
          <div className="topbluesec whitebg">
            <Link title="Back" className="whitearrow" to="/home">
              &larr;
            </Link>
            <div className="text">
              <h5>Statistics</h5>
            </div>
            <div className="notification">
              <Link>
                <FaBell size={24} color="#333" />
              </Link>
            </div>
          </div>

          <div className="chartrow">
            <div className="chartOuter">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 30, right: 20, left: 20, bottom: 50 }}
                >
                  <defs>
                    <linearGradient
                      id={`color${chartName}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={chartColor}
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="100%"
                        stopColor={chartColor}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" tick={{ fill: "#444", fontSize: 12 }} />
                  <YAxis
                    tick={{ fill: "#444", fontSize: 12 }}
                    label={{
                      value: yAxisLabel,
                      angle: -90,
                      position: "left",
                      stroke: "#444",
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke={chartColor}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill={`url(#color${chartName})`}
                    name={chartName}
                    dot={{ fill: chartColor, strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-selector">
              <label>Select Chart:</label>
              <select
                value={selectedChartType}
                onChange={handleChartTypeChange}
              >
                <option value="credit">Income</option>
                <option value="debit">Expenses</option>
              </select>
              <div className="view-selector">
                <label>View By:</label>
                <select value={selectedPeriod} onChange={handlePeriodChange}>
                  <option value="day">Day</option>
                  <option value="month">Month</option>
                  <option value="year">Year</option>
                </select>
              </div>
              {selectedPeriod && (
                <div className="timeframe-selector">
                  <label>
                    {selectedPeriod.charAt(0).toUpperCase() +
                      selectedPeriod.slice(1)}
                    :
                  </label>
                  <select
                    value={selectedTimeFrame}
                    onChange={handleTimeFrameChange}
                  >
                    {timeFrameOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="transactions w-full">
            <div className="transactions-header">
              <h3>{getListTitle()}</h3>
              <Link to="#!" className="see-all">
                See all
              </Link>
            </div>
            <ul className="transactions-list">
              {filteredTransactionList.length > 0 ? (
                filteredTransactionList.map((transaction) => (
                  <li key={transaction.id} className="transaction-item">
                    <div className="left">
                      <div
                        className="icon"
                        style={{
                          backgroundColor: chartColor,
                          opacity: 0.7,
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          marginRight: "8px",
                        }}
                      ></div>
                      <div className="text">
                        <h4>
                          {transaction.name ||
                            transaction.type.charAt(0).toUpperCase() +
                              transaction.type.slice(1)}
                        </h4>
                        <p>{formatListItemDate(transaction.timestamp)}</p>
                      </div>
                    </div>
                    <div
                      className={`amount ${
                        transaction.type === "credit" ? "credit" : "debit"
                      }`}
                    >
                      {transaction.type === "credit" ? "+ " : "- "}₹
                      {transaction.amount.toLocaleString()}
                    </div>
                    <Link
                      className="abs"
                      to={`/transaction-details/${transaction.id}`}
                    ></Link>
                  </li>
                ))
              ) : (
                <li className="no-data">
                  No data available for the selected period.
                </li>
              )}
            </ul>
          </div>
        </div>
        <BottomNav />
      </motion.div>
    </>
  );
}

export default Statistics;
