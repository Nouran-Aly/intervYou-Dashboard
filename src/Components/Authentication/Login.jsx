import { useFormik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Authentication.module.css";
import loginPic from "../../assets/login.png";

export default function Login() {
  return (
    <>
      <div className={styles.authTemplate}>
        <div className="container">
          <div className="d-flex">
            <div className="leftSide bg-white w-50 p-5 rounded-start-4">
              <h3>Welcome Back</h3>
              <p className="text-capitalize mb-4">
                Please Sign in with your account
              </p>
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="text-end">
                  <Link>Forget Password?</Link>
                </div>

                <button
                  type="submit"
                  className={`btn w-100 ${styles.signInBtn}  mt-5 py-2 text-white rounded-3`}
                >
                  Sign In
                </button>
              </form>
            </div>
            <div
              className={`${styles.rightSide} w-50 rounded-end-4 d-flex justify-content-center align-items-end `}
            >
              <img src={loginPic} className="w-50" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
