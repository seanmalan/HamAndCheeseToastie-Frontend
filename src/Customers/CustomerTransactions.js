import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "../Components/NotFound";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  {
    id: "transactionDate",
    label: "Date",
    minWidth: 120,
    format: (value) => new Date(value).toLocaleDateString(),
  },
  {
    id: "totalAmount",
    label: "Total Amount",
    minWidth: 100,
    align: "right",
    format: (value) => `$${value.toFixed(2)}`,
  },
  {
    id: "discount",
    label: "Discount",
    minWidth: 100,
    align: "right",
    format: (value) => `$${value.toFixed(2)}`,
  },
  {
    id: "paymentMethod",
    label: "Payment Method",
    minWidth: 130,
  },
  {
    id: "taxAmount",
    label: "Tax Amount",
    minWidth: 100,
    align: "right",
    format: (value) => `$${value.toFixed(2)}`,
  },
  {
    id: "userId",
    label: "Cashier",
    minWidth: 150,
  },
];

const TransactionList = () => {
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const apiUrl = process.env.REACT_APP_API_URL;
  const url = `${apiUrl}/Customer/${id}/transactions`;

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
        if (!response.ok) throw new Error("Failed to fetch customer details.");
        return response.json();
      })
      .then((data) => {
        setTransactions(data.transactions);
        setCustomer(data.customer);
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
      <Link to={`/customers/${id}`} className="btn btn-secondary mb-4">
        Back to Customer
      </Link>
      <h1 className="mb-1 text-center">Transaction List</h1>
      {customer && (
        <p className="text-center">
          Customer: {customer.firstName} {customer.lastName}
        </p>
      )}
      {transactions.length === 0 ? (
        <NotFound item="Transactions" />
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
                            {column.id === "userId" ? (
                              <Link to={`/users/${transaction.userId}`}>
                                {transaction.cashierName}
                              </Link>
                            ) : column.format ? (
                              column.format(value)
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <Link
                          to={`/transactions/${transaction.transactionId}`}
                          className="btn btn-primary btn-sm"
                        >
                          View
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
};

export default TransactionList;
