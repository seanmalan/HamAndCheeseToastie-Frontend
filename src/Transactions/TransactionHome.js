import React, { useState, useEffect } from "react";
import TransactionList from "./TransactionList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";  // Import the default styles for DatePicker

const Home = () => {
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiUrl] = useState(process.env.REACT_APP_API_URL);

  useEffect(() => {
    const today = new Date();
    const past30Days = new Date(today);
    past30Days.setDate(today.getDate() - 30);

    setDateFrom(past30Days);
    setDateTo(today);
  }, []);

  const fetchTransactions = (dateFrom, dateTo) => {
    setLoading(true);
    setError(null);

    const queryParams = new URLSearchParams();
    if (dateFrom) queryParams.append("dateFrom", dateFrom.toISOString().split('T')[0]);
    if (dateTo) queryParams.append("dateTo", dateTo.toISOString().split('T')[0]);

    fetch(`${apiUrl}/Transaction?${queryParams.toString()}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setTransactions(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
  };

  return (
      <div className="container mt-4">
        <h1 className="mb-5 text-center text-primary">Transactions</h1>

        {/* Date Range Filter */}
        <div className="row mb-4">
          <div className="col">
            <label>
              Start Date:{" "}
              <DatePicker
                  selected={dateFrom}
                  onChange={(date) => setDateFrom(date)}
                  dateFormat="yyyy-MM-dd"
                  className="form-control d-inline-block w-auto"
              />
            </label>
          </div>
          <div className="col">
            <label>
              End Date:{" "}
              <DatePicker
                  selected={dateTo}
                  onChange={(date) => setDateTo(date)}
                  dateFormat="yyyy-MM-dd"
                  className="form-control d-inline-block w-auto"
              />
            </label>
          </div>
          <div className="col">
            <button className="btn btn-primary mt-3" onClick={() => fetchTransactions(dateFrom, dateTo)}>
              Filter
            </button>
          </div>
        </div>

        {/* Render Transaction List */}
        <TransactionList
            transactions={transactions}
            loading={loading}
            error={error}
            fetchTransactions={fetchTransactions}
        />
      </div>
  );
};

export default Home;
