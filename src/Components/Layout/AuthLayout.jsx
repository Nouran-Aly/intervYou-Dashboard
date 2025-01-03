import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./Layout.module.css";

export default function AuthLayout() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container ">
          <img src={logo} className={styles.logo} />
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul class="navbar-nav gap-2">
              <li class="nav-item">
                <Link
                  to="/login"
                  className={`btn ${styles.loginBtn} text-white border-none outline-none`}
                >
                  Login
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  to="register"
                  className={`btn ${styles.registerBtn} text-white border-none outline-none`}
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />

      {/* footer */}
      <div className=" footer bg-white py-5">
        <div className="container">
          <div className="row row-gap-5">
            <div className="col-md-6 d-flex flex-column justify-content-between">
              <div className="logo">
                <img src={logo} className="w-25" />
              </div>
              <p className="pt-4 pb-5 text-capitalize">
                Start your fashion journey with us today and make a statement
                that is uniquely yours.
              </p>
              <div className="copy-rights d-flex gap-5">
                <p>© 2024 Nilelon</p>
                <a>Terms</a>
                <a>Conditions</a>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-4 col-sm-6 col-3">
                  <p className="fw-bold">Market Page</p>
                  <ul>
                    <li>
                      <Link to="/category">Categories</Link>
                    </li>
                    <li>
                      <Link to="/hotpicks">Hot Picks</Link>
                    </li>
                    <li>
                      <Link to="/newin">New In</Link>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4 col-sm-6 col-3">
                  <p className="fw-bold">About Nilelon</p>
                  <ul>
                    <li>
                      <a>About Us</a>
                    </li>
                    <li>
                      <a>Contact Us</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4 col-sm-12 col-3">
                  <p className="fw-bold">Follow Us</p>
                  <div className="follow-us d-flex gap-4 mt-3">
                    <i className="fa-brands fa-facebook" />
                    <i className="fa-brands fa-instagram" />
                    <i className="fa-brands fa-linkedin-in" />
                    <i className="fa-brands fa-tiktok" />
                  </div>
                </div>
              </div>
              <p className="fw-bold mt-5">Pay Securely with</p>
              <div className="row">
                <div className="col-md-3 col-sm-6 col-3">
                  {/* <img src={bank1} className="w-50" /> */}
                </div>
                <div className="col-md-3 col-sm-6 col-3">
                  {/* <img src={bank4} className="w-50" /> */}
                </div>
                <div className="col-md-3 col-sm-6 col-3">
                  {/* <img src={bank3} className="w-50" /> */}
                </div>
                <div className="col-md-3 col-sm-6 col-3">
                  {/* <img src={bank2} className="w-50" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
