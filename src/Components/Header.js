// src/Header.js
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Header = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  return (
      <div className="HeaderContainer">
        <header className="d-flex justify-content-between align-items-center p-3 bg-primary text-white">
            <Link className="navbar-brand" to="/">
              Inventar
            </Link>
            <div className="user">
              {isAuthenticated ? (
                  <>
                    <div className="user-profile">
                      <Link to={`/users/${user?.id}`} className="text-white">
                        <span>{user?.username || "User"}</span>
                      </Link>
                    <button onClick={logout} className="btn btn-primary">
                      Logout
                    </button>
                    </div>
                  </>
              ) : (
                  <Link to="/login">Login</Link>
              )}
            </div>
        </header>
      </div>
  )
      ;
};

export default Header;
