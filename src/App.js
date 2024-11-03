import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import DashboardPage from "./Dashboard/Dashboard";
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
import AnalyticsEdit from "./Analytics/AnalyticsEdit";
import IndivAnalysis from "./Analytics/IndivAnalysis";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/products" element={<ProductsHome />} />
        <Route path="/products/:id" element={<ProductsEdit />} />

        {/* Customer Routes */}
        <Route path="/customers" element={<CustomersHome />} />
        <Route path="/customers/:id" element={<CustomersEdit />} />
        <Route path="/customers/:id/transactions" element={<CustomerTransactions />} />

        {/* Users Routes */}
        <Route path="/users" element={<UsersHome />} />
        <Route path="/users/:id" element={<UsersEdit />} />
        <Route path="/users/new" element={<UsersCreate />} />

        {/* Categories Routes */}
        <Route path="/categories" element={<CategoriesHome />} />
        <Route path="/categories/:id" element={<CategoriesEdit />} />

        {/* Transactions Routes */}
        <Route path="/transactions" element={<TransactionsHome />} />
        <Route path="/transactions/:id" element={<TransactionsEdit />} />

        {/* Analytics Routes */}
        <Route path="/analytics" element={ <AnalyticsHome /> } />
        <Route path="/analytics/:id" element={<IndivAnalysis />} />
      </Routes>
    </>
  );
}

export default App;
