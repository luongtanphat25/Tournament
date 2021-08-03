import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            QFHO
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar"
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collpase navbar-collapse" id="navbar">
            <ul className="navbar-nav me-auto my-2 my-lg-0">
              <li className="nav-item">
                <Link to="/create-tournament" className="nav-link">
                  Create tournament
                </Link>
              </li>
            </ul>
            {window.sessionStorage.getItem("isAuthenticated") ? (
              <div className="d-flex me-5">
                <span className="navbar-text mx-5">
                  Log in as {window.sessionStorage.getItem("username")}
                </span>
                <Link to="/logout" className="btn btn-light">
                  Log out
                </Link>
              </div>
            ) : (
              <div className="d-flex me-5">
                <Link to="/login" className="btn btn-light">
                  Log in
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }
}
