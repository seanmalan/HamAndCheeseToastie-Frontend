import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import DashboardPage from "./Dashboard/Dashboard";
import LoginPage from "./Auth/Login";
import RegisterPage from "./Auth/Register";
import ProductsHome from "./Products/ProductsHome";
import ProductsEdit from "./Products/ProductsEdit";
import CustomersHome from "./Customers/CustomersHome";
import CustomersEdit from "./Customers/CustomerEdit";
import CustomerTransactions from "./Customers/CustomerTransactions";
import UsersHome from "./Users/UsersHome";
import UsersEdit from "./Users/UserEdit";
import UsersCreate from "./Users/CreateUser";
import CategoriesHome from "./Categories/CategoriesHome";
import CategoriesEdit from "./Categories/CategoriesEdit";
import TransactionsHome from "./Transactions/TransactionHome";
import TransactionsEdit from "./Transactions/TransactionEdit";
import AnalyticsHome from "./Analytics/AnalyticsHome";
import IndivAnalysis from "./Analytics/IndivAnalysis";
import PrivateRoute from "./Auth/PrivateRoute";

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
              <DashboardPage />
          }
        />
        <Route
          path="/Dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/Products"
          element={
            <PrivateRoute>
              <ProductsHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <PrivateRoute>
              <ProductsEdit />
            </PrivateRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <PrivateRoute>
              <CustomersHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/customers/:id"
          element={
            <PrivateRoute>
              <CustomersEdit />
            </PrivateRoute>
          }
        />
        <Route
          path="/customers/:id/transactions"
          element={
            <PrivateRoute>
              <CustomerTransactions />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UsersHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/:id"
          element={
            <PrivateRoute>
              <UsersEdit />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/new"
          element={
            <PrivateRoute>
              <UsersCreate />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <CategoriesHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories/:id"
          element={
            <PrivateRoute>
              <CategoriesEdit />
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <TransactionsHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions/:id"
          element={
            <PrivateRoute>
              <TransactionsEdit />
            </PrivateRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <PrivateRoute>
              <AnalyticsHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/analytics/:id"
          element={
            <PrivateRoute>
              <IndivAnalysis />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
