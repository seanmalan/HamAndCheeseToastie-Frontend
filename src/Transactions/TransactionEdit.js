import React, {useState, useEffect, useContext} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams } from "react-router-dom";
import NZDateFormatter from "../Components/DateFormat";
import { AuthContext } from "../Context/AuthContext";

function TransactionEdit() {
  const { id } = useParams(); // To get the transaction ID if needed
  const [transaction, setTransaction] = useState({
    transactionDate: "2024-10-27", // Set to the initial date here
    totalAmount: "",
    discount: "",
    paymentMethod: "Cash",
    taxAmount: "",
    cashierId: "",
    customerId: "",
  });

  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`${apiUrl}/api/Transaction/${id}`) // Replace with your API URL
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setTransaction(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Transaction updated:", transaction);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
      <div
          className="d-flex justify-content-center align-items-center vh-100"
          style={{backgroundColor: "#d0e7f9"}}
      >
        <div
            className="p-5 rounded shadow"
            style={{
              backgroundColor: "#f2f2f2",
              maxWidth: "600px",
              width: "100%",
            }}
        >
          <div className="container mt-5">
            <Link to={`/transactions`} className="btn btn-outline-dark mb-3">
              Back to Transactions
            </Link>
            <h1 className="text-center mb-4">Edit Transaction</h1>
            <div className="card shadow-lg p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="transactionDate" className="form-label">
                    Transaction Date:
                  </label>
                  <div className="mb-2">
                    <NZDateFormatter date={transaction.transactionDate} length={"long"}/>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="totalAmount" className="form-label">
                    Total Amount:
                  </label>
                  <input
                      type="number"
                      className="form-control"
                      id="totalAmount"
                      name="totalAmount"
                      value={transaction.totalAmount}
                      onChange={handleChange}
                      required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="discount" className="form-label">
                    Discount:
                  </label>
                  <input
                      type="number"
                      className="form-control"
                      id="discount"
                      name="discount"
                      value={transaction.discount}
                      onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="paymentMethod" className="form-label">
                    Payment Method:
                  </label>
                  <select
                      className="form-control"
                      id="paymentMethod"
                      name="paymentMethod"
                      value={transaction.paymentMethod}
                      onChange={handleChange}
                      required
                  >
                    <option value="Cash">Cash</option>
                    <option value="CreditCard">Credit Card</option>
                    <option value="DebitCard">Debit Card</option>
                    <option value="MobilePayment">Mobile Payment</option>
                    <option value="GiftCard">Gift Card</option>
                    <option value="BankTransfer">Bank Transfer</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="taxAmount" className="form-label">
                    Tax Amount:
                  </label>
                  <input
                      type="number"
                      className="form-control"
                      id="taxAmount"
                      name="taxAmount"
                      value={transaction.taxAmount}
                      onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="cashierId" className="form-label">
                    Cashier ID:
                  </label>
                  <input
                      type="number"
                      className="form-control"
                      id="cashierId"
                      name="cashierId"
                      value={transaction.cashierId}
                      onChange={handleChange}
                      required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="customerId" className="form-label">
                    Customer ID:
                  </label>
                  <input
                      type="number"
                      className="form-control"
                      id="customerId"
                      name="customerId"
                      value={transaction.customerId}
                      onChange={handleChange}
                  />
                </div>

                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>

                  <Link to={`/Customers/${transaction.customerId}`} className="btn btn-outline-secondary">
                    View Customer
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
          );
          }


          export default TransactionEdit;
