import React from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import NZDateFormatter from "../Components/DateFormat";
import PaymentMethod from "./Components/PaymentMethod";
import NotFound from "../Components/NotFound";

const columns = [
  { id: "transactionId", label: "ID", minWidth: 50 },
  {
    id: "transactionDate",
    label: "Date",
    minWidth: 100,
    format: (value) => <NZDateFormatter date={value} length="short" />,
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
    format: (value) => <PaymentMethod paymentMethod={value} />,
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
    minWidth: 100,
    format: (value) => <Link to={`/users/${value}`}>{value}</Link>,
  },
  {
    id: "customer",
    label: "Customer",
    minWidth: 150,
    format: (value) => (
      <Link to={`/Customers/${value.customerId}`}>
        {value.firstName + " " + value.lastName}
      </Link>
    ),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 100,
    format: (value, row) => (
      <Link
        to={`/transactions/${row.transactionId}`}
        className="btn btn-primary btn-sm"
      >
        View
      </Link>
    ),
  },
];

const TransactionList = ({
  transactions,
  loading,
  error,
  fetchTransactions,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!transactions || transactions.length === 0)
    return <NotFound item="Transactions" />;

  return (
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
              .map((transaction) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={transaction.transactionId}
                  >
                    {columns.map((column) => {
                      const value =
                        column.id === "actions" ? null : transaction[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format
                            ? column.format(value, transaction)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
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
  );
};

export default TransactionList;
