import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import NZDateFormatter from "../Components/DateFormat";
import PaymentMethod from "../Transactions/Components/PaymentMethod";
import NotFound from "../Components/NotFound";

const columns = [
  {
    id: "transactionId",
    label: "Transaction ID",
    minWidth: 120,
  },
  {
    id: "transactionDate",
    label: "Date",
    minWidth: 120,
    format: (value) => <NZDateFormatter date={value} length="short" />,
  },
  {
    id: "customerName",
    label: "Customer",
    minWidth: 150,
    format: (value, row) => (
      <Link to={`/customers/${row.customerId}`}>{value}</Link>
    ),
  },
  {
    id: "paymentMethod",
    label: "Payment Method",
    minWidth: 130,
    format: (value) => <PaymentMethod paymentMethod={value} />,
  },
  {
    id: "totalAmount",
    label: "Total Amount",
    minWidth: 100,
    align: "right",
    format: (value) => `$${value.toFixed(2)}`,
  },
  {
    id: "taxAmount",
    label: "Tax Amount",
    minWidth: 100,
    align: "right",
    format: (value) => `$${value.toFixed(2)}`,
  },
];

function UserTransactions() {
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const apiUrl = process.env.REACT_APP_API_URL;
  const url = `${apiUrl}/user/${id}/transactions`;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found. Please log in.");
      setLoading(false);
      return;
    }

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            return []; // Return empty array for no transactions
          }
          throw new Error("Failed to fetch transactions.");
        }
        return response.json();
      })
      .then((data) => {
        // Set transactions directly from the response data
        setTransactions(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">User Transactions</h1>
      {!transactions || transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((transaction) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={transaction.transactionId}
                    >
                      {columns.map((column) => {
                        const value = transaction[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format
                              ? column.format(value, transaction)
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <Link
                          to={`/transactions/${transaction.transactionId}/transactionItems`}
                          state={{ items: transaction.transactionItems }}
                          className="btn btn-secondary btn-sm"
                        >
                          View Transaction Items
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={transactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </div>
  );
}

export default UserTransactions;
