import React, { useState, useEffect } from "react";
import TransactionList from "./TransactionList";
import NotFound from "../Components/NotFound";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const Home = () => {
  const [dateFrom, setDateFrom] = useState(dayjs().subtract(30, "day"));
  const [dateTo, setDateTo] = useState(dayjs());
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [apiUrl] = useState(process.env.REACT_APP_API_URL);

  const fetchTransactions = (dateFrom, dateTo) => {
    setLoading(true);
    setError(null);
    setIsNotFound(false);

    const queryParams = new URLSearchParams();
    if (dateFrom) queryParams.append("dateFrom", dateFrom.format("YYYY-MM-DD"));
    if (dateTo) queryParams.append("dateTo", dateTo.format("YYYY-MM-DD"));

    fetch(`${apiUrl}/Transaction?${queryParams.toString()}`)
        .then((response) => {
          if (!response.ok) {
            if (response.status === 404) {
              setIsNotFound(true);
            }
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

  useEffect(() => {
    const initialDateFrom = dayjs().subtract(30, 'day');
    const initialDateTo = dayjs();
    fetchTransactions(initialDateFrom, initialDateTo);
  }, []);

  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="container mt-4">
          <h1 className="mb-5 text-center text-primary">Transactions</h1>

          {/* Date Range Filter */}
          <div className="row mb-4">
            <div className="col">
              <DatePicker
                  label="Start Date"
                  value={dateFrom}
                  onChange={(newValue) => setDateFrom(newValue)}
                  slotProps={{ textField: { size: "small" } }}
              />
            </div>
            <div className="col">
              <DatePicker
                  label="End Date"
                  value={dateTo}
                  onChange={(newValue) => setDateTo(newValue)}
                  slotProps={{ textField: { size: "small" } }}
              />
            </div>
            <div className="col">
              <button
                  className="btn btn-primary mt-3"
                  onClick={() => fetchTransactions(dateFrom, dateTo)}
              >
                Filter
              </button>
            </div>
          </div>

          {/* Conditional Rendering for NotFound */}
          {isNotFound ? (
              <NotFound item="Transactions" />
          ) : (
              <TransactionList
                  transactions={transactions}
                  loading={loading}
                  error={error}
                  fetchTransactions={fetchTransactions}
              />
          )}
        </div>
      </LocalizationProvider>
  );
};

export default Home;
