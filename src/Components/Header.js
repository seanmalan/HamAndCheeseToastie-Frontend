// src/Header.js
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const Header = () => {
  const { authUser, logout } = useContext(AuthContext);

  return (
    <div className="HeaderContainer">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Navbar</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">Products</Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/users">Users</Link></li>
                  <li><Link className="dropdown-item" to="/customers">Customers</Link></li>
                  <li><Link className="dropdown-item" to="/categories">Categories</Link></li>
                  <li><Link className="dropdown-item" to="/analytics">Analytics</Link></li>
                  <li><Link className="dropdown-item" to="/transactions">Transaction Review</Link></li>
                </ul>
              </li>
            </ul>

            <div className="user">
              {authUser ? (
                <>
                  <span>Welcome, {authUser.name}</span>
                  <button onClick={logout} className="btn btn-link">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </div>

            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
