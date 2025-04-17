import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Dot,
} from "recharts";
import { motion } from "framer-motion";
import "./Statistics.scss";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import BottomNav from "../../components/BottomNav/BottomNav";

const data = [
  { month: "Mar", amount: 400 },
  { month: "Apr", amount: 800 },
  { month: "May", amount: 1230 }, // Highlighted point
  { month: "Jun", amount: 900 },
  { month: "Jul", amount: 1100 },
  { month: "Aug", amount: 700 },
  { month: "Sep", amount: 950 },
];
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
        ${payload[0].value.toLocaleString()}
      </div>
    );
  }

  return null;
};
function Statistics() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="home-outer">
          <div className="topbluesec whitebg">
            <Link className="whitearrow" to="/home">
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

          <div className="chartOuter">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 30, right: 20, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2F8F83" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#2F8F83" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: "#444", fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#2F8F83"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorAmount)"
                  dot={{ fill: "#2F8F83", strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </AreaChart>
            </ResponsiveContainer>

            <div className="transactions w-full">
              <div className="transactions-header">
                <h3>Top Spending</h3>
                <Link to="#!" className="see-all">
                  See all
                </Link>
              </div>
              <ul className="transactions-list">
                <li className="transaction-item">
                  <div className="left">
                    <div className="icon"></div>
                    <div className="text">
                      <h4>Salary</h4>
                      <p>Tue Feb 22 2022</p>
                    </div>
                  </div>
                  <div className="amount credit">+ INR 15784.00</div>
                  <Link className="abs" href="/transaction-details"></Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <BottomNav />
      </motion.div>
    </>
  );
}

export default Statistics;
