import React from "react";
import "./ChartSkeleton.scss"; // Create this SCSS file

const ChartSkeleton = () => (
  <div className="chart-skeleton-container">
    <div className="chart-placeholder">
      <div className="skeleton-line wide"></div>
      <div className="skeleton-line medium"></div>
      <div className="skeleton-line short"></div>
      {/* Add more lines or shapes to represent the chart's visual structure */}
      <div className="skeleton-area"></div>
      <div className="skeleton-axis">
        <div className="skeleton-tick"></div>
        <div className="skeleton-tick"></div>
        <div className="skeleton-tick"></div>
        <div className="skeleton-tick"></div>
      </div>
    </div>
  </div>
);

export default ChartSkeleton;
