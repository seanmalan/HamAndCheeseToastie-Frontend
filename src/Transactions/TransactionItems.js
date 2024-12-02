import React from "react";
import { Link, useLocation } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const columns = [
  {
    id: "name",
    label: "Product Name",
    minWidth: 150,
    format: (value, item) => item.product?.name || "Unknown",
  },
  {
    id: "brandName",
    label: "Brand Name",
    minWidth: 120,
    format: (value, item) => item.product?.brandName || "Unknown",
  },
  {
    id: "quantity",
    label: "Quantity",
    minWidth: 100,
    align: "right",
  },
  {
    id: "weight",
    label: "Weight",
    minWidth: 80,
    format: (value, item) => item.product?.weight || "Unknown",
  },
  {
    id: "unitPrice",
    label: "Unit Price",
    minWidth: 100,
    align: "right",
    format: (value) => `$${value.toFixed(2)}`,
  },
  {
    id: "totalPrice",
    label: "Total Price",
    minWidth: 100,
    align: "right",
    format: (value) => `$${value.toFixed(2)}`,
  },
  {
    id: "category",
    label: "Category",
    minWidth: 120,
    format: (value, item) => item.product?.categoryName || "Unknown",
  },
];

function TransactionItems() {
  const location = useLocation();
  const items = location.state?.items || [];

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Transaction Items</h1>
      {items.length === 0 ? (
        <p>No items found for this transaction.</p>
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
                {items.map((item) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                    {columns.map((column) => {
                      const value = item[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value, item) : value}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <Link
                        to={`/products/${item.product.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        View Product
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
      <div className="mt-3">
        <Link to={`/transactions`} className="btn btn-secondary">
          Back to Transactions
        </Link>
      </div>
    </div>
  );
}

export default TransactionItems;
