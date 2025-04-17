// src/components/SkeletonLoader/TransactionSkeleton.jsx
import React from "react";
import "./TransactionSkeleton.scss"; // Create this CSS file

const TransactionSkeleton = () => {
  return (
    <li className="transaction-skeleton-item">
      <div className="skeleton-left">
        <div className="skeleton-icon"></div>
        <div className="skeleton-text">
          <div className="skeleton-line short"></div>
          <div className="skeleton-line longer"></div>
        </div>
      </div>
      <div className="skeleton-amount">
        <div className="skeleton-line short"></div>
      </div>
    </li>
  );
};

export default TransactionSkeleton;
