import React from "react";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="main-title">Product Management</h1>
        <h2 className="sub-title">Manage Products & Categories with Ease</h2>
        <p className="description">
          Welcome to the <strong>Product Management</strong> application.  
          Organize, track, and manage your products and categories effortlessly.  
          Future updates will bring analytics, assignments, and more!
        </p>
      </section>

      {/* Features Section */}
      <section className="features-grid">
        <div className="feature-card">
          <h3>Products</h3>
          <p>Add, edit, delete, and manage your products in one place.</p>
        </div>
        <div className="feature-card">
          <h3>Categories</h3>
          <p>Organize products into categories for better tracking.</p>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
