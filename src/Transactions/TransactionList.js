import React from "react";
import { Link } from "react-router-dom";
import NZDateFormatter from "../Components/DateFormat";
import PaymentMethod from "./Components/PaymentMethod";
import NotFound from "../Components/NotFound";

const TransactionList = ({ transactions, loading, error, fetchTransactions }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (transactions.length === 0) return <NotFound item="Transactions" />;

    return (
        <div>
            {/* Transaction Table */}
            <div className="table-responsive" style={{ maxHeight: '400px' }}>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Total Amount</th>
                        <th>Discount</th>
                        <th>Payment Method</th>
                        <th>Tax Amount</th>
                        <th>Cashier</th>
                        <th>Customer</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.transactionId}>
                            <td>{transaction.transactionId}</td>
                            <td>
                                <NZDateFormatter
                                    date={transaction.transactionDate}
                                    length={"short"}
                                />
                            </td>
                            <td>${transaction.totalAmount.toFixed(2)}</td>
                            <td>${transaction.discount.toFixed(2)}</td>
                            <td>
                                <PaymentMethod paymentMethod={transaction.paymentMethod} />
                            </td>
                            <td>${transaction.taxAmount.toFixed(2)}</td>
                            <td><Link to={`/users/${transaction.userId}`}>{transaction.userId}</Link></td>
                            <td><Link to={`/Customers/${transaction.customer.customerId}`}>{transaction.customer.firstName + ' ' + transaction.customer.lastName}</Link></td>
                            <td>
                                <Link
                                    to={`/transactions/${transaction.transactionId}`}
                                    className="btn btn-primary btn-sm"
                                >
                                    View
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionList;
