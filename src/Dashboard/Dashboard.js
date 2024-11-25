import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TotalSalesDashCard from "./TotalSalesDashCard";
import TotalTransactionsDashboard from "./TotalTransDashCard";
import TotalCustomersDashCard from "./TotalCustomersDashCard";
import CustomerInsightsWidget from "./CustomerInsightsWidget";
import RecentTransactionsDashboard from "./RecentTransactionsDashWidget";
import LowStockNotification from "./LowStockNotification";
import { AuthContext } from "../Context/AuthContext";
import NotLoggedIn from "../Auth/NotLoggedIn";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <NotLoggedIn />;
  }

  return (
      <div className="container-fluid">


        <div className="row">
          {/* Main Content */}
          <main className="col-md col-lg-12 main-content p-3">
            <div className="row mb-4">
              {/* Sales Card */}
              <div className="col-md-4 mb-4">
                <div className="card text-center shadow-sm">
                  <div className="card-body">
                    <TotalSalesDashCard />
                  </div>
                </div>
              </div>

              {/* Transactions Card */}
              <div className="col-md-4 mb-4">
                <div className="card text-center shadow-sm">
                  <div className="card-body">
                    <TotalTransactionsDashboard />
                  </div>
                </div>
              </div>

              {/* Customers Card */}
              <div className="col-md-4 mb-4">
                <div className="card text-center shadow-sm">
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
      </div>
  );
}
