import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav className="col-md-3 col-lg-2 sidebar bg-light">
      <ul className="nav flex-column p-3">
        <li className="nav-item">
          <Link className="nav-link active" to="/">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/products">
            Products
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/transactions">
            Transactions
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/customers">
            Customers
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/categories">
            Categories
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/analytics">
            Analytics
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/users">
            Users
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/settings">
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}
