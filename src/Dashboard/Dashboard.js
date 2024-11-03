import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TotalSalesDashCard from "./TotalSalesDashCard";
import TotalTransactionsDashboard from "./TotalTransDashCard";
import TotalCustomersDashCard from "./TotalCustomersDashCard";
import CustomerInsightsWidget from "./CustomerInsightsWidget";
import RecentTransactionsDashboard from "./RecentTransactionsDashWidget";
import LowStockNotification from "./LowStockNotification";

export default function Dashboard() {
  return (
    <div className="container-fluid">
      <header className="d-flex justify-content-between align-items-center p-3 bg-primary text-white">
        <h1>Your Logo</h1>
        <div className="user-profile">
          <span>User Name</span>
        </div>
      </header>
      <div className="row">
        <nav className="col-md-3 col-lg-2 sidebar bg-light">
          <ul className="nav flex-column p-3">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Transactions
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Customers
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Analytics
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Users
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Settings
              </a>
            </li>
          </ul>
        </nav>
        <main className="col-md-9 col-lg-10 main-content p-3">
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <TotalSalesDashCard />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <TotalTransactionsDashboard />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <TotalCustomersDashCard />
                </div>
              </div>
            </div>
          </div>

          {/* Accordion Section for Recent Transactions and Customer Insights */}
          <div className="accordion" id="dashboardAccordion">
            {/* Products Notifications */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingNotifications">
                <button
                  className="accordion-button collapsed bg-light text-dark"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseNotifications"
                  aria-expanded="false"
                  aria-controls="collapseNotifications"
                >
                  Products Notifications
                </button>
              </h2>
              <div
                id="collapseNotifications"
                className="accordion-collapse collapse"
                aria-labelledby="headingNotifications"
                data-bs-parent="#dashboardAccordion"
              >
                <div className="accordion-body bg-primary text-white">
                  <LowStockNotification />
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTransactions">
                <button
                  className="accordion-button collapsed bg-light text-dark"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTransactions"
                  aria-expanded="false"
                  aria-controls="collapseTransactions"
                >
                  Recent Transactions
                </button>
              </h2>
              <div
                id="collapseTransactions"
                className="accordion-collapse collapse"
                aria-labelledby="headingTransactions"
                data-bs-parent="#dashboardAccordion"
              >
                <div className="accordion-body bg-primary text-white">
                  <RecentTransactionsDashboard />
                </div>
              </div>
            </div>

            {/* Customer Insights */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingInsights">
                <button
                  className="accordion-button collapsed bg-light text-dark"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseInsights"
                  aria-expanded="false"
                  aria-controls="collapseInsights"
                >
                  Customer Insights
                </button>
              </h2>
              <div
                id="collapseInsights"
                className="accordion-collapse collapse"
                aria-labelledby="headingInsights"
                data-bs-parent="#dashboardAccordion"
              >
                <div className="accordion-body bg-primary text-white">
                  <CustomerInsightsWidget />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <footer className="bg-light text-center p-3">
        <p>&copy; 2024 Your Company Name</p>
      </footer>
    </div>
  );
}
