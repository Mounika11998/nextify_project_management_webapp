import React from "react";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title"> Dashboard</h1>
        <p className="dashboard-subtitle">
          Welcome to the <strong>Product Management</strong> application.
        </p>

        <ul className="dashboard-list">
          <li> Manage products and categories</li>
          <li> Create and edit entries</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
